import { Container } from "inversify";

import { Controller } from "../../controllers/controller.interface";
import { OPTCreatorPutController } from "../../controllers/opt/optCreatorPut.controller";
import { OPTFinderGetController } from "../../controllers/opt/optFinderGet.controller";
import { OPTCreator } from "../../modules/opt/application/create/optCreator";
import { OPTFinder } from "../../modules/opt/application/find/optFinder";
import { MongoOPTRepository } from "../../modules/opt/infrastructure/persistence/mongo/mongoOPTRepository";

import { OPTS_INJECTIONS_TYPES } from "./opts.types";

export function bindContainer(container: Container): void {
  container
    .bind<Controller>(OPTS_INJECTIONS_TYPES.OPTCreatorPutController)
    .to(OPTCreatorPutController);
  container
    .bind<Controller>(OPTS_INJECTIONS_TYPES.OPTFinderGetController)
    .to(OPTFinderGetController);
  container.bind<OPTCreator>(OPTS_INJECTIONS_TYPES.OPTCreator).to(OPTCreator);
  container.bind<OPTFinder>(OPTS_INJECTIONS_TYPES.OPTFinder).to(OPTFinder);
  container
    .bind<MongoOPTRepository>(OPTS_INJECTIONS_TYPES.MongoOPTRepository)
    .to(MongoOPTRepository);
}
