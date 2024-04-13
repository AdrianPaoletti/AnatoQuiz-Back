import { DBConnection } from "../modules/shared/infrastructure/persistence/dbConnection.interface";
import { MongoDBConnection } from "../modules/shared/infrastructure/persistence/mongo/mongoDBConnection";

import { Server } from "./server";

export class QuizBackendApp {
  private server?: Server;
  private database?: DBConnection;

  async start(): Promise<void> {
    const DBName = process.env.MONGODB_DBNAME ?? "";
    const port = process.env.PORT ?? "3000";
    this.server = new Server(port);
    this.database = new MongoDBConnection(DBName);

    await this.server.listen();
    await this.database.connect();
    await this.server.registerEventBus();
  }

  async stop(): Promise<void> {
    await this.server?.stop();
    await this.database?.disconnect();
  }
}
