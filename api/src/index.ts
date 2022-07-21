import { App } from "./app";
import dotenv from "dotenv";

dotenv.config({path: ".env"});

new App().server.listen(3005);