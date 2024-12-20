import { CustomError } from "./CustomErrors";

export class GenericError extends CustomError {
    status = 500;
    constructor(){
        super('Something went wrong');
        Object.setPrototypeOf(this, GenericError.prototype);
    }
    serializeError(): { message: string; fields_errors?: { field?: string; message: string; }[]; } {
        return { message: this.message }
    }
}