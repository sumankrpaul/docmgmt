import { CustomError } from "../errors/CustomErrors";
import { NextFunction, Request, Response } from "express";

export default (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
)=>{
    if(err instanceof CustomError){
        console.log('I am here');
        console.log(err);
        return res.status(err.status).json({ error: err.serializeError() })
    }
    return res.status(500).send({ 
        error: err.message? err.message: "Something went wrong"
    })
}