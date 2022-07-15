import express from "express";

import indexRouter from "./routers/index";
import studantRouter from "./routers/studants";

export class App {
  public server: express.Application;

  constructor() {
    this.server = express();
    this.middleware();
    this.router();
  }

  private middleware() {
    this.server.use(express.json())
  }

  private router() {
    this.server.use(indexRouter);
    this.server.use("/studants", studantRouter);
  }
}
