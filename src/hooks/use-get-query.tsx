import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { keepPreviousData } from "@tanstack/react-query";

interface UseGetQueryParams<TData, TParams> {
  queryKey: string;
  queryFn: (params: TParams) => Promise<TData>;
  params: TParams;
  onSuccess?: (data: TData) => void;
  setItems?: (programs: any[]) => void;
  extractItems?: (data: TData) => any[];
  enabled?: boolean;
}

const useGetQuery = <TData, TParams>({
  queryKey,
  queryFn,
  params,
  onSuccess,
  setItems,
  extractItems,
  enabled = true,
}: UseGetQueryParams<TData, TParams>) => {
  const query = useQuery<TData>({
    queryKey: [queryKey, params],
    queryFn: async () => await queryFn(params),
    placeholderData: keepPreviousData,
    enabled,
  });

  // Handle success callback and program setting
  useEffect(() => {
    if (setItems && extractItems && query.data) {
      setItems(extractItems(query.data));
    }

    if (query.isSuccess && query.data && onSuccess) {
      onSuccess(query.data);
    }
  }, [query.isSuccess, query.data, onSuccess]);

  return query;
};

export default useGetQuery;
