import { Request, Response } from "express"
import { UnAuthorised } from "../errors/UnAuthorisedError";
import { UserFile } from "../models/UserFiles";
import { IFilesSharedType, IUserFileNewRequest, IUserFileShareRequest, IUserFilesResponse } from "../interfaces/IfcUserFiles";
import mongoose from "mongoose";
import { BadRequestError } from "../errors/BadRequestError";
import fs from 'node:fs/promises';
import { GenericError } from "../errors/GenericError";
import path from 'path';
import { IUserDetailResponse } from "../interfaces/IFCUser";
import { fileURLToPath } from "node:url";
import IResponse from "../interfaces/AppResponse";

const addNewFile = async (req: Request<{},{}, IUserFileNewRequest>,res: Response)=>{
    const file = req.file as Express.Multer.File;
    const currentUser = req.currentUser;
    const { name, description, type } = req.body

    if(file && currentUser){
        const userFile = UserFile.build({
            name,
            description,
            type,
            file_location: path.join(file.destination, file.filename),
            owner: currentUser.id,
            shared_type: IFilesSharedType.None
        })
        const savedFile = await userFile.save();
        return res.json({
            message: "File uploaded successfully",
            file_id: savedFile._id
        });
    } 
    throw new UnAuthorised();
}

const getFileDetails = async (req: Request<{fileId: string}>, res: Response) => {
    const file_id = req.params.fileId;
    const currentUser = req.currentUser!;
    if(!file_id || !mongoose.Types.ObjectId.isValid(file_id)){
        throw new BadRequestError("File Id is invalid"); 
    }

    const userFile = await UserFile.findById(file_id);
    if(!userFile){
        throw new BadRequestError("No such files found", 404); 
    }

    
    if(userFile.owner.toString() === currentUser.id || (userFile.shared_type === IFilesSharedType.All) || (userFile.shared_type === IFilesSharedType.Single && userFile.shared_to?.toString() === currentUser.id) ){
        const {id, name, description, type, shared_type} = userFile.toJSON();
        return res.json({
            message: "File found",
            file_detail: {
                id, name, description, type, shared_type
            }
        })
    }

    throw new UnAuthorised()

}

const getStoredFile = async (req: Request<{fileId: string}>, res: Response)=>{
    const file_id = req.params.fileId;
    const currentUser = req.currentUser!;
    if(!file_id || !mongoose.Types.ObjectId.isValid(file_id)){
        throw new BadRequestError("File Id is invalid"); 
    }

    const userFile = await UserFile.findById(file_id);
    if(!userFile){
        throw new BadRequestError("No such files found", 404); 
    }

    if(userFile.owner.toString() === currentUser.id || (userFile.shared_type === IFilesSharedType.All) || (userFile.shared_type === IFilesSharedType.Single && userFile.shared_to?.toString() === currentUser.id) ){
        const {file_location}  = userFile.toJSON();
        const stats = await fs.stat(file_location);

        if(stats){
            console.log(stats.isFile());
            // res.setHeaders([`Content-Length: ${stats.size}`, `Content-type: "image/*`])
            return res.sendFile(file_location);
        }
        throw new GenericError();
    }

    throw new UnAuthorised();
}

const getMyFiles = async (req: Request, res: Response)=>{
    const currentUser = req.currentUser;
    if(currentUser){

        const userFiles = await UserFile.find({ owner: currentUser.id}, {file_location: 0}).populate("shared_to");
        
        return res.json({ message: "List of my files", total_files: userFiles.length, file_list: userFiles.map(file => file.toJSON()) })
    }
}

const getSharedFiles = async (req: Request, res: Response)=>{
    const currentUser = req.currentUser;
    if(currentUser){
        const userFile = await UserFile.find({ $or: [{shared_to: currentUser.id}, {shared_to: IFilesSharedType.All}], owner: {$neq: currentUser.id} }, {file_location: 0}).populate("owner");
        return res.json({ message: "List of my files", total_files: userFile.length, file_list: userFile.map(file => file.toJSON()) })
    }
}

const shareFile = async (req: Request<{fileId: string}, {}, IUserFileShareRequest>, res: Response) =>{
    const currentUser = req.currentUser;
    const file_id = req.params.fileId;
    const {share_type} = req.body;
    if(currentUser){

        const userFile = await UserFile.findOne({ _id: file_id, owner: currentUser.id });
    
        if(!userFile){
            throw new BadRequestError("No such files found", 404);
        }
    
        if(share_type === IFilesSharedType.Single && req.body.shared_to){
            await UserFile.updateOne({_id: userFile._id}, { $set:{ shared_type: share_type, shared_to: req.body.shared_to } });
        } else if(share_type === IFilesSharedType.All) {
            await UserFile.updateOne({_id: userFile._id}, { $set:{ shared_type: share_type }, $unset: {shared_to: 1} });
        } else if(share_type === IFilesSharedType.None){
            await UserFile.updateOne({_id: userFile._id}, { $set:{ shared_type: share_type }, $unset: {shared_to: 1} } )
        }

        return res.json({
            message: "File shared successfully"
        })
    }

}

const deleteFile = async (req: Request<{fileId: string}>, res: Response<IResponse>) =>{
    const currentUser = req.currentUser;
    const file_id = req.params.fileId;
    if(currentUser){
        const userFile = await UserFile.findOne({ _id: file_id, owner: currentUser.id });
        if(!userFile){
            throw new BadRequestError("No such File found", 404);
        }

        await UserFile.deleteOne({_id: file_id});
        await fs.unlink(userFile.file_location);
        return res.json({
            message: "File deleted successfully"
        })

    }
}

export {
    addNewFile,
    getFileDetails,
    getStoredFile,
    getMyFiles,
    getSharedFiles,
    shareFile,
    deleteFile
}