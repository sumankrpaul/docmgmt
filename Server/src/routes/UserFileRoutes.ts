import { SingleUploader } from "../middlewares/FileUpload";
import AppRoute from "./Route";
import Rules from "../validators/UserFilevalidators";
import { Request,Response } from "express";
import { addNewFile, deleteFile, getFileDetails, getMyFiles, getSharedFiles, getStoredFile, shareFile } from "../controllers/UserFileController";
import ValidateRequest from "../middlewares/ValidateRequest";
class UserFileRoutes extends AppRoute{
    initializeRoutes(): void {
        this.router.get('/my_files', getMyFiles);

        this.router.put('/share/:fileId', Rules.shareFile, ValidateRequest, shareFile);
        
        this.router.get('/stored_file/:fileId', getStoredFile);
        
        this.router.get('/shared_files', getSharedFiles);
        
        this.router.post('/new', SingleUploader('file'), Rules.createNew , ValidateRequest, addNewFile);
        
        this.router.get('/:fileId', getFileDetails);
        this.router.delete('/:fileId', deleteFile);
        // this.router.put('/:fileId');

    }
}

export default new UserFileRoutes();