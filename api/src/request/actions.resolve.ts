import { Response } from "express";
import { IActionResult } from "./response.types";

export function resolveActionResponse(actionResponse: IActionResult, response: Response) {
    response.statusCode = actionResponse.statusCode;
  
    switch (actionResponse.statusCode) {
      case 200:
        defaultActionResponse(actionResponse, response);
        break;
      case 400:
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
      case 404:
        defaultActionResponse(actionResponse, response);
        break;
    } 
  }

function defaultActionResponse(actionResponse: IActionResult, response: Response) {
  response.json(actionResponse.content);
}
