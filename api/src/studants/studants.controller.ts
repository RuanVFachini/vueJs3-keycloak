import { Request } from "express";
import { RequestOptions } from "https";
import { Ok } from "../request/response.types";

export default class StudantController {
    
    constructor({ } : any) {
    }

    public getAll(opts: RequestOptions) {
        return new Ok();
    }
}