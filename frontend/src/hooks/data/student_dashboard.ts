import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { useAxios } from "../useAxios";
import { api_routes } from "../../utils/routes/api";

export const StudentDashboardQueryKey = "student_dashboard";

export const useStudentDashboardQuery: () => UseQueryResult<{ message: string, is_scholarship_open: boolean, is_eligible_to_apply: boolean, can_resubmit: boolean, total_application: number, total_approved_application: number, total_rejected_application: number, total_scholarship_amount: number }, unknown> = () => {
  const axios = useAxios();
  return useQuery({
    queryKey: [StudentDashboardQueryKey],
    queryFn: async () => {
      const response = await axios.get<{ message: string, is_scholarship_open: boolean, is_eligible_to_apply: boolean, can_resubmit: boolean, total_application: number, total_approved_application: number, total_rejected_application: number, total_scholarship_amount: number }>(
        api_routes.user.dashboard
      );
      return response.data;
    },
  });
};