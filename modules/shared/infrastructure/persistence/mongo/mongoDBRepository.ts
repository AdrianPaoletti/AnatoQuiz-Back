import { Model } from "mongoose";

import { AggregateRoot } from "../../../domain/aggregateRoot";
import { Criteria } from "../../../domain/criteria/criteria";

import { MongoDBCriteriaConverter } from "./mongoDBCriteriaConverter";
import { MongoDBError } from "./mongoDBError";

export abstract class MongoDBRepository<T extends AggregateRoot> {
  private readonly ModelDB!: Model<any>;
  private readonly criteriaConverter: MongoDBCriteriaConverter;

  constructor() {
    this.ModelDB = this.modelDB();
    this.criteriaConverter = new MongoDBCriteriaConverter();
  }

  protected abstract modelDB(): Model<any>;

  protected async persist(id: string, aggregateRoot: T): Promise<void> {
    const document = {
      ...aggregateRoot.toPrimitives(),
      _id: id,
    };

    await this.ModelDB.create(document).catch((error) => {
      throw new MongoDBError(error);
    });
  }

  protected async searchOneByCriteria<D>(
    criteria: Criteria,
  ): Promise<D | null> {
    const { filter } = this.criteriaConverter.convert(criteria);

    return await this.ModelDB.findOne(filter);
  }

  protected async searchByCriteria<D>(criteria: Criteria): Promise<D[]> {
    const { filter, sort, skip, limit } =
      this.criteriaConverter.convert(criteria);

    return await this.ModelDB.find(filter).sort(sort).skip(skip).limit(limit);
  }
}
