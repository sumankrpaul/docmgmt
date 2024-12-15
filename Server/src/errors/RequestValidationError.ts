import { ValidationError } from "express-validator";
import { CustomError } from "./CustomErrors";

export class RequestValidationError extends CustomError {
    status = 400;
    constructor(private errors: ValidationError[]){
        super('Request Validation Error');
        Object.setPrototypeOf(this, RequestValidationError.prototype)        
    }

    serializeError(): { message: string; fields_errors?: { field?: string, message: string }[]} {
        const fields_errors = this.errors.map((error)=>{
            if(error.type === 'field'){
                return {field: error.path, message: error.msg }
            } 
            return { message: error.msg }
        });

        return { message: "request validation error", fields_errors };
    }
    
}