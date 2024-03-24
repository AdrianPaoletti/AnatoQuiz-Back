import { OPT } from "../domain/opt";
import { OPTPrimitives } from "../domain/optPrimitives.interface";

export class OPTResponse {
  public readonly opt: OPTPrimitives;

  constructor(opt: OPT) {
    this.opt = opt.toPrimitives();
  }
}
