import { IFilesType } from "@/interfaces/IfcUserFiles";
import mongoose from "mongoose";
import { User } from "./User";

interface UserFileAttr {
    name: string,
    description: string,
    owner: mongoose.Types.ObjectId,
    type: IFilesType,
    file_location: string,
    is_shared: boolean,
    shared_to?: mongoose.Types.ObjectId
}

interface UserFileDocument extends mongoose.Document {
    name: string,
    description: string,
    owner: mongoose.Types.ObjectId,
    type: IFilesType,
    file_location: string,
    is_shared: boolean,
    shared_to?: mongoose.Types.ObjectId
}

interface UserFilesModel extends mongoose.Model<UserFileDocument>{
    build(attr: UserFileAttr): UserFileDocument
}

const userFileSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: { type: String, default: ""},
    owner: { type: mongoose.Schema.ObjectId, ref: User, required: false },
    type: {type: IFilesType , default: IFilesType.Image},
    file_location: {type: String, required: true},
    is_shared: {type: Boolean, default: false},
    shared_to: {type: mongoose.Types.ObjectId, ref: User}
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


const UserFile = mongoose.model<UserFileDocument, UserFilesModel>('userfile', userFileSchema)
export {UserFile}