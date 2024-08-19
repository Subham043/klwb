import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { ApplicationDateType, PaginationType, StudentApplicationType } from "../../utils/types";
import { useAxios } from "../useAxios";
import { api_routes } from "../../utils/routes/api";
import { usePaginationQueryParam } from "../usePaginationQueryParam";
import { useSearchQueryParam } from "../useSearchQueryParam";

export const ScholarshipViewQueryKey = "scholarship_view";
export const ScholarshipListQueryKey = "scholarship_list";
export const ScholarshipStatusQueryKey = "scholarship_status";

export const useScholarshipStatusQuery: () => UseQueryResult<{ message: string, application: StudentApplicationType|null, application_date: ApplicationDateType, is_scholarship_open: boolean, is_eligible_to_apply: boolean, can_resubmit: boolean }, unknown> = () => {
  const axios = useAxios();
  return useQuery({
    queryKey: [ScholarshipStatusQueryKey],
    queryFn: async () => {
      const response = await axios.get<{ message: string, application: StudentApplicationType|null, application_date: ApplicationDateType, is_scholarship_open: boolean, is_eligible_to_apply: boolean, can_resubmit: boolean }>(
        api_routes.user.scholarship.status
      );
      return response.data;
    },
  });
};

export const useScholarshipListQuery: () => UseQueryResult<
  PaginationType<StudentApplicationType>,
  unknown
> = () => {
  const axios = useAxios();
  const { page, limit } = usePaginationQueryParam();
  const { search } = useSearchQueryParam();
  return useQuery({
    queryKey: [ScholarshipListQueryKey, page, limit, search],
    queryFn: async () => {
      const response = await axios.get<PaginationType<StudentApplicationType>>(
        api_routes.user.scholarship.list +
          `?page=${page}&total=${limit}&filter[search]=${search}`
      );
      return response.data;
    },
  });
};

export const useScholarshipViewQuery: (
  id: number,
  enabled: boolean
) => UseQueryResult<{ message: string, application: StudentApplicationType|null, application_date: ApplicationDateType, can_resubmit: boolean }, unknown> = (id, enabled) => {
  const axios = useAxios();
  return useQuery({
    queryKey: [ScholarshipViewQueryKey, id],
    queryFn: async () => {
      const response = await axios.get<{ message: string, application: StudentApplicationType|null, application_date: ApplicationDateType, can_resubmit: boolean }>(
        api_routes.user.scholarship.view(id)
      );
      return response.data;
    },
    enabled,
  });
};