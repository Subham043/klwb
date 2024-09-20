import { UseQueryResult, useQuery } from "@tanstack/react-query";
import {
  RegisteredIndustryType,
  RegisteredIndustryStaffType,
  PaginationType,
  StudentApplicationType,
} from "../../utils/types";
import { useAxios } from "../useAxios";
import { api_routes } from "../../utils/routes/api";
import { usePaginationQueryParam } from "../usePaginationQueryParam";
import { useSearchQueryParam } from "../useSearchQueryParam";

export const RegisteredIndustryQueryKey = "registered_industry";
export const RegisteredIndustriesQueryKey = "registered_industries";
export const RegisteredIndustriesStaffQueryKey = "registered_industries_staff";
export const RegisteredIndustriesScholarshipQueryKey = "registered_industries_scholarship";

export const useRegisteredIndustriesQuery: () => UseQueryResult<
  PaginationType<RegisteredIndustryType>,
  unknown
> = () => {
  const axios = useAxios();
  const { page, limit } = usePaginationQueryParam();
  const { search } = useSearchQueryParam();
  return useQuery({
    queryKey: [RegisteredIndustriesQueryKey, page, limit, search],
    queryFn: async () => {
      const response = await axios.get<
        PaginationType<RegisteredIndustryType>
      >(
        api_routes.admin.registered_industry.paginate +
          `?page=${page}&total=${limit}&filter[search]=${search}`
      );
      return response.data;
    },
  });
};

export const useRegisteredIndustriesStaffQuery: (id: number) => UseQueryResult<
  PaginationType<RegisteredIndustryStaffType>,
  unknown
> = (id) => {
  const axios = useAxios();
  const { page, limit } = usePaginationQueryParam("_staff");
  const { search } = useSearchQueryParam("_staff");
  return useQuery({
    queryKey: [RegisteredIndustriesStaffQueryKey, id, page, limit, search],
    queryFn: async () => {
      const response = await axios.get<
        PaginationType<RegisteredIndustryStaffType>
      >(
        api_routes.admin.registered_industry.staff.paginate(id) +
          `?page=${page}&total=${limit}&filter[search]=${search}`
      );
      return response.data;
    },
  });
};

export const useRegisteredIndustriesScholarshipQuery: (id: number) => UseQueryResult<
  PaginationType<StudentApplicationType>,
  unknown
> = (id) => {
  const axios = useAxios();
  const { page, limit } = usePaginationQueryParam("_scholarship");
  const { search } = useSearchQueryParam("_scholarship");
  return useQuery({
    queryKey: [RegisteredIndustriesScholarshipQueryKey, id, page, limit, search],
    queryFn: async () => {
      const response = await axios.get<
        PaginationType<StudentApplicationType>
      >(
        api_routes.admin.registered_industry.scholarship.paginate(id) +
          `?page=${page}&total=${limit}&filter[search]=${search}`
      );
      return response.data;
    },
  });
};

export const useRegisteredIndustryQuery: (
  id: number,
  enabled: boolean
) => UseQueryResult<RegisteredIndustryType, unknown> = (id, enabled) => {
  const axios = useAxios();
  return useQuery({
    queryKey: [RegisteredIndustryQueryKey, id],
    queryFn: async () => {
      const response = await axios.get<{ data: RegisteredIndustryType }>(
        api_routes.admin.registered_industry.view(id)
      );
      return response.data.data;
    },
    enabled,
  });
};
