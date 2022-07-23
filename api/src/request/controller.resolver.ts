import { Constructor } from "awilix";
import { Request, Response } from "express";
import { resolveActionResponse } from "./actions.resolve";
import { ServiceProvider } from "./service-provider.registration";

export function controllerResolve<T>(Type: Constructor<T>, method: keyof T, container: ServiceProvider) {
    return async (req: Request, resp: Response) => {
      const scoped = container.createScope();
      const controller = scoped.resolve(Type.name);
      // const controllerArgs = new ControllerOptions(req, resp);
      const func = (controller as any)[method];
  
      const actionResponse = await Promise.resolve(Reflect.apply(func, controller, [{ req }]));

      resolveActionResponse(actionResponse, resp);
    };
}