interface Data<T = any> {
  data: T[];
  total: number;
  count: number;
}

interface Pagination {
  size?: number;
  after?: number;
}
