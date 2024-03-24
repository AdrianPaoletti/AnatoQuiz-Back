import { FilterType } from "../../../shared/domain/criteria/filter";
import { Query } from "../../../shared/domain/query";

export class QuestionsFinderQuery implements Query {
  readonly filters: FilterType[];
  readonly orderBy?: string;
  readonly orderType?: string;
  readonly limit?: number;
  readonly offset?: number;

  constructor(
    lessons: string[],
    orderBy?: string,
    orderType?: string,
    questionsNumber?: number,
    offset?: number,
  ) {
    this.filters = this.buildFilters(lessons);
    this.orderBy = orderBy;
    this.orderType = orderType;
    this.limit = questionsNumber;
    this.offset = offset;
  }

  private buildFilters(lessons: string[]): FilterType[] {
    return [
      {
        field: "lessons",
        value: lessons,
        operator: "in",
      },
    ];
  }
}
