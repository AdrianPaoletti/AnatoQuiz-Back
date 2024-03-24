import { Express, Request, Response } from "express";

import { UserAuthenticatorGetController } from "../controllers/auth/userAuthenticatorGet.controller";
import { container } from "../dependencyInjection";
import { USERSAUTH_INJECTIONS_TYPES } from "../dependencyInjection/auth/usersAuth.types";

export function register(app: Express) {
  const userAuthGetController = container.get<UserAuthenticatorGetController>(
    USERSAUTH_INJECTIONS_TYPES.UserAuthenticatorGetController,
  );

  app.get("/auth/login", (req: Request, res: Response) =>
    userAuthGetController.run(req, res),
  );
}
