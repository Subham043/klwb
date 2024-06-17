import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { api_routes } from "../../utils/api_routes";
import { useSearchParams } from "react-router-dom";
import { QueryInitialPageParam, QueryTotalCount } from "../../utils/constants";
import api from "../../utils/axios";
import { TaluqType, PaginationType } from "../../utils/types";

export const TaluqQueryKey = "taluq";
export const TaluqsQueryKey = "taluqs";
export const TaluqSelectQueryKey = "taluq_select";

export const useTaluqsQuery: () => UseQueryResult<
  PaginationType<TaluqType>,
  unknown
> = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || QueryInitialPageParam.toString();
  const limit = searchParams.get("limit") || QueryTotalCount.toString();
  const search = searchParams.get("search") || "";
  return useQuery({
    queryKey: [TaluqsQueryKey, page, limit, search],
    queryFn: async () => {
      const response = await api.get<PaginationType<TaluqType>>(
        api_routes.admin.taluq.paginate +
          `?page=${page}&total=${limit}&filter[search]=${search}`
      );
      return response.data;
    },
  });
};

export const useTaluqSelectQuery: (
  enabled: boolean
) => UseQueryResult<TaluqType[], unknown> = (enabled) => {
  return useQuery({
    queryKey: [TaluqSelectQueryKey],
    queryFn: async () => {
      const response = await api.get<{ data: TaluqType[] }>(
        api_routes.admin.taluq.all
      );
      return response.data.data;
    },
    enabled,
  });
};

export const useTaluqQuery: (
  id: number,
  enabled: boolean
) => UseQueryResult<TaluqType, unknown> = (id, enabled) => {
  return useQuery({
    queryKey: [TaluqQueryKey, id],
    queryFn: async () => {
      const response = await api.get<{ data: TaluqType }>(
        api_routes.admin.taluq.view(id)
      );
      return response.data.data;
    },
    enabled,
  });
};
