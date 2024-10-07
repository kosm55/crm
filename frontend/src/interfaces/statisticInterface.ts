export interface ITotalStatistic {
  statistic: IStatistic[];
  totalCount: number;
}

export interface IStatistic {
  count: number;
  status: string | null;
}
