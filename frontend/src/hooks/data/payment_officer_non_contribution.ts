import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { NonContributionType, PaginationType } from "../../utils/types";
import { useAxios } from "../useAxios";
import { api_routes } from "../../utils/routes/api";
import { usePaginationQueryParam } from "../usePaginationQueryParam";
import { useSearchQueryParam } from "../useSearchQueryParam";
import { useSearchParams } from "react-router-dom";

export const PaymentOfficerNonContributionQueryKey = "payment_officer_non_contribution";
export const PaymentOfficerNonContributionsQueryKey = "payment_officer_non_contributions";

export const usePaymentOfficerNonContributionsQuery: () => UseQueryResult<
  PaginationType<NonContributionType>,
  unknown
> = () => {
  const axios = useAxios();
  const { page, limit } = usePaginationQueryParam();
  const { search } = useSearchQueryParam();
  const [searchParams] = useSearchParams();
  return useQuery({
    queryKey: [PaymentOfficerNonContributionsQueryKey, page, limit, search, searchParams.get("year") || "", searchParams.get("status") || ""],
    queryFn: async () => {
      const response = await axios.get<PaginationType<NonContributionType>>(
        api_routes.payment_officer.non_contribution.list +
          `?page=${page}&total=${limit}&filter[search]=${search}&filter[year]=${searchParams.get("year") || ""}&filter[status]=${searchParams.get("status") || ""}`
      );
      return response.data;
    },
  });
};

export const usePaymentOfficerNonContributionQuery: (
  id: number,
  enabled: boolean
) => UseQueryResult<NonContributionType, unknown> = (id, enabled) => {
  const axios = useAxios();
  return useQuery({
    queryKey: [PaymentOfficerNonContributionQueryKey, id],
    queryFn: async () => {
      const response = await axios.get<{ data: NonContributionType }>(
        api_routes.payment_officer.non_contribution.view(id)
      );
      return response.data.data;
    },
    enabled,
  });
};
