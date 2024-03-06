import bcrypt from "bcrypt";
import { injectable } from "inversify";
import jwt, { JwtPayload } from "jsonwebtoken";

import { UserAuthRepository as IUserAuthenticatorRepository } from "../domain/userAuthRepository.interface";

type JWTPayload = JwtPayload & { [key: string]: string };

@injectable()
export class UserAuthRepository implements IUserAuthenticatorRepository {
  public comparePassword(password: string, hashedPassword: string): boolean {
    return bcrypt.compareSync(password, hashedPassword);
  }

  public async generateToken(id: string): Promise<string> {
    const token = jwt.sign({ id }, `${process.env.SECRET_KEY}`, {
      expiresIn: process.env.SECRET_EXPIRATION,
    });

    return Promise.resolve(token);
  }

  public async validateToken(token: string): Promise<string> {
    const { id } = jwt.verify(
      token,
      process.env.SECRET_KEY ?? "",
    ) as JWTPayload;

    return Promise.resolve(id);
  }
}
