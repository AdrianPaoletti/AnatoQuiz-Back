import Debug from "debug";
import mongoose from "mongoose";

import { DBConnection } from "../dbConnection.interface";

const debug = Debug("anatoquiz:mongoDB");

export class MongoDBConnection implements DBConnection {
  private readonly DBName!: string;

  constructor(DBName: string) {
    this.DBName = DBName;
  }

  public async connect(): Promise<void> {
    mongoose.set("debug", true);

    await mongoose
      .connect(this.getConnectionString())
      .catch((error) => debug(`Error connecting with DB: ${error}`.red));
    debug(`DB connected`.yellow);
  }

  public async disconnect(): Promise<void> {
    if (mongoose.connection.readyState === mongoose.STATES.connected) {
      await mongoose.connection
        .close()
        .catch((error) => debug(`Error diconnecting with DB: ${error}`.red));
      debug(`DB disconnected`.yellow);
    }
  }

  private getConnectionString(): string {
    const user = process.env.MONGODB_USER;
    const password = process.env.MONGODB_PASSWORD;
    const server = process.env.MONGODB_SERVER;

    return `mongodb+srv://${user}:${password}${server}/${this.DBName}`;
  }
}
