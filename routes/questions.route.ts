import { Express, NextFunction, Request, Response } from "express";

import { QuestionsGetController } from "../controllers/questionsGet.controller";
import { container } from "../dependencyInjection";
import { QUESTIONS_INJECTIONS_TYPES } from "../dependencyInjection/questions/questions.types";
import { SHARED_INJECTIONS_TYPES } from "../dependencyInjection/shared/shared.types";
import { ValidateJWT } from "../modules/shared/infrastructure/validations/validateJWT";

export function register(app: Express) {
  const questionsGetController = container.get<QuestionsGetController>(
    QUESTIONS_INJECTIONS_TYPES.QuestionsGetController,
  );
  const validateJWT = container.get<ValidateJWT>(
    SHARED_INJECTIONS_TYPES.ValidateJWT,
  );

  app.get(
    "/question",
    (req: Request, res: Response, next: NextFunction) =>
      validateJWT.validate(req, res, next),
    (req: Request, res: Response) => questionsGetController.run(req, res),
  );
}
