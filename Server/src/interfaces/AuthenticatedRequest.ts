import { Request } from "express";
import { IUser } from "./IUser";

export interface AuthenticatedRequest extends Request{
    currentUser?: IUser
}