export interface Data<T = any> {
  data: T[];
  total: number;
  count: number;
}

export interface Pagination {
  size?: number;
  after?: number;
}
