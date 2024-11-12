import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { IndustryType, PaginationType } from "../../utils/types";
import { useAxios } from "../useAxios";
import { api_routes } from "../../utils/routes/api";
import { usePaginationQueryParam } from "../usePaginationQueryParam";
import { useSearchQueryParam } from "../useSearchQueryParam";
import { useSearchParams } from "react-router-dom";

export const IndustryQueryKey = "industry";
export const IndustriesQueryKey = "industries";
export const IndustrySelectQueryKey = "industry_select";
export const IndustryCommonSelectQueryKey =
  "industry_common_select";
export const IndustryUserCommonSelectQueryKey =
  "industry_common_select";

export const useIndustriesQuery: () => UseQueryResult<
  PaginationType<IndustryType>,
  unknown
> = () => {
  const axios = useAxios();
  const { page, limit } = usePaginationQueryParam();
  const { search } = useSearchQueryParam();
  const [searchParams] = useSearchParams();
  return useQuery({
    queryKey: [IndustriesQueryKey, page, limit, search, searchParams.get("active_status") || ""],
    queryFn: async () => {
      const response = await axios.get<PaginationType<IndustryType>>(
        api_routes.admin.industry.paginate +
          `?page=${page}&total=${limit}&filter[search]=${search}&filter[active_status]=${searchParams.get("active_status") || ""}`
      );
      return response.data;
    },
  });
};

export const useIndustrySelectQuery: (
  enabled: boolean
) => UseQueryResult<IndustryType[], unknown> = (
  enabled
) => {
  const axios = useAxios();
  return useQuery({
    queryKey: [IndustrySelectQueryKey],
    queryFn: async () => {
      const response = await axios.get<{ data: IndustryType[] }>(
        api_routes.admin.industry.all
      );
      return response.data.data;
    },
    enabled,
  });
};

export const useIndustryCommonSelectQuery: (
  enabled: boolean,
  search?: string
) => UseQueryResult<IndustryType[], unknown> = (
  enabled,
  search = ''
) => {
  const axios = useAxios();
  return useQuery({
    queryKey: [IndustryCommonSelectQueryKey],
    queryFn: async () => {
      const response = await axios.get<{ data: IndustryType[] }>(
        api_routes.user.industry.all +
        (search ? `?filter[search]=${search}` : "")
      );
      return response.data.data;
    },
    enabled,
  });
};

export const useIndustryUserCommonSelectQuery: (
  enabled: boolean,
  taluq_id?: number
) => UseQueryResult<IndustryType[], unknown> = (
  enabled,
  taluq_id
) => {
  const axios = useAxios();
  return useQuery({
    queryKey: [IndustryUserCommonSelectQueryKey, taluq_id],
    queryFn: async () => {
      const response = await axios.get<{ data: IndustryType[] }>(
        api_routes.user.industry.all +
        (taluq_id ? `?filter[has_taluq]=${taluq_id}` : "")
      );
      return response.data.data;
    },
    enabled,
  });
};

export const useIndustryQuery: (
  id: number,
  enabled: boolean
) => UseQueryResult<IndustryType, unknown> = (id, enabled) => {
  const axios = useAxios();
  return useQuery({
    queryKey: [IndustryQueryKey, id],
    queryFn: async () => {
      const response = await axios.get<{ data: IndustryType }>(
        api_routes.admin.industry.view(id)
      );
      return response.data.data;
    },
    enabled,
  });
};
