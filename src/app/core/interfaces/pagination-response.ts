export interface PaginationResponse<T> {
  data: T[];
  totalCount: number;
  page: number;
  limit: number;
}
