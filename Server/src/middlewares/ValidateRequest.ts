import { RequestValidationError } from "../errors/RequestValidationError";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export default ( req: Request, res: Response, next: NextFunction )=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        throw new RequestValidationError(errors.array());
    }
    next();
}