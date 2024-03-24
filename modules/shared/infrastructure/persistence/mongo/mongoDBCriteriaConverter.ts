import { Criteria } from "../../../domain/criteria/criteria";
import { Filter } from "../../../domain/criteria/filter";
import { Operator } from "../../../domain/criteria/filterOperator";
import { Filters } from "../../../domain/criteria/filters";
import { Order } from "../../../domain/criteria/order";

type MongoFilterOperator = "$eq" | "$ne" | "$gt" | "$lt" | "$in";
type MongoFilterValue = boolean | string | number | Array<string | number>;
type MongoFilterOperation = {
  [operator in MongoFilterOperator]?: MongoFilterValue;
};
type MongoFilter = { [field: string]: MongoFilterOperation };
type MongoDirection = 1 | -1;
type MongoSort = { [field: string]: MongoDirection };

interface TransformerFunction<T, K> {
  (value: T): K;
}
interface MongoQuery {
  filter: MongoFilter;
  sort: MongoSort;
  skip: number;
  limit: number;
}

export class MongoDBCriteriaConverter {
  private readonly filterTransformers: Map<
    Operator,
    TransformerFunction<Filter, MongoFilter>
  >;

  constructor() {
    this.filterTransformers = new Map<
      Operator,
      TransformerFunction<Filter, MongoFilter>
    >([
      [Operator.EQUAL, this.equalFilter],
      [Operator.IN, this.inFilter],
    ]);
  }

  public convert(criteria: Criteria): MongoQuery {
    return {
      filter: criteria.hasFilters()
        ? this.generateFilters(criteria.filters)
        : {},
      sort: criteria.order?.hasOrder()
        ? this.generateSort(criteria.order)
        : { _id: -1 },
      skip: criteria.offset ?? 0,
      limit: criteria.limit ?? 0,
    };
  }

  protected generateSort(order: Order): MongoSort {
    return {
      [order.orderBy.value === "id" ? "_id" : order.orderBy.value]:
        order.orderType.isAsc() ? 1 : -1,
    };
  }

  protected generateFilters(filters: Filters): MongoFilter {
    const filter = filters.filters.map((filter) => {
      const transformer = this.filterTransformers.get(filter.operator.value);

      if (!transformer) {
        throw Error(`Unexpected operator value ${filter.operator.value}`);
      }

      return transformer(filter);
    });

    return Object.assign(this.inactiveFilter(), ...filter);
  }

  private equalFilter(filter: Filter): MongoFilter {
    return { [filter.field.value]: { $eq: filter.value.value } };
  }

  private inFilter(filter: Filter): MongoFilter {
    return { [filter.field.value]: { $in: filter.value.value } };
  }

  private inactiveFilter(): MongoFilter {
    return { active: { $ne: false } };
  }
}
