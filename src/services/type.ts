export interface IPagination {
  page: number;
  size: number;
  search?: string;
}

export interface IPaginationResponse<T> {
  content: T;
  page: Omit<IPagination, "search"> & {
    totalElements: number;
    totalPages: number;
  };
}
