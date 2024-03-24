import Debug from "debug";
import { Request, Response } from "express";
import httpStatus from "http-status";
import { inject, injectable } from "inversify";

import { SHARED_INJECTIONS_TYPES } from "../../dependencyInjection/shared/shared.types";
import { OPTFinderQuery } from "../../modules/opt/application/find/optFinderQuery";
import { QueryBus } from "../../modules/shared/domain/queryBus.interface";
import { MongoDBError } from "../../modules/shared/infrastructure/persistence/mongo/mongoDBError";
import { Controller } from "../controller.interface";

type OPTFindetGetRequest = Request & {
  body: {
    email: string;
    value: string;
  };
};
const debug = Debug("anatoquiz:OPTFinderGetController");

@injectable()
export class OPTFinderGetController implements Controller {
  constructor(
    @inject(SHARED_INJECTIONS_TYPES.InMemoryQueryBus)
    private readonly inMemoryQueryBus: QueryBus,
  ) {}

  public async run(req: OPTFindetGetRequest, res: Response): Promise<void> {
    try {
      const { email, value } = req.body;
      const optFinderQuery = new OPTFinderQuery(email, value);

      await this.inMemoryQueryBus.ask(optFinderQuery);

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
