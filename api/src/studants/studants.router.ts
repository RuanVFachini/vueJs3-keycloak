import { Router } from "express";
import { controllerResolve } from "../request/controller.resolver";
import { ServiceProvider } from "../request/service-provider.registration";
import StudantController from "./studants.controller";

export default function studantsRouter(container: ServiceProvider){
    let router = Router();
    router.get("/", controllerResolve(StudantController, "getAll", container));
    return router;
};

