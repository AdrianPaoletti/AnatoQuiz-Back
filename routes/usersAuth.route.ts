import { Express, Request, Response } from "express";

import { UserAuthenticatorGetController } from "../controllers/userAuthenticatorGet.controller";
import { container } from "../dependencyInjection";
import { USERSAUTH_INJECTIONS_TYPES } from "../dependencyInjection/usersAuth/usersAuth.types";

export function register(app: Express) {
  const userAuthGetController = container.get<UserAuthenticatorGetController>(
    USERSAUTH_INJECTIONS_TYPES.UserAuthenticatorGetController,
  );

  app.get("/user/login", (req: Request, res: Response) =>
    userAuthGetController.run(req, res),
  );
}
