import { IUser } from "./IfcUser";

export enum IFilesType { Image="image", Document="document", PDF="pdf" } 

export enum IFilesSharedType { None='none', Single='single', All='all' }

export interface IUserFile {
    id?: string,
    name: string,
    description: string,
    owner: string,
    type: IFilesType,
    file_location: string,
    shared_to?: IUser,
    shared_type: IFilesSharedType
}