import { injectable } from "inversify";
import { Model } from "mongoose";

import { Criteria } from "../../../../shared/domain/criteria/criteria";
import { MongoDBRepository } from "../../../../shared/infrastructure/persistence/mongo/mongoDBRepository";
import { OPT } from "../../../domain/opt";
import { OPTRepository } from "../../../domain/optRepository.interface";

import { IOPT, OPTModel } from "./model/optModel";

interface OPTDocument {
  _id: string;
  email: string;
  value: string;
  subject: string;
}

@injectable()
export class MongoOPTRepository
  extends MongoDBRepository<OPT>
  implements OPTRepository
{
  public async save(opt: OPT): Promise<void> {
    await this.update(opt.id.value, opt);
  }

  public async matchingOne(criteria: Criteria): Promise<OPT | null> {
    const document = await this.searchOneByCriteria<OPTDocument>(criteria);

    if (document) {
      const { _id: id, email, value, subject } = document;

      return OPT.fromPrimitives({
        id,
        email,
        value,
        subject,
      });
    }

    return document;
  }

  protected modelDB(): Model<IOPT> {
    return OPTModel;
  }
}
