import { Response } from "express";
import { StatusCode } from "../shared/types/status-code.type";
import { IActionResult } from "./response.types";

export function resolveActionResponse(actionResponse: IActionResult, response: Response) {
    response.statusCode = actionResponse.statusCode;
  
    switch (actionResponse.statusCode) {
      case StatusCode.OK:
        defaultActionResponse(actionResponse, response);
        break;
      case StatusCode.BadRequest:
        return (response: Response) => {
          let errors = []

          if (Array.isArray(actionResponse.content)) {
            errors = actionResponse.content;
          } else {
            errors = [actionResponse.content];
          }

          response.json({
            errors: errors,
          });
        };
      case StatusCode.NotFound:
        defaultActionResponse(actionResponse, response);
        break;
    } 
  }

function defaultActionResponse(actionResponse: IActionResult, response: Response) {
  response.json(actionResponse.content);
}
