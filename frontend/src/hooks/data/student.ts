import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AuthType, PaginationType } from "../../utils/types";
import { useAxios } from "../useAxios";
import { api_routes } from "../../utils/routes/api";
import { useSearchQueryParam } from "../useSearchQueryParam";
import { usePaginationQueryParam } from "../usePaginationQueryParam";

export const StudentQueryKey = "student";
export const StudentsQueryKey = "students";

export const useStudentsQuery: () => UseQueryResult<
  PaginationType<AuthType>,
  unknown
> = () => {
  const axios = useAxios();
  const { page, limit } = usePaginationQueryParam();
  const { search } = useSearchQueryParam();
  return useQuery({
    queryKey: [StudentsQueryKey, page, limit, search],
    queryFn: async () => {
      const response = await axios.get<PaginationType<AuthType>>(
        api_routes.admin.student.paginate +
          `?page=${page}&total=${limit}&filter[search]=${search}`
      );
      return response.data;
    },
  });
};

export const useStudentQuery: (
  id: number,
  enabled: boolean
) => UseQueryResult<AuthType, unknown> = (id, enabled) => {
  const axios = useAxios();
  return useQuery({
    queryKey: [StudentQueryKey, id],
    queryFn: async () => {
      const response = await axios.get<{ data: AuthType }>(
        api_routes.admin.student.view(id)
      );
      return response.data.data;
    },
    enabled,
  });
};
