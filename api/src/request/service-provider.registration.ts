import { AwilixContainer } from "awilix";
import { asClass } from "awilix/lib/resolvers";
import StudantController from "../studants/studants.controller";

export type ServiceProvider = AwilixContainer<ServiceProviderState>;

export interface ServiceProviderState {
    StudantController: StudantController,
}

export const serviceProviderRegistration = {
    StudantController: asClass(StudantController),
}; 

