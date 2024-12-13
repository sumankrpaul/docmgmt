import { CustomError } from "./CustomErrors";

export class NotFoundError extends CustomError {
    status = 404;
    constructor(){
        super("No such route exists");
        Object.setPrototypeOf(this, NotFoundError.prototype)
    }
    serializeError(): { message: string; fields?: { field: string; message: string; }; } {
        return { message: this.message }
    }
}