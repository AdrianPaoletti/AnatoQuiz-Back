import "colors";
import "reflect-metadata";

import compress from "compression";
import cors from "cors";
import Debug from "debug";
import errorHandler from "errorhandler";
import express, { ErrorRequestHandler } from "express";
import Router from "express-promise-router";
import helmet from "helmet";
import * as http from "http";
import httpStatus from "http-status";

import { container, registerContainer } from "../dependencyInjection";
import { registerRoutes } from "../routes";

const debug = Debug("anatoquiz:server");

export class Server {
  private readonly express: express.Express;
  private readonly port: string;
  private httpServer?: http.Server;

  constructor(port: string) {
    this.port = port;
    this.express = express();

    // Handles the format of the data from http
    this.express.use(cors());
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));

    // Protect application against common attacks, setting mainly the headers
    // X-XSS-Protection. Cross-Site Scripting (XSS) is an attack type where attackers inject malicious scripts into web pages viewed by other users
    this.express.use(helmet.xssFilter());
    // X-Content-Type-Options. MIME-sniffing occurs when a browser tries to guess or override the declared MIME type of a resource (like a file) based on its content.
    this.express.use(helmet.noSniff());
    // X-Powered-By. Indicating the technology or software used to power the web application
    this.express.use(helmet.hidePoweredBy());
    // X-Frame-Options. Helps prevent clickjacking attacks.
    this.express.use(helmet.frameguard({ action: "deny" }));

    // Compress the response HTTP. Reduce the size of resources.
    this.express.use(compress());

    const router = Router();
    // Provides in development and provide detailed error information to aid debugging
    router.use(errorHandler());
    this.express.use(router);

    registerContainer(container);
    registerRoutes(router);

    router.use(((err, req, res, next) => {
      debug(err.red);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }) as ErrorRequestHandler);
  }

  getHTTPServer() {
    return this.httpServer;
  }

  async listen(): Promise<void> {
    return new Promise((resolve) => {
      this.httpServer = this.express.listen(this.port, () => {
        debug(
          `Quiz Backend App is running at http://localhost:${
            this.port
          } in ${this.express.get("env")} mode`.blue,
        );
        debug("Press CTRL-C to stop".blue);
        resolve();
      });
    });
  }

  async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.httpServer) {
        this.httpServer.close((error) => {
          if (error) {
            reject(error);

            return;
          }

          resolve();
        });
      }

      resolve();
    });
  }
}
