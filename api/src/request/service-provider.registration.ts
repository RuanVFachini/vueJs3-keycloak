import { AwilixContainer } from "awilix";
import { asClass } from "awilix/lib/resolvers";
import StudantController from "../studants/studants.controller";
import { CurrentUser } from "../auth/current-user.model";
import { IAuthorizationService } from "../auth/i-authorization.service";
import { AuthorizationService } from "../auth/authorization.service";

export type ServiceProvider = AwilixContainer<ServiceProviderState>;

export interface ServiceProviderState {
    StudantController: StudantController,
    CurrentUser: CurrentUser
    AuthorizationService: IAuthorizationService
}

export const serviceProviderRegistration = {
    StudantController: asClass(StudantController, { lifetime: "SCOPED"}),
    CurrentUser: asClass(CurrentUser, { lifetime: "SCOPED" }),
    AuthorizationService: asClass(AuthorizationService, { lifetime: "SCOPED" }),
}; 

