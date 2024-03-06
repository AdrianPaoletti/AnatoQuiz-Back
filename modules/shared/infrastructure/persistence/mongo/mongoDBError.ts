import { Primitives } from "../../../domain/valueObjects/valueObject";

type DBErrorType = Error & {
  code: number;
  keyValue: { [key: string]: Primitives };
};

interface ErrorValue {
  field: string;
  value: Primitives;
  message: string;
}

export class MongoDBError extends Error {
  readonly errorResponse: ErrorValue;

  constructor(error: DBErrorType) {
    super(error.message);
    this.errorResponse = this.generateErrorResponse(error);
  }

  private generateErrorResponse({
    keyValue,
    message,
  }: DBErrorType): ErrorValue {
    const [[field, value]] = Object.entries(keyValue);

    return {
      field,
      value,
      message,
    };
  }
}
