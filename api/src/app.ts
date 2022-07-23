import express, { Request, Response } from "express";
import cors from "cors";
import { AwilixContainer, Constructor, createContainer, NameAndRegistrationPair } from 'awilix'
import http, { request } from 'http';

import authentication from "./auth/middlewares/authentication.middleware";
import StudantController from "./studants/studants.controller";
import modelProvider from "./request/service-provider.model";
import { ControllerOptions } from "./request/controller.options";
import { IActionResult } from "./request/response.types";
import { match } from "assert";

const server = express();
const container = configureContainer();

export function createServer() {
  middleware();
  router(container);
  const httpServe = http.createServer(server)
  // Dispose container when the server closes.
  httpServe.on('close', () => container.dispose())
  return httpServe
}

function middleware() {
  server.use(cors({origin: "http://127.0.0.1:8085"}));
  server.use(express.json());
  server.use(authentication);
}

function router(container: AwilixContainer<any>) {
  server.use("/studants", controllerResolve(StudantController, "getAll"))
}

function configureContainer() {
  const container = createContainer();
  container.register(modelProvider);
  return container;
}

function controllerResolve<T>(Type: Constructor<T>, method: keyof T) {
  return async (req: Request, resp: Response) => {
    const controller = container.resolve("StudantController");
    const controllerArgs = new ControllerOptions(req, resp);
    const func = (controller as any)[method];

    await Promise.resolve(Reflect.apply(func, controller, [{ controllerArgs }]))
      .then((response: IActionResult) => {
        resolveActionResponse(response.statusCode, resp);
      })
      .catch((error: Error) => {
        throw error;
      })
  };
}

function resolveActionResponse(statusCode: number, response: Response) {
  switch (statusCode) {
    case 200:
      return (response: Response) => {

      };
      break;
    case 400:
      return (response: Response) => {

      };
      break;
    case 404:
      return (response: Response) => {

      };
      break;
  } 
}