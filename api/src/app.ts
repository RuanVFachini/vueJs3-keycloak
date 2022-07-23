import express from "express";
import cors from "cors";
import { AwilixContainer,  createContainer } from 'awilix';
import http from 'http';

import authentication from "./auth/middlewares/authentication.middleware";
import { ServiceProvider, serviceProviderRegistration } from "./request/service-provider.registration";
import studantsRouter from "./studants/studants.router";

const server = express();
const container = configureContainer();

export function createServer() {
  middleware();
  router(container);
  
  const httpServe = http.createServer(server)
  httpServe.on('close', () => container.dispose())
  return httpServe
}

function middleware() {
  server.use(cors({origin: "http://127.0.0.1:8085"}));
  server.use(express.json());
  server.use(authentication);
}

function router(container: ServiceProvider) {
  server.use("/studants", studantsRouter(container))
  server.use("/", (req, resp) => {
    resp.json({"teste":"teste"});
  })
}

function configureContainer() : ServiceProvider {
  const container = createContainer();
  container.register(serviceProviderRegistration);
  return container;
}