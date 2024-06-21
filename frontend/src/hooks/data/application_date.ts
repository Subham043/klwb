import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { api_routes } from "../../utils/api_routes";
import { useSearchParams } from "react-router-dom";
import { QueryInitialPageParam, QueryTotalCount } from "../../utils/constants";
import api from "../../utils/axios";
import { ApplicationDateType, PaginationType } from "../../utils/types";

export const ApplicationDateQueryKey = "application_date";
export const ApplicationDatesQueryKey = "application_dates";
export const ApplicationDateSelectQueryKey = "application_date_select";

export const useApplicationDatesQuery: () => UseQueryResult<
  PaginationType<ApplicationDateType>,
  unknown
> = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || QueryInitialPageParam.toString();
  const limit = searchParams.get("limit") || QueryTotalCount.toString();
  const search = searchParams.get("search") || "";
  return useQuery({
    queryKey: [ApplicationDatesQueryKey, page, limit, search],
    queryFn: async () => {
      const response = await api.get<PaginationType<ApplicationDateType>>(
        api_routes.admin.application_date.paginate +
          `?page=${page}&total=${limit}&filter[search]=${search}`
      );
      return response.data;
    },
  });
};

export const useApplicationDateSelectQuery: (
  enabled: boolean
) => UseQueryResult<ApplicationDateType[], unknown> = (enabled) => {
  return useQuery({
    queryKey: [ApplicationDateSelectQueryKey],
    queryFn: async () => {
      const response = await api.get<{ data: ApplicationDateType[] }>(
        api_routes.admin.application_date.all
      );
      return response.data.data;
    },
    enabled,
  });
};

export const useApplicationDateQuery: (
  id: number,
  enabled: boolean
) => UseQueryResult<ApplicationDateType, unknown> = (id, enabled) => {
  return useQuery({
    queryKey: [ApplicationDateQueryKey, id],
    queryFn: async () => {
      const response = await api.get<{ data: ApplicationDateType }>(
        api_routes.admin.application_date.view(id)
      );
      return response.data.data;
    },
    enabled,
  });
};
