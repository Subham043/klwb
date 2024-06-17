import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { api_routes } from "../../utils/api_routes";
import { useSearchParams } from "react-router-dom";
import { QueryInitialPageParam, QueryTotalCount } from "../../utils/constants";
import api from "../../utils/axios";
import { CityType, PaginationType } from "../../utils/types";

export const CityQueryKey = "city";
export const CitiesQueryKey = "cities";
export const CitySelectQueryKey = "city_select";

export const useCitiesQuery: () => UseQueryResult<
  PaginationType<CityType>,
  unknown
> = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || QueryInitialPageParam.toString();
  const limit = searchParams.get("limit") || QueryTotalCount.toString();
  const search = searchParams.get("search") || "";
  return useQuery({
    queryKey: [CitiesQueryKey, page, limit, search],
    queryFn: async () => {
      const response = await api.get<PaginationType<CityType>>(
        api_routes.admin.city.paginate +
          `?page=${page}&total=${limit}&filter[search]=${search}`
      );
      return response.data;
    },
  });
};

export const useCitySelectQuery: (
  enabled: boolean
) => UseQueryResult<CityType[], unknown> = (enabled) => {
  return useQuery({
    queryKey: [CitySelectQueryKey],
    queryFn: async () => {
      const response = await api.get<{ data: CityType[] }>(
        api_routes.admin.city.all
      );
      return response.data.data;
    },
    enabled,
  });
};

export const useCityQuery: (
  id: number,
  enabled: boolean
) => UseQueryResult<CityType, unknown> = (id, enabled) => {
  return useQuery({
    queryKey: [CityQueryKey, id],
    queryFn: async () => {
      const response = await api.get<{ data: CityType }>(
        api_routes.admin.city.view(id)
      );
      return response.data.data;
    },
    enabled,
  });
};
