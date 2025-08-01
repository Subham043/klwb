import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { ContributionType, PaginationType } from "../../utils/types";
import { useAxios } from "../useAxios";
import { api_routes } from "../../utils/routes/api";
import { useSearchQueryParam } from "../useSearchQueryParam";
import { usePaginationQueryParam } from "../usePaginationQueryParam";
import { useSearchParams } from "react-router-dom";

export const PaymentOfficerContributionQueryKey = "payment_officer_contribution";
export const PaymentOfficerContributionsQueryKey = "payment_officer_contributions";

export const usePaymentOfficerContributionsQuery: () => UseQueryResult<
  PaginationType<ContributionType>,
  unknown
> = () => {
  const axios = useAxios();
  const { page, limit } = usePaginationQueryParam();
  const { search } = useSearchQueryParam();
  const [searchParams] = useSearchParams();
  return useQuery({
    queryKey: [PaymentOfficerContributionsQueryKey, page, limit, search, searchParams.get("city_id") || "", searchParams.get("taluq_id") || "", searchParams.get("year") || "", searchParams.get("from_date") || "", searchParams.get("to_date") || ""],
    queryFn: async () => {
      const response = await axios.get<PaginationType<ContributionType>>(
        api_routes.payment_officer.contribution.list +
          `?page=${page}&total=${limit}&filter[search]=${encodeURIComponent(search)}&filter[has_city]=${searchParams.get("city_id") || ""}&filter[has_taluq]=${searchParams.get("taluq_id") || ""}&filter[year]=${searchParams.get("year") || ""}&filter[from_date]=${searchParams.get("from_date") || ""}&filter[to_date]=${searchParams.get("to_date") || ""}`
      );
      return response.data;
    },
  });
};

export const usePaymentOfficerContributionQuery: (
  id: number,
  enabled: boolean
) => UseQueryResult<ContributionType, unknown> = (id, enabled) => {
  const axios = useAxios();
  return useQuery({
    queryKey: [PaymentOfficerContributionQueryKey, id],
    queryFn: async () => {
      const response = await axios.get<{ data: ContributionType }>(
        api_routes.payment_officer.contribution.view(id)
      );
      return response.data.data;
    },
    enabled,
  });
};
