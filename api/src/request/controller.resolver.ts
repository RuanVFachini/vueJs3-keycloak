import { Constructor } from "awilix";
import { Request, Response } from "express";
// import { IDENTITY } from "../auth/auth.const";
// import { IdentityUserInfoDto } from "../auth/identity.dtos";
import { resolveActionResponse } from "./actions.resolve";
import { ServiceProvider } from "./service-provider.registration";
import { AuthorizationTypeKey } from "../auth/authorization.type"

export function controllerResolve<T>(Type: Constructor<T>, method: keyof T, container: ServiceProvider, authorizationList: AuthorizationTypeKey[]) {
    return async (req: Request, resp: Response) => {
      const scoped = createScope(container, resp);

      await scoped.resolve("AuthorizationService")
        .authorize(authorizationList)
        .catch(error => resp.sendStatus(403));

      const controller = scoped.resolve(Type.name);
      const func = (controller as any)[method];
  
      const actionResponse = await Promise.resolve(Reflect.apply(func, controller, [{ req }]));

      resolveActionResponse(actionResponse, resp);
    };
}

function createScope(container: ServiceProvider, resp: Response) {
  const scoped = container.createScope();
  const currentUser = scoped.resolve("CurrentUser");
  // TODO:  realizar set do usuário autenticado
  // const identityUser = resp.locals[IDENTITY] as IdentityUserInfoDto;
  // currentUser.UpdateUser(identityUser.sub, identityUser.preferred_username, "");
  return scoped;
}
