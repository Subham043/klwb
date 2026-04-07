import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { ActivityLogType, ContributionType, PaginationType } from "../../utils/types";
import { useAxios } from "../useAxios";
import { api_routes } from "../../utils/routes/api";
import { useSearchQueryParam } from "../useSearchQueryParam";
import { usePaginationQueryParam } from "../usePaginationQueryParam";
import { useSearchParams } from "react-router-dom";

export const PaymentFullContributionsQueryKey = "payment_full_contributions";
export const PaymentFullContributionsActivityLogsQueryKey = "payment_full_contributions_activity_log";

export const usePaymentFullContributionsQuery: () => UseQueryResult<
  PaginationType<ContributionType>,
  unknown
> = () => {
  const axios = useAxios();
  const { page, limit } = usePaginationQueryParam();
  const { search } = useSearchQueryParam();
  const [searchParams] = useSearchParams();
  return useQuery({
    queryKey: [PaymentFullContributionsQueryKey, page, limit, search, searchParams.get("year") || "", searchParams.get("from_date") || "", searchParams.get("to_date") || "", searchParams.get("status") || ""],
    queryFn: async () => {
      const response = await axios.get<PaginationType<ContributionType>>(
        api_routes.admin.payment_full_contribution.list +
        `?page=${page}&total=${limit}&filter[search]=${encodeURIComponent(search)}&filter[year]=${searchParams.get("year") || ""}&filter[from_date]=${searchParams.get("from_date") || ""}&filter[to_date]=${searchParams.get("to_date") || ""}&filter[status]=${searchParams.get("status") || ""}`
      );
      return response.data;
    },
  });
};

export const usePaymentFullContributionsActivityLogsQuery: (props: { enabled?: boolean }) => UseQueryResult<
  PaginationType<ActivityLogType>,
  unknown
> = ({ enabled = false }) => {
  const axios = useAxios();
  const { page, limit } = usePaginationQueryParam();
  const { search } = useSearchQueryParam();
  const [searchParams] = useSearchParams();
  return useQuery({
    queryKey: [PaymentFullContributionsActivityLogsQueryKey, page, limit, search, searchParams.get("year") || "", searchParams.get("from_date") || "", searchParams.get("to_date") || "", searchParams.get("status") || ""],
    queryFn: async () => {
      const response = await axios.get<
        PaginationType<ActivityLogType>
      >(
        api_routes.admin.contribution.payment_activity_log +
        `?page=${page}&total=${limit}&filter[search]=${encodeURIComponent(search)}&filter[payments.year]=${searchParams.get("year") || ""}&filter[from_date]=${searchParams.get("from_date") || ""}&filter[to_date]=${searchParams.get("to_date") || ""}&filter[payments.status]=${searchParams.get("status") || ""}`
      );
      return response.data;
    },
    enabled,
  });
};