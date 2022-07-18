import cors from "cors";
import { Request } from "express";

export default () => cors(corsOptionsDelegate);

var allowlist = ['http://localhost:8085', 'http://127.0.0.1:8085']

var corsOptionsDelegate = function (req: Request, callback: (err: Error | null, options?: cors.CorsOptions) => void) {
  var allowed = allowlist.find(x => req.headers.origin?.startsWith(x)) != undefined;
  
  callback(null, {
    origin: allowed ? req.headers.origin : false,
    allowedHeaders: ["Access-Control-Allow-Origin", "Authorization"],
    exposedHeaders: ["Access-Control-Allow-Origin", "Authorization"],
    preflightContinue: true,
    optionsSuccessStatus: 200
  })
}