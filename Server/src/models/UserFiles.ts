import { IFilesSharedType, IFilesType } from "../interfaces/IfcUserFiles";
import mongoose from "mongoose";
import { User } from "./User";

interface UserFileAttr {
    name: string,
    description: string,
    owner: string,
    type: IFilesType,
    file_location: string,
    shared_to?: string,
    shared_type: IFilesSharedType
}

interface UserFileDocument extends mongoose.Document {
    name: string,
    description: string,
    owner: mongoose.Types.ObjectId,
    type: IFilesType,
    file_location: string,
    shared_to?: mongoose.Types.ObjectId
    shared_type: IFilesSharedType
}

interface UserFilesModel extends mongoose.Model<UserFileDocument>{
    build(attr: UserFileAttr): UserFileDocument
}

const userFileSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: { type: String, default: ""},
    owner: { type: mongoose.Schema.ObjectId, ref: User, required: false },
    type: {type: String, enum:IFilesType , default: IFilesType.Image},
    file_location: {type: String, required: true},
    shared_to: {type: mongoose.Types.ObjectId, ref: User},
    shared_type: {type: String, enum:IFilesSharedType}
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
            ret.id=ret._id
        }
    },
    toObject: {
        transform(doc, ret) {
            ret.id=ret._id
        }
    }
})

userFileSchema.statics.build = (attr: UserFileAttr) =>{
    return new UserFile(attr);
}
const UserFile = mongoose.model<UserFileDocument, UserFilesModel>('userfile', userFileSchema)
export {UserFile}