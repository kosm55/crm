export interface IQueryParams {
  limit: number;
  offset: number;
  sortField?: string;
  sortOrder?: string;
  filters?: IQueryParamsFilters;
}
export interface IQueryParamsFilters {
  name?: string;
  surname?: string;
  email?: string;
  phone?: string;
  age?: string;
  course?: string;
  course_format?: string;
  course_type?: string;
  group?: string;
  status?: string;
  userOnly?: string;
}
