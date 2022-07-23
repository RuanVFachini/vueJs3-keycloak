import { Request, Response } from "express";

export class ControllerOptions {
    public request: Request;
    public response: Response;

    constructor(request: Request, response: Response) {
        this.request = request;
        this.response = response;
    }
}