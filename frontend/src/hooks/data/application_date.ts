import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { ApplicationDateType, PaginationType } from "../../utils/types";
import { useAxios } from "../useAxios";
import { api_routes } from "../../utils/routes/api";
import { usePaginationQueryParam } from "../usePaginationQueryParam";
import { useSearchQueryParam } from "../useSearchQueryParam";

export const ApplicationDateQueryKey = "application_date";
export const ApplicationDatesQueryKey = "application_dates";
export const ApplicationDateSelectQueryKey = "application_date_select";

export const useApplicationDatesQuery: () => UseQueryResult<
  PaginationType<ApplicationDateType>,
  unknown
> = () => {
  const axios = useAxios();
  const { page, limit } = usePaginationQueryParam();
  const { search } = useSearchQueryParam();
  return useQuery({
    queryKey: [ApplicationDatesQueryKey, page, limit, search],
    queryFn: async () => {
      const response = await axios.get<PaginationType<ApplicationDateType>>(
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
  const axios = useAxios();
  return useQuery({
    queryKey: [ApplicationDateSelectQueryKey],
    queryFn: async () => {
      const response = await axios.get<{ data: ApplicationDateType[] }>(
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
  const axios = useAxios();
  return useQuery({
    queryKey: [ApplicationDateQueryKey, id],
    queryFn: async () => {
      const response = await axios.get<{ data: ApplicationDateType }>(
        api_routes.admin.application_date.view(id)
      );
      return response.data.data;
    },
    enabled,
  });
};
