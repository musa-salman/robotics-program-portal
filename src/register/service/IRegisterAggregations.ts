export interface IRegisterAggregations {
  countMajorRegistrations(): Promise<Record<string, number>>;
  collectMathUnitStatistics(): Promise<Record<string, number>>;
}
