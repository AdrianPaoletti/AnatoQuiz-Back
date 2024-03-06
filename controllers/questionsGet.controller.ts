import Debug from "debug";
import { Request, Response } from "express";
import httpStatus from "http-status";
import { inject, injectable } from "inversify";

import { SHARED_INJECTIONS_TYPES } from "../dependencyInjection/shared/shared.types";
import { QuestionsFinderQuery } from "../modules/question/application/find/questionsFinderQuery";
import { QuestionsResponse } from "../modules/question/application/questionsResponse";
import { FilterType } from "../modules/shared/domain/criteria/filter";
import { QueryBus } from "../modules/shared/domain/queryBus.interface";

import { Controller } from "./controller.interface";

const debug = Debug("anatoquiz:questionsGetController");

@injectable()
export class QuestionsGetController implements Controller {
  constructor(
    @inject(SHARED_INJECTIONS_TYPES.InMemoryQueryBus)
    private readonly inMemoryQueryBus: QueryBus,
  ) {}

  public async run(req: Request, res: Response): Promise<void> {
    try {
      const { filters, orderBy, orderType, limit, offset } = req.query as {
        [key: string]: string & FilterType[];
      };

      const query = new QuestionsFinderQuery(
        filters,
        orderBy,
        orderType,
        limit ? +limit : undefined,
        offset ? +offset : undefined,
      );

      const { questions } =
        await this.inMemoryQueryBus.ask<QuestionsResponse>(query);

      res.status(httpStatus.OK).json({ questions });

      res.json;
    } catch (error) {
      debug((error as Error).message.red);
    }
  }
}
