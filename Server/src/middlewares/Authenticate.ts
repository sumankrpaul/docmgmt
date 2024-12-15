import { UnAuthorised } from "../errors/UnAuthorisedError";
import { IUser } from "../interfaces/IFCUser";
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
        const user = Token.verifyToken(token);
        if(user){
            req.currentUser = user;
            const responseHeader = new Headers({'Refresh-Token': Token.generateToken({ 
                'email': user.email, 
                'first_name': user.first_name, 
                'last_name': user.last_name, 
                'id': user.id, 
                is_verified: user.is_verified })
            })
            res.setHeaders(responseHeader)
            return next();
        }
    } 
    throw new UnAuthorised();
}