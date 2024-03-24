import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { inject, injectable } from "inversify";

import { SHARED_INJECTIONS_TYPES } from "../../dependencyInjection/shared/shared.types";
import { UserAuthorizatorQuery } from "../../modules/auth/application/authorize/userAuthorizatorQuery";
import { QueryBus } from "../../modules/shared/domain/queryBus.interface";
import { UsersFinderQuery } from "../../modules/user/application/find/usersFinderQuery";
import { UserResponse } from "../../modules/user/application/userResponse";

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

      const userQuery = new UsersFinderQuery({ _id: id });
      await this.inMemoryQueryBus.ask<UserResponse>(userQuery);

      next();
    } catch (error) {
      res
        .status(httpStatus.UNAUTHORIZED)
        .json({ error: (error as Error).message });
    }
  }
}
