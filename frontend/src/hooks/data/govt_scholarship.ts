import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { ApplicationDateType, PaginationType, StudentApplicationType } from "../../utils/types";
import { useAxios } from "../useAxios";
import { api_routes } from "../../utils/routes/api";
import { usePaginationQueryParam } from "../usePaginationQueryParam";
import { useSearchQueryParam } from "../useSearchQueryParam";
import { useSearchParams } from "react-router-dom";

export const GovtScholarshipViewQueryKey = "govt_scholarship_view";
export const GovtScholarshipListQueryKey = "govt_scholarship_list";

export const useGovtScholarshipListQuery: () => UseQueryResult<
  PaginationType<StudentApplicationType>,
  unknown
> = () => {
  const axios = useAxios();
  const { page, limit } = usePaginationQueryParam();
  const { search } = useSearchQueryParam();
  const [searchParams] = useSearchParams();
  return useQuery({
    queryKey: [GovtScholarshipListQueryKey, page, limit, search, searchParams.get("gender") || "", searchParams.get("category") || "", searchParams.get("year") || "", searchParams.get("status") || "", searchParams.get("city_id") || "", searchParams.get("taluq_id") || "", searchParams.get("graduation_id") || "", searchParams.get("course_id") || "", searchParams.get("class_id") || ""],
    queryFn: async () => {
      const response = await axios.get<PaginationType<StudentApplicationType>>(
        api_routes.govt.scholarship.list +
          `?page=${page}&total=${limit}&filter[search]=${search}&filter[has_city]=${searchParams.get("city_id") || ""}&filter[has_taluq]=${searchParams.get("taluq_id") || ""}&filter[has_graduation]=${searchParams.get("graduation_id") || ""}&filter[has_course]=${searchParams.get("course_id") || ""}&filter[has_class]=${searchParams.get("class_id") || ""}&filter[application_year]=${searchParams.get("year") || ""}&filter[status]=${searchParams.get("status") || ""}&filter[has_gender]=${searchParams.get("gender") || ""}&filter[has_category]=${searchParams.get("category") || ""}`
      );
      return response.data;
    },
  });
};

export const useGovtScholarshipViewQuery: (
  id: number,
  enabled: boolean
) => UseQueryResult<{ message: string, application: StudentApplicationType|null, application_date: ApplicationDateType, can_approve: boolean }, unknown> = (id, enabled) => {
  const axios = useAxios();
  return useQuery({
    queryKey: [GovtScholarshipViewQueryKey, id],
    queryFn: async () => {
      const response = await axios.get<{ message: string, application: StudentApplicationType|null, application_date: ApplicationDateType, can_approve: boolean }>(
        api_routes.govt.scholarship.view(id)
      );
      return response.data;
    },
    enabled,
  });
};