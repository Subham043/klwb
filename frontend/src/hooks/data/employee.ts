import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { EmployeeType, PaginationType } from "../../utils/types";
import { useAxios } from "../useAxios";
import { api_routes } from "../../utils/routes/api";
import { useSearchQueryParam } from "../useSearchQueryParam";
import { usePaginationQueryParam } from "../usePaginationQueryParam";

export const EmployeeQueryKey = "employee";
export const EmployeesQueryKey = "employees";

export const useEmployeesQuery: () => UseQueryResult<
  PaginationType<EmployeeType>,
  unknown
> = () => {
  const axios = useAxios();
  const { page, limit } = usePaginationQueryParam();
  const { search } = useSearchQueryParam();
  return useQuery({
    queryKey: [EmployeesQueryKey, page, limit, search],
    queryFn: async () => {
      const response = await axios.get<PaginationType<EmployeeType>>(
        api_routes.admin.employee.paginate +
          `?page=${page}&total=${limit}&filter[search]=${search}`
      );
      return response.data;
    },
  });
};

export const useEmployeeQuery: (
  id: number,
  enabled: boolean
) => UseQueryResult<EmployeeType, unknown> = (id, enabled) => {
  const axios = useAxios();
  return useQuery({
    queryKey: [EmployeeQueryKey, id],
    queryFn: async () => {
      const response = await axios.get<{ data: EmployeeType }>(
        api_routes.admin.employee.view(id)
      );
      return response.data.data;
    },
    enabled,
  });
};
