import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { ContributionType, PaginationType } from "../../utils/types";
import { useAxios } from "../useAxios";
import { api_routes } from "../../utils/routes/api";
import { useSearchQueryParam } from "../useSearchQueryParam";
import { usePaginationQueryParam } from "../usePaginationQueryParam";
import { useSearchParams } from "react-router-dom";

export const NonContributionPaymentsQueryKey = "non_contribution_payments";

export const useNonContributionPaymentsQuery: (props: {industry_id: number, enabled?: boolean}) => UseQueryResult<
  PaginationType<ContributionType>,
  unknown
> = ({industry_id, enabled=false}) => {
  const axios = useAxios();
  const { page, limit } = usePaginationQueryParam("_non_contribution_payment");
  const { search } = useSearchQueryParam();
  const [searchParams] = useSearchParams();
  return useQuery({
    queryKey: [NonContributionPaymentsQueryKey, page, limit, industry_id, search, searchParams.get("year") || ""],
    queryFn: async () => {
      const response = await axios.get<PaginationType<ContributionType>>(
        api_routes.admin.non_contribution.payment_list(industry_id) +
          `?page=${page}&total=${limit}&filter[search]=${search}&filter[year]=${searchParams.get("year") || ""}`
      );
      return response.data;
    },
    enabled
  });
};