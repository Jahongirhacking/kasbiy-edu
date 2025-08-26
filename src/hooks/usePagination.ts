import { IPagination } from "@/api/type";
import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

const DEFAULT_PAGINATION: IPagination = {
  page: 0,
  size: 15,
  search: undefined,
};

enum PaginationKeys {
  Page = "page",
  Size = "size",
  Search = "search",
}

export function usePagination() {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = searchParams.get("page");
  const sizeParam = searchParams.get("size");
  const searchParam = searchParams.get("search");

  const page = pageParam ? Number(pageParam) : DEFAULT_PAGINATION.page;
  const size = sizeParam ? Number(sizeParam) : DEFAULT_PAGINATION.size;
  const search = searchParam ? searchParam : DEFAULT_PAGINATION.search;

  const setPagination = useCallback(
    (pagination: Partial<IPagination>) => {
      setSearchParams((params) => {
        (
          [
            { key: PaginationKeys.Page, value: pagination?.page },
            { key: PaginationKeys.Size, value: pagination?.size },
            { key: PaginationKeys.Search, value: pagination?.search },
          ] as { key: string; value: string }[]
        ).forEach((el) => {
          if (el?.value) {
            params.set(el?.key, String(el?.value));
          } else {
            params.delete(el?.key);
          }
        });
        return params;
      });
    },
    [setSearchParams]
  );

  return {
    pagination: { page, size, search } as IPagination,
    setPagination,
    searchParams,
    setSearchParams,
  };
}
