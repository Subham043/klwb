import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { NonContributionType, PaginationType } from "../../utils/types";
import { useAxios } from "../useAxios";
import { api_routes } from "../../utils/routes/api";
import { usePaginationQueryParam } from "../usePaginationQueryParam";
import { useSearchQueryParam } from "../useSearchQueryParam";
import { useSearchParams } from "react-router-dom";

export const NonContributionQueryKey = "non_contribution";
export const NonContributionsQueryKey = "non_contributions";

export const useNonContributionsQuery: () => UseQueryResult<
  PaginationType<NonContributionType>,
  unknown
> = () => {
  const axios = useAxios();
  const { page, limit } = usePaginationQueryParam();
  const { search } = useSearchQueryParam();
  const [searchParams] = useSearchParams();
  return useQuery({
    queryKey: [NonContributionsQueryKey, page, limit, search, searchParams.get("year") || ""],
    queryFn: async () => {
      const response = await axios.get<PaginationType<NonContributionType>>(
        api_routes.admin.non_contribution.list +
          `?page=${page}&total=${limit}&filter[search]=${search}&filter[has_year]=${searchParams.get("year") || ""}`
      );
      return response.data;
    },
  });
};

export const useNonContributionQuery: (
  id: number,
  enabled: boolean
) => UseQueryResult<NonContributionType, unknown> = (id, enabled) => {
  const axios = useAxios();
  return useQuery({
    queryKey: [NonContributionQueryKey, id],
    queryFn: async () => {
      const response = await axios.get<{ data: NonContributionType }>(
        api_routes.admin.non_contribution.view(id)
      );
      return response.data.data;
    },
    enabled,
  });
};
