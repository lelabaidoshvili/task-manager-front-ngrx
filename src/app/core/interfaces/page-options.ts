export interface PageOptions {
  page: number;
  limit:number;
  order?: 'ASC' | 'DESC';
  orderBy?: string;
  search: string;

}
