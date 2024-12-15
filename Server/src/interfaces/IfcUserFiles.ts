import mongoose from "mongoose";
import IResponse from "./AppResponse";
import { IUser } from "./IFCUser";

export enum IFilesType { Image="image", Document="document", PDF="pdf" } 

export enum IFilesSharedType { None='none', Single='single', All='all' }

export interface IUserFile extends mongoose.Document {
    id?: string,
    name: string,
    description: string,
    owner: string,
    type: IFilesType,
    file_location: string,
    shared_to?: IUser,
    shared_type: IFilesSharedType
}

export interface IUserFileNewRequest {
    name: string,
    description: string,
    type: IFilesType
}

export interface IUserFilesResponse extends IResponse {
    total_files: number;
    file_list: IUserFile[];
}

export interface IUserFileShareRequest {
    share_type: IFilesSharedType,
    shared_to?: string
}