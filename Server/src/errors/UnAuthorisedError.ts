import { CustomError } from "./CustomErrors";

export class UnAuthorised extends CustomError {
    status = 401;
    constructor(){
        super("User is unauthorised");
        Object.setPrototypeOf(this, CustomError);
    }
    serializeError(): { message: string; fields?: { field: string; message: string; }; } {
        return {message: this.message}
    }
}