import express from "express";
import cors from "cors";

import indexRouter from "./routers/index";
import studantRouter from "./routers/studants";
import useAuthentication from "./middlewares/authentication.middleware";
import useAuthorization from "./middlewares/authorization.middleware";
import userCors from "./middlewares/cors.middleware";

export class App {
  public server: express.Application;
  
  constructor() {
    this.server = express();
    this.server.options("*", userCors());
    this.middleware();
    this.router();
  }

  private middleware() {
    this.server.use(express.json());
    this.server.use(useAuthentication());
    this.server.use(useAuthorization());
  }

  private router() {
    this.server.use(indexRouter);
    this.server.use("/studants", studantRouter);
  }
}

