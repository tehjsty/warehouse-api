import {Response} from "express";

export class ErrorResponse extends Error {
    status: number = 500;
    message: string = 'An unexpected error occured';

    constructor(error: any) {
        super();
        if(error.message) {
            this.message = error.message;
        }
        if(error.status) {
            this.status = error.status;
        }
    }

    sendResponse(res: Response) {
        res.status(this.status).json(this);
    }
}
