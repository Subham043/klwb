import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { IndustryNonRegisteredType, PaginationType } from "../../utils/types";
import { useAxios } from "../useAxios";
import { api_routes } from "../../utils/routes/api";
import { usePaginationQueryParam } from "../usePaginationQueryParam";
import { useSearchQueryParam } from "../useSearchQueryParam";

export const IndustryNonRegisteredQueryKey = "industry_non_registered";
export const IndustriesNonRegisteredQueryKey = "industries_non_registered";

export const useIndustriesNonRegisteredQuery: () => UseQueryResult<
  PaginationType<IndustryNonRegisteredType>,
  unknown
> = () => {
  const axios = useAxios();
  const { page, limit } = usePaginationQueryParam();
  const { search } = useSearchQueryParam();
  return useQuery({
    queryKey: [IndustriesNonRegisteredQueryKey, page, limit, search],
    queryFn: async () => {
      const response = await axios.get<
        PaginationType<IndustryNonRegisteredType>
      >(
        api_routes.admin.industry.non_registered.paginate +
          `?page=${page}&total=${limit}&filter[search]=${search}`
      );
      return response.data;
    },
  });
};

export const useIndustryNonRegisteredQuery: (
  id: number,
  enabled: boolean
) => UseQueryResult<IndustryNonRegisteredType, unknown> = (id, enabled) => {
  const axios = useAxios();
  return useQuery({
    queryKey: [IndustryNonRegisteredQueryKey, id],
    queryFn: async () => {
      const response = await axios.get<{ data: IndustryNonRegisteredType }>(
        api_routes.admin.industry.non_registered.view(id)
      );
      return response.data.data;
    },
    enabled,
  });
};
