import Debug from "debug";
import { Request, Response } from "express";
import httpStatus from "http-status";
import { inject, injectable } from "inversify";

import { SHARED_INJECTIONS_TYPES } from "../../dependencyInjection/shared/shared.types";
import { OPTCreatorCommand } from "../../modules/opt/application/create/optCreatorCommand";
import { CommandBus } from "../../modules/shared/domain/commandBus.interface";
import { MongoDBError } from "../../modules/shared/infrastructure/persistence/mongo/mongoDBError";
import { Controller } from "../controller.interface";

type OPTCreatorPutRequest = Request & {
  body: {
    id: string;
    email: string;
    subject: string;
  };
};
const debug = Debug("anatoquiz:OPTCreatorPutController");

@injectable()
export class OPTCreatorPutController implements Controller {
  constructor(
    @inject(SHARED_INJECTIONS_TYPES.InMemoryCommandBus)
    private readonly inMemoryCommandBus: CommandBus,
  ) {}

  public async run(req: OPTCreatorPutRequest, res: Response): Promise<void> {
    try {
      const { id, email, subject } = req.body;
      const optCreatorCommand = new OPTCreatorCommand({
        id,
        email,
        subject,
      });

      await this.inMemoryCommandBus.dispatch(optCreatorCommand);

      res.status(httpStatus.CREATED).send();
    } catch (error) {
      debug((error as Error).message.red);

      if (error instanceof MongoDBError) {
        res.status(httpStatus.BAD_REQUEST).json(error.errorResponse);

        return;
      }

      res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }
}
