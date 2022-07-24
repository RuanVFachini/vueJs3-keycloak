import { Request } from "express";
import { ApiController } from "../request/api.controller";
import { IActionResult } from "../request/response.types";

export default class StudantController extends ApiController {
    
    constructor({ } : any) {
        super();
    }

    public getAll(request: Request) : IActionResult {
        return this.ok("teste");
    }
}