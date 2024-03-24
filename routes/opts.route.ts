import { Express, Request, Response } from "express";

import { OPTCreatorPutController } from "../controllers/opt/optCreatorPut.controller";
import { OPTFinderGetController } from "../controllers/opt/optFinderGet.controller";
import { container } from "../dependencyInjection";
import { OPTS_INJECTIONS_TYPES } from "../dependencyInjection/opts/opts.types";

export function register(app: Express) {
  const optCreatorPutController = container.get<OPTCreatorPutController>(
    OPTS_INJECTIONS_TYPES.OPTCreatorPutController,
  );
  const optFinderGetController = container.get<OPTFinderGetController>(
    OPTS_INJECTIONS_TYPES.OPTFinderGetController,
  );

  app.put("/opt/create", (req: Request, res: Response) =>
    optCreatorPutController.run(req, res),
  );
  app.get("/opt/find", (req: Request, res: Response) =>
    optFinderGetController.run(req, res),
  );
}
