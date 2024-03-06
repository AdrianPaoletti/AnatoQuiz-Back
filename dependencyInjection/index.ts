import Debug from "debug";
import { glob } from "glob";
import { Container } from "inversify";

const debug = Debug("anatoquiz:injections");

export const container = new Container();

export function registerContainer(container: Container): void {
  const dependencies = glob.sync("**/*.injections.js", { absolute: true });
  Promise.all(
    dependencies.map((dependenciePath) => register(dependenciePath, container)),
  ).catch((err) => debug(`${err}`.red));
}

async function register(
  dependenciePath: string,
  container: Container,
): Promise<void> {
  const { bindContainer }: { bindContainer: (container: Container) => void } =
    await import(dependenciePath);
  bindContainer(container);
}
