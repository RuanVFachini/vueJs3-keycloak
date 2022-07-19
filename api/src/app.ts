import express from "express";

import indexRouter from "./routers/index";
import studantRouter from "./routers/studants";
import useAuthentication from "./middlewares/authentication.middleware";
import useAuthorization from "./middlewares/authorization.middleware";
import cors from "cors";

export class App {
  public server: express.Application;
  
  constructor() {
    this.server = express();
    this.server.use(cors({origin: "http://127.0.0.1:8085"}));
    this.middleware();
    this.router();
  }

  private middleware() {
    this.server.use(express.json());
    // this.server.use(useAuthentication());
    this.server.use(useAuthorization());
  }

  private router() {
    this.server.use(indexRouter);
    this.server.use("/studants", studantRouter);
  }
}

