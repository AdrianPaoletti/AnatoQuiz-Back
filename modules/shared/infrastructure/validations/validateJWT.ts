import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { inject, injectable } from "inversify";

import { SHARED_INJECTIONS_TYPES } from "../../../../dependencyInjection/shared/shared.types";
import { UsersFinderQuery } from "../../../user/application/find/usersFinderQuery";
import { UsersResponse } from "../../../user/application/userResponse";
import { UserAuthorizatorQuery } from "../../../auth/application/authorize/userAuthorizatorQuery";
import { FilterType } from "../../domain/criteria/filter";
import { QueryBus } from "../../domain/queryBus.interface";

@injectable()
export class ValidateJWT {
  constructor(
    @inject(SHARED_INJECTIONS_TYPES.InMemoryQueryBus)
    private readonly inMemoryQueryBus: QueryBus,
  ) {}

  public async validate(
    { headers: { authorization: token } }: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const authQuery = new UserAuthorizatorQuery(token as string);
      const {
        userAuth: { id },
      } = await this.inMemoryQueryBus.ask(authQuery);

      const userQuery = new UsersFinderQuery(this.buildFilter(id));
      await this.inMemoryQueryBus.ask<UsersResponse>(userQuery);

      next();
    } catch (error) {
      res
        .status(httpStatus.UNAUTHORIZED)
        .json({ error: (error as Error).message });
    }
  }

  private buildFilter(id: string): FilterType[] {
    return [
      {
        field: "_id",
        value: id,
        operator: "=",
      },
    ];
  }
}
