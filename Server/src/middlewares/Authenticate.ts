import { UnAuthorised } from "../errors/UnAuthorisedError";
import { IUser } from "../interfaces/IUser";
import { Token } from "../service/Token";
import { NextFunction, Request, Response } from "express";
declare global {
    namespace Express{
        interface Request {
            currentUser?: IUser;
        }
    }
}
export const checkAuthenticated = (req: Request, res: Response, next: NextFunction)=>{
    const bearerToken = req.headers.authorization;
    if(bearerToken){
        const token = bearerToken.split(' ')[1];
        console.log(token);
        const user = Token.verifyToken(token);
        if(user){
            req.currentUser = user;
            return next();
        }
    } 
    throw new UnAuthorised();
}