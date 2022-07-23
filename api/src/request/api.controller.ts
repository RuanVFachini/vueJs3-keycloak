import { IActionResult } from "./response.types";

export class ApiController {
    protected ok(content: any) : IActionResult {
        return {
            content: content,
            statusCode: 200,
        }
    }

    protected badRequest(validationMessage: any) : IActionResult {
        return {
            content: validationMessage,
            statusCode: 400,
        }
    }

    protected notFound(id: any) : IActionResult {
        return {
            content: `Entity ${id} not found`,
            statusCode: 404,
        }
    }
}