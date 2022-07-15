import express from "express";
import cors from "cors";

import indexRouter from "./routers/index";
import studantRouter from "./routers/studants";

export class App {
  public server: express.Application;

  constructor() {
    const corsConfig = cors({
      origin: "*'"
    });

    this.server = express();
    this.server.options("*", corsConfig);
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

