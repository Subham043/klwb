import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { TaluqType, PaginationType } from "../../utils/types";
import { useAxios } from "../useAxios";
import { api_routes } from "../../utils/routes/api";
import { usePaginationQueryParam } from "../usePaginationQueryParam";
import { useSearchQueryParam } from "../useSearchQueryParam";
import { useSearchParams } from "react-router-dom";

export const TaluqQueryKey = "taluq";
export const TaluqsQueryKey = "taluqs";
export const TaluqSelectQueryKey = "taluq_select";
export const TaluqCommonSelectQueryKey = "taluq_common_select";

export const useTaluqsQuery: () => UseQueryResult<
  PaginationType<TaluqType>,
  unknown
> = () => {
  const axios = useAxios();
  const { page, limit } = usePaginationQueryParam();
  const { search } = useSearchQueryParam();
  const [searchParams] = useSearchParams();
  return useQuery({
    queryKey: [TaluqsQueryKey, page, limit, search, searchParams.get("city_id") || "", searchParams.get("active_status") || ""],
    queryFn: async () => {
      const response = await axios.get<PaginationType<TaluqType>>(
        api_routes.admin.taluq.paginate +
          `?page=${page}&total=${limit}&filter[search]=${encodeURIComponent(search)}&filter[has_city]=${searchParams.get("city_id") || ""}&filter[active_status]=${searchParams.get("active_status") || ""}`
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
        api_routes.admin.taluq.all + (city_id ? `?filter[has_city]=${city_id}` : "")
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
        api_routes.user.taluq.all + (city_id ? `?filter[has_city]=${city_id}` : "")
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
