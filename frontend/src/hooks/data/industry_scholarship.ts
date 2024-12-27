import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { ApplicationDateType, PaginationType, StudentApplicationType } from "../../utils/types";
import { useAxios } from "../useAxios";
import { api_routes } from "../../utils/routes/api";
import { usePaginationQueryParam } from "../usePaginationQueryParam";
import { useSearchQueryParam } from "../useSearchQueryParam";
import { useSearchParams } from "react-router-dom";

export const IndustryScholarshipViewQueryKey = "industry_scholarship_view";
export const IndustryScholarshipListQueryKey = "industry_scholarship_list";

export const useIndustryScholarshipListQuery: () => UseQueryResult<
  PaginationType<StudentApplicationType>,
  unknown
> = () => {
  const axios = useAxios();
  const { page, limit } = usePaginationQueryParam();
  const { search } = useSearchQueryParam();
  const [searchParams] = useSearchParams();
  return useQuery({
    queryKey: [IndustryScholarshipListQueryKey, page, limit, search, searchParams.get("year") || "", searchParams.get("status") || ""],
    queryFn: async () => {
      const response = await axios.get<PaginationType<StudentApplicationType>>(
        api_routes.industry.scholarship.list +
          `?page=${page}&total=${limit}&filter[search]=${search}&filter[year]=${searchParams.get("year") || ""}&filter[status]=${searchParams.get("status") || ""}`
      );
      return response.data;
    },
  });
};

export const useIndustryScholarshipViewQuery: (
  id: number,
  enabled: boolean
) => UseQueryResult<{ message: string, application: StudentApplicationType|null, application_date: ApplicationDateType, can_approve: boolean }, unknown> = (id, enabled) => {
  const axios = useAxios();
  return useQuery({
    queryKey: [IndustryScholarshipViewQueryKey, id],
    queryFn: async () => {
      const response = await axios.get<{ message: string, application: StudentApplicationType|null, application_date: ApplicationDateType, can_approve: boolean }>(
        api_routes.industry.scholarship.view(id)
      );
      return response.data;
    },
    enabled,
  });
};