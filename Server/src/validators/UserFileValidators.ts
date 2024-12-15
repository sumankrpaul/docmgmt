

import { body, param } from "express-validator";
import { IFilesSharedType, IFilesType } from "../interfaces/IfcUserFiles";

export default {
    createNew: [
        body('name')
        .exists().trim().notEmpty()
        .withMessage(" Name is required"),
        body('type')
        .exists().trim().isEmpty()
        .withMessage("File type is required")
        .custom((value)=>{
            if(!Object.values(IFilesType).includes(value)){
                throw new Error("Value is not correct")
            }
            return true;
        }),
        body('file')
        .custom((_, {req})=>{
            if(!req.file){
                throw new Error('File is required') 
            }
            return true;
        })
    ],
    shareFile: [
        body('share_type')
        .exists().trim().notEmpty()
        .withMessage("Share type is required")
        .custom((value)=>{
            console.log(value);
            if(!Object.values(IFilesSharedType).includes(value)){
                throw new Error("Type value is not valid")
            }
            return true;
        })
        .custom((value, {req})=>{
            if(value === IFilesSharedType.Single && !req.body.shared_to){
                throw new Error(" Shared To is required ")
            }
            return true;
        })
    ]
}