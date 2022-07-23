import { createServer } from "./app";
import dotenv from "dotenv";

dotenv.config({path: ".env"});

createServer().listen(3005);