import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { api_routes } from "../../utils/api_routes";
import { useSearchParams } from "react-router-dom";
import { QueryInitialPageParam, QueryTotalCount } from "../../utils/constants";
import { TaluqType, PaginationType } from "../../utils/types";
import { useAxios } from "../useAxios";

export const TaluqQueryKey = "taluq";
export const TaluqsQueryKey = "taluqs";
export const TaluqSelectQueryKey = "taluq_select";
export const TaluqCommonSelectQueryKey = "taluq_common_select";

export const useTaluqsQuery: () => UseQueryResult<
  PaginationType<TaluqType>,
  unknown
> = () => {
  const axios = useAxios();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || QueryInitialPageParam.toString();
  const limit = searchParams.get("limit") || QueryTotalCount.toString();
  const search = searchParams.get("search") || "";
  return useQuery({
    queryKey: [TaluqsQueryKey, page, limit, search],
    queryFn: async () => {
      const response = await axios.get<PaginationType<TaluqType>>(
        api_routes.admin.taluq.paginate +
          `?page=${page}&total=${limit}&filter[search]=${search}`
      );
      return response.data;
    },
  });
};

export const useTaluqSelectQuery: (
  enabled: boolean,
  city_id?: number
) => UseQueryResult<TaluqType[], unknown> = (enabled, city_id) => {
  const axios = useAxios();
  return useQuery({
    queryKey: [TaluqSelectQueryKey, city_id],
    queryFn: async () => {
      const response = await axios.get<{ data: TaluqType[] }>(
        api_routes.admin.taluq.all + (city_id ? `?city_id=${city_id}` : "")
      );
      return response.data.data;
    },
    enabled,
  });
};

export const useTaluqCommonSelectQuery: (
  enabled: boolean,
  city_id?: number
) => UseQueryResult<TaluqType[], unknown> = (enabled, city_id) => {
  const axios = useAxios();
  return useQuery({
    queryKey: [TaluqCommonSelectQueryKey, city_id],
    queryFn: async () => {
      const response = await axios.get<{ data: TaluqType[] }>(
        api_routes.user.taluq.all + (city_id ? `?city_id=${city_id}` : "")
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
  const axios = useAxios();
  return useQuery({
    queryKey: [TaluqQueryKey, id],
    queryFn: async () => {
      const response = await axios.get<{ data: TaluqType }>(
        api_routes.admin.taluq.view(id)
      );
      return response.data.data;
    },
    enabled,
  });
};
