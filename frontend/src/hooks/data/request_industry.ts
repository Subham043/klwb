import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { RequestIndustryType, PaginationType } from "../../utils/types";
import { useAxios } from "../useAxios";
import { api_routes } from "../../utils/routes/api";
import { usePaginationQueryParam } from "../usePaginationQueryParam";
import { useSearchQueryParam } from "../useSearchQueryParam";

export const RequestIndustryQueryKey = "request_industry";
export const RequestIndustriesQueryKey = "request_industries";
export const RequestIndustrySelectQueryKey = "request_industry_select";

export const useRequestIndustriesQuery: () => UseQueryResult<
  PaginationType<RequestIndustryType>,
  unknown
> = () => {
  const axios = useAxios();
  const { page, limit } = usePaginationQueryParam();
  const { search } = useSearchQueryParam();
  return useQuery({
    queryKey: [RequestIndustriesQueryKey, page, limit, search],
    queryFn: async () => {
      const response = await axios.get<PaginationType<RequestIndustryType>>(
        api_routes.admin.request_industry.paginate +
          `?page=${page}&total=${limit}&filter[search]=${search}`
      );
      return response.data;
    },
  });
};

export const useRequestIndustrySelectQuery: (
  enabled: boolean
) => UseQueryResult<RequestIndustryType[], unknown> = (enabled) => {
  const axios = useAxios();
  return useQuery({
    queryKey: [RequestIndustrySelectQueryKey],
    queryFn: async () => {
      const response = await axios.get<{ data: RequestIndustryType[] }>(
        api_routes.admin.request_industry.all
      );
      return response.data.data;
    },
    enabled,
  });
};

export const useRequestIndustryQuery: (
  id: number,
  enabled: boolean
) => UseQueryResult<RequestIndustryType, unknown> = (id, enabled) => {
  const axios = useAxios();
  return useQuery({
    queryKey: [RequestIndustryQueryKey, id],
    queryFn: async () => {
      const response = await axios.get<{ data: RequestIndustryType }>(
        api_routes.admin.request_industry.view(id)
      );
      return response.data.data;
    },
    enabled,
  });
};
