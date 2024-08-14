import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { RegisteredIndustryType, PaginationType } from "../../utils/types";
import { useAxios } from "../useAxios";
import { api_routes } from "../../utils/routes/api";
import { usePaginationQueryParam } from "../usePaginationQueryParam";
import { useSearchQueryParam } from "../useSearchQueryParam";

export const RegisteredIndustryQueryKey = "registered_industry";
export const RegisteredIndustriesQueryKey = "registered_industries";
export const RegisteredIndustrySelectQueryKey = "registered_industry_select";
export const RegisteredIndustryCommonSelectQueryKey =
  "registered_industry_common_select";

export const useRegisteredIndustriesQuery: () => UseQueryResult<
  PaginationType<RegisteredIndustryType>,
  unknown
> = () => {
  const axios = useAxios();
  const { page, limit } = usePaginationQueryParam();
  const { search } = useSearchQueryParam();
  return useQuery({
    queryKey: [RegisteredIndustriesQueryKey, page, limit, search],
    queryFn: async () => {
      const response = await axios.get<PaginationType<RegisteredIndustryType>>(
        api_routes.admin.registered_industry.paginate +
          `?page=${page}&total=${limit}&filter[search]=${search}`
      );
      return response.data;
    },
  });
};

export const useRegisteredIndustrySelectQuery: (
  enabled: boolean
) => UseQueryResult<RegisteredIndustryType[], unknown> = (
  enabled
) => {
  const axios = useAxios();
  return useQuery({
    queryKey: [RegisteredIndustrySelectQueryKey],
    queryFn: async () => {
      const response = await axios.get<{ data: RegisteredIndustryType[] }>(
        api_routes.admin.registered_industry.all
      );
      return response.data.data;
    },
    enabled,
  });
};

export const useRegisteredIndustryCommonSelectQuery: (
  enabled: boolean,
  search?: string
) => UseQueryResult<RegisteredIndustryType[], unknown> = (
  enabled,
  search = ''
) => {
  const axios = useAxios();
  return useQuery({
    queryKey: [RegisteredIndustryCommonSelectQueryKey],
    queryFn: async () => {
      const response = await axios.get<{ data: RegisteredIndustryType[] }>(
        api_routes.user.registered_industry.all +
        (search ? `?filter[search]=${search}` : "")
      );
      return response.data.data;
    },
    enabled,
  });
};

export const useRegisteredIndustryQuery: (
  id: number,
  enabled: boolean
) => UseQueryResult<RegisteredIndustryType, unknown> = (id, enabled) => {
  const axios = useAxios();
  return useQuery({
    queryKey: [RegisteredIndustryQueryKey, id],
    queryFn: async () => {
      const response = await axios.get<{ data: RegisteredIndustryType }>(
        api_routes.admin.registered_industry.view(id)
      );
      return response.data.data;
    },
    enabled,
  });
};
