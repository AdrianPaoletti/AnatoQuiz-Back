import bcrypt from "bcrypt";
import Debug from "debug";
import { Request, Response } from "express";
import httpStatus from "http-status";
import { inject, injectable } from "inversify";

import { SHARED_INJECTIONS_TYPES } from "../dependencyInjection/shared/shared.types";
import { CommandBus } from "../modules/shared/domain/commandBus.interface";
import { MongoDBError } from "../modules/shared/infrastructure/persistence/mongo/mongoDBError";
import { UserSignUpperCommand } from "../modules/user/application/signUp/userSignUpperCommand";

import { Controller } from "./controller.interface";

type UserSignUpperRequest = Request & {
  body: {
    username: string;
    email: string;
    password: string;
    id: string;
    administrator?: boolean;
    google?: boolean;
  };
};
const debug = Debug("anatoquiz:userSignUpperPostController");

@injectable()
export class UserSignUpperPostController implements Controller {
  constructor(
    @inject(SHARED_INJECTIONS_TYPES.InMemoryCommandBus)
    private readonly inMemoryCommandBus: CommandBus,
  ) {}

  public async run(req: UserSignUpperRequest, res: Response): Promise<void> {
    try {
      const { id, username, email, password, administrator, google } = req.body;
      const userSignUpperCommand = new UserSignUpperCommand({
        id,
        username,
        email,
        password: bcrypt.hashSync(password, 10),
        administrator: !!administrator,
        active: true,
        google: !!google
      });

      await this.inMemoryCommandBus.dispatch(userSignUpperCommand);

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
