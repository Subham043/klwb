import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { NonRegisteredIndustryType, PaginationType } from "../../utils/types";
import { useAxios } from "../useAxios";
import { api_routes } from "../../utils/routes/api";
import { usePaginationQueryParam } from "../usePaginationQueryParam";
import { useSearchQueryParam } from "../useSearchQueryParam";
import { useSearchParams } from "react-router-dom";

export const NonRegisteredIndustryQueryKey = "non_registered_industry";
export const NonRegisteredIndustriesQueryKey = "non_registered_industries";

export const useNonRegisteredIndustriesQuery: () => UseQueryResult<
  PaginationType<NonRegisteredIndustryType>,
  unknown
> = () => {
  const axios = useAxios();
  const { page, limit } = usePaginationQueryParam();
  const { search } = useSearchQueryParam();
  const [searchParams] = useSearchParams();
  return useQuery({
    queryKey: [NonRegisteredIndustriesQueryKey, page, limit, search, searchParams.get("active_status") || ""],
    queryFn: async () => {
      const response = await axios.get<
        PaginationType<NonRegisteredIndustryType>
      >(
        api_routes.admin.non_registered_industry.paginate +
          `?page=${page}&total=${limit}&filter[search]=${encodeURIComponent(search)}&filter[active_status]=${searchParams.get("active_status") || ""}`
      );
      return response.data;
    },
  });
};

export const useNonRegisteredIndustryQuery: (
  id: number,
  enabled: boolean
) => UseQueryResult<NonRegisteredIndustryType, unknown> = (id, enabled) => {
  const axios = useAxios();
  return useQuery({
    queryKey: [NonRegisteredIndustryQueryKey, id],
    queryFn: async () => {
      const response = await axios.get<{ data: NonRegisteredIndustryType }>(
        api_routes.admin.non_registered_industry.view(id)
      );
      return response.data.data;
    },
    enabled,
  });
};
