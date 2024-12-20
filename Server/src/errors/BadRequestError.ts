import { CustomError } from "./CustomErrors";

export class BadRequestError extends CustomError{
    status: number;
    constructor(error_message: string, status= 400){
        super(error_message);
        this.status = status;
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
    serializeError(): { message: string; fields_errors?: { field?: string; message: string; }[]; } {
        return { message: this.message }
    }

}