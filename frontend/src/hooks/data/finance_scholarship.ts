import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { ApplicationDateType, PaginationType, StudentApplicationType } from "../../utils/types";
import { useAxios } from "../useAxios";
import { api_routes } from "../../utils/routes/api";
import { usePaginationQueryParam } from "../usePaginationQueryParam";
import { useSearchQueryParam } from "../useSearchQueryParam";
import { useSearchParams } from "react-router-dom";

export const FinanceScholarshipViewQueryKey = "finance_scholarship_view";
export const FinanceScholarshipListQueryKey = "finance_scholarship_list";

export const useFinanceScholarshipListQuery: () => UseQueryResult<
  PaginationType<StudentApplicationType>,
  unknown
> = () => {
  const axios = useAxios();
  const { page, limit } = usePaginationQueryParam();
  const { search } = useSearchQueryParam();
  const [searchParams] = useSearchParams();
  return useQuery({
    queryKey: [FinanceScholarshipListQueryKey, page, limit, search, searchParams.get("gender") || "", searchParams.get("category") || "", searchParams.get("year") || "", searchParams.get("payment_status") || "", searchParams.get("city_id") || "", searchParams.get("taluq_id") || "", searchParams.get("graduation_id") || "", searchParams.get("course_id") || "", searchParams.get("class_id") || ""],
    queryFn: async () => {
      const response = await axios.get<PaginationType<StudentApplicationType>>(
        api_routes.finance.scholarship.list +
          `?page=${page}&total=${limit}&filter[search]=${encodeURIComponent(search)}&filter[has_city]=${searchParams.get("city_id") || ""}&filter[has_taluq]=${searchParams.get("taluq_id") || ""}&filter[has_graduation]=${searchParams.get("graduation_id") || ""}&filter[has_course]=${searchParams.get("course_id") || ""}&filter[has_class]=${searchParams.get("class_id") || ""}&filter[year]=${searchParams.get("year") || ""}&filter[payment_status]=${searchParams.get("payment_status") || ""}&filter[has_gender]=${searchParams.get("gender") || ""}&filter[has_category]=${searchParams.get("category") || ""}`
      );
      return response.data;
    },
  });
};

export const useFinanceScholarshipViewQuery: (
  id: number,
  enabled: boolean
) => UseQueryResult<{ message: string, application: StudentApplicationType|null, application_date: ApplicationDateType }, unknown> = (id, enabled) => {
  const axios = useAxios();
  return useQuery({
    queryKey: [FinanceScholarshipViewQueryKey, id],
    queryFn: async () => {
      const response = await axios.get<{ message: string, application: StudentApplicationType|null, application_date: ApplicationDateType }>(
        api_routes.finance.scholarship.view(id)
      );
      return response.data;
    },
    enabled,
  });
};