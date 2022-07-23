import { asClass } from "awilix/lib/resolvers";
import StudantController from "../studants/studants.controller";

export default {
    StudantController: asClass(StudantController)
};