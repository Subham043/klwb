import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { PaymentType, PaginationType } from "../../utils/types";
import { useAxios } from "../useAxios";
import { api_routes } from "../../utils/routes/api";
import { useSearchQueryParam } from "../useSearchQueryParam";
import { usePaginationQueryParam } from "../usePaginationQueryParam";
import { useSearchParams } from "react-router-dom";

export const IndustryPaymentQueryKey = "payment";
export const IndustryPaymentStatusQueryKey = "payment_status";
export const IndustryPaymentsQueryKey = "payments";
export const IndustryPaymentPadiYearQueryKey = "payment_select";

export const useIndustryPaymentsQuery: () => UseQueryResult<
  PaginationType<PaymentType>,
  unknown
> = () => {
  const axios = useAxios();
  const { page, limit } = usePaginationQueryParam();
  const { search } = useSearchQueryParam();
  const [searchParams] = useSearchParams();
  return useQuery({
    queryKey: [IndustryPaymentsQueryKey, page, limit, search, searchParams.get("year") || ""],
    queryFn: async () => {
      const response = await axios.get<PaginationType<PaymentType>>(
        api_routes.industry.payment.list +
          `?page=${page}&total=${limit}&filter[search]=${search}&filter[year]=${searchParams.get("year") || ""}`
      );
      return response.data;
    },
  });
};

export const useIndustryPaymentPaidYearQuery: (
  enabled: boolean
) => UseQueryResult<number[], unknown> = (enabled) => {
  const axios = useAxios();
  return useQuery({
    queryKey: [IndustryPaymentPadiYearQueryKey],
    queryFn: async () => {
      const response = await axios.get<{ data: number[] }>(
        api_routes.industry.payment.paid_years
      );
      return response.data.data;
    },
    enabled,
  });
};

export const useIndustryPaymentQuery: (
  id: number,
  enabled: boolean
) => UseQueryResult<PaymentType, unknown> = (id, enabled) => {
  const axios = useAxios();
  return useQuery({
    queryKey: [IndustryPaymentQueryKey, id],
    queryFn: async () => {
      const response = await axios.get<{ data: PaymentType }>(
        api_routes.industry.payment.view(id)
      );
      return response.data.data;
    },
    enabled,
  });
};

export const useIndustryPaymentStatusQuery: (
  id: number,
  enabled: boolean
) => UseQueryResult<PaymentType, unknown> = (id, enabled) => {
  const axios = useAxios();
  return useQuery({
    queryKey: [IndustryPaymentStatusQueryKey, id],
    queryFn: async () => {
      const response = await axios.get<{ data: PaymentType }>(
        api_routes.industry.payment.status(id)
      );
      return response.data.data;
    },
    enabled,
  });
};
