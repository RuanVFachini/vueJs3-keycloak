import express from "express";
import cors from "cors";

import indexRouter from "./routers/index";
import studantRouter from "./routers/studants";
import authentication from "./middlewares/authentication.middleware";

export class App {
  public server: express.Application;
  
  constructor() {
    this.server = express();
    this.middleware();
    this.router();
  }

  private middleware() {
    this.server.use(cors({origin: "http://127.0.0.1:8085"}));
    this.server.use(express.json());
    this.server.use(authentication);
  }

  private router() {
    this.server.use(indexRouter);
    this.server.use("/studants", studantRouter);
  }
}

