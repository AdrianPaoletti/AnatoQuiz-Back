import Debug from "debug";
import { Request, Response } from "express";
import httpStatus from "http-status";
import { inject, injectable } from "inversify";

import { SHARED_INJECTIONS_TYPES } from "../dependencyInjection/shared/shared.types";
import { FilterType } from "../modules/shared/domain/criteria/filter";
import { QueryBus } from "../modules/shared/domain/queryBus.interface";
import { UserInvalidAuthCredentials } from "../modules/shared/domain/user/userInvalidAuthCredentials";
import { UsersFinderQuery } from "../modules/user/application/find/usersFinderQuery";
import { UsersResponse } from "../modules/user/application/userResponse";
import { UserAuthenticatorQuery } from "../modules/userAuth/application/authenticate/userAuthenticatorQuery";

import { Controller } from "./controller.interface";

const debug = Debug("anatoquiz:userAuthGetController");

@injectable()
export class UserAuthenticatorGetController implements Controller {
  constructor(
    @inject(SHARED_INJECTIONS_TYPES.InMemoryQueryBus)
    private readonly inMemoryQueryBus: QueryBus,
  ) {}

  public async run(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.query as { [key: string]: string };
      const userQuery = new UsersFinderQuery(this.buildFilter(email));
      const {
        users: [user],
      } = await this.inMemoryQueryBus.ask<UsersResponse>(userQuery);

      const authQuery = new UserAuthenticatorQuery(
        password,
        user.password,
        user.id,
      );
      const {
        userAuth: { token },
      } = await this.inMemoryQueryBus.ask(authQuery);

      res.status(httpStatus.OK).json({
        token,
      });
    } catch (error) {
      debug((error as Error).message.red);

      if (error instanceof UserInvalidAuthCredentials) {
        res.status(httpStatus.UNAUTHORIZED).json({ error: error.message });

        return;
      }

      res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: (error as Error).message });
    }
  }

  private buildFilter(email: string): FilterType[] {
    return [
      {
        field: "email",
        value: email,
        operator: "=",
      },
    ];
  }
}
