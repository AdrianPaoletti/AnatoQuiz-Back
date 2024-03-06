import Debug from "debug";
import { Router } from "express";
import { glob } from "glob";

const debug = Debug("anatoquiz:routes");

export function registerRoutes(router: Router): void {
  const routes = glob.sync(`**/*.route.js`, { absolute: true });
  Promise.all(routes.map((route) => register(route, router))).catch((err) =>
    debug(`${err}`.red),
  );
}

async function register(routePath: string, router: Router): Promise<void> {
  const route = await import(routePath);
  route.register(router);
}
