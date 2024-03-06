import "dotenv/config";

import Debug from "debug";

import { QuizBackendApp } from "./quizBackendApp";

const debug = Debug("anatoquiz:start");

try {
  new QuizBackendApp().start().catch(handleError);
} catch (error) {
  handleError(error);
}

process.on("uncaughtException", (error) => {
  debug("uncaughtException".red, error);
  process.exit(1);
});

function handleError(error: unknown) {
  debug(`${error}`.red);
  process.exit(1);
}
