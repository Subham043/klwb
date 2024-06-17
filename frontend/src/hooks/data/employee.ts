import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { api_routes } from "../../utils/api_routes";
import { useSearchParams } from "react-router-dom";
import { QueryInitialPageParam, QueryTotalCount } from "../../utils/constants";
import api from "../../utils/axios";
import { EmployeeType, PaginationType } from "../../utils/types";

export const EmployeeQueryKey = "employee";
export const EmployeesQueryKey = "employees";

export const useEmployeesQuery: () => UseQueryResult<
  PaginationType<EmployeeType>,
  unknown
> = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || QueryInitialPageParam.toString();
  const limit = searchParams.get("limit") || QueryTotalCount.toString();
  const search = searchParams.get("search") || "";
  return useQuery({
    queryKey: [EmployeesQueryKey, page, limit, search],
    queryFn: async () => {
      const response = await api.get<PaginationType<EmployeeType>>(
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
  return useQuery({
    queryKey: [EmployeeQueryKey, id],
    queryFn: async () => {
      const response = await api.get<{ data: EmployeeType }>(
        api_routes.admin.employee.view(id)
      );
      return response.data.data;
    },
    enabled,
  });
};
