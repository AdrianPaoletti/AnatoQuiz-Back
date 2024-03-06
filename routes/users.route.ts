import { Express, Request, Response } from "express";

import { UserSignUpperPostController } from "../controllers/userSignUpperPost.controller";
import { container } from "../dependencyInjection";
import { USERS_INJECTIONS_TYPES } from "../dependencyInjection/users/users.types";

export function register(app: Express) {
  const userSignUpperPostController =
    container.get<UserSignUpperPostController>(
      USERS_INJECTIONS_TYPES.UserSignUpperPostController,
    );

  app.post("/user/signup", (req: Request, res: Response) =>
    userSignUpperPostController.run(req, res),
  );
}
