export interface IActionResult {
    statusCode: number;
}

export class Ok implements IActionResult {
    statusCode = 200;
    public content!: any;
}

export class BadRequest implements IActionResult{
    statusCode = 400;
    public errors!: any[];
}

export class NotFound implements IActionResult{
    statusCode = 404;
    public identifier!: string;
}

