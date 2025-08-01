import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { EmployeeType, PaginationType } from "../../utils/types";
import { useAxios } from "../useAxios";
import { api_routes } from "../../utils/routes/api";
import { useSearchQueryParam } from "../useSearchQueryParam";
import { usePaginationQueryParam } from "../usePaginationQueryParam";

export const IndustryEmployeeQueryKey = "industry_employee";
export const IndustryEmployeesQueryKey = "industry_employees";

export const useIndustryEmployeesQuery: () => UseQueryResult<
  PaginationType<EmployeeType>,
  unknown
> = () => {
  const axios = useAxios();
  const { page, limit } = usePaginationQueryParam();
  const { search } = useSearchQueryParam();
  return useQuery({
    queryKey: [IndustryEmployeesQueryKey, page, limit, search],
    queryFn: async () => {
      const response = await axios.get<PaginationType<EmployeeType>>(
        api_routes.industry.employee.paginate +
          `?page=${page}&total=${limit}&filter[search]=${encodeURIComponent(search)}`
      );
      return response.data;
    },
  });
};

export const useIndustryEmployeeQuery: (
  id: number,
  enabled: boolean
) => UseQueryResult<EmployeeType, unknown> = (id, enabled) => {
  const axios = useAxios();
  return useQuery({
    queryKey: [IndustryEmployeeQueryKey, id],
    queryFn: async () => {
      const response = await axios.get<{ data: EmployeeType }>(
        api_routes.industry.employee.view(id)
      );
      return response.data.data;
    },
    enabled,
  });
};
