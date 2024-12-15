import { Request } from "express";
import { IUser } from "./IFCUser";

export interface AuthenticatedRequest extends Request{
    currentUser?: IUser
}