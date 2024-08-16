import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { ApplicationDateType, StudentApplicationType } from "../../utils/types";
import { useAxios } from "../useAxios";
import { api_routes } from "../../utils/routes/api";

export const ScholarshipStatusQueryKey = "scholarship_status";

export const useScholarshipStatusQuery: () => UseQueryResult<{ message: string, application: StudentApplicationType|null, application_date: ApplicationDateType, can_apply: boolean }, unknown> = () => {
  const axios = useAxios();
  return useQuery({
    queryKey: [ScholarshipStatusQueryKey],
    queryFn: async () => {
      const response = await axios.get<{ message: string, application: StudentApplicationType|null, application_date: ApplicationDateType, can_apply: boolean }>(
        api_routes.user.scholarship.status
      );
      return response.data;
    },
  });
};
