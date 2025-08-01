import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { ApplicationDateType, PaginationType, StudentApplicationType } from "../../utils/types";
import { useAxios } from "../useAxios";
import { api_routes } from "../../utils/routes/api";
import { usePaginationQueryParam } from "../usePaginationQueryParam";
import { useSearchQueryParam } from "../useSearchQueryParam";
import { useSearchParams } from "react-router-dom";

export const InstituteScholarshipViewQueryKey = "institute_scholarship_view";
export const InstituteScholarshipListQueryKey = "institute_scholarship_list";

export const useInstituteScholarshipListQuery: () => UseQueryResult<
  PaginationType<StudentApplicationType>,
  unknown
> = () => {
  const axios = useAxios();
  const { page, limit } = usePaginationQueryParam();
  const { search } = useSearchQueryParam();
  const [searchParams] = useSearchParams();
  return useQuery({
    queryKey: [InstituteScholarshipListQueryKey, page, limit, search, searchParams.get("year") || "", searchParams.get("status") || ""],
    queryFn: async () => {
      const response = await axios.get<PaginationType<StudentApplicationType>>(
        api_routes.institute.scholarship.list +
          `?page=${page}&total=${limit}&filter[search]=${encodeURIComponent(search)}&filter[year]=${searchParams.get("year") || ""}&filter[status]=${searchParams.get("status") || ""}`
      );
      return response.data;
    },
  });
};

export const useInstituteScholarshipViewQuery: (
  id: number,
  enabled: boolean
) => UseQueryResult<{ message: string, application: StudentApplicationType|null, application_date: ApplicationDateType, can_approve: boolean }, unknown> = (id, enabled) => {
  const axios = useAxios();
  return useQuery({
    queryKey: [InstituteScholarshipViewQueryKey, id],
    queryFn: async () => {
      const response = await axios.get<{ message: string, application: StudentApplicationType|null, application_date: ApplicationDateType, can_approve: boolean }>(
        api_routes.institute.scholarship.view(id)
      );
      return response.data;
    },
    enabled,
  });
};