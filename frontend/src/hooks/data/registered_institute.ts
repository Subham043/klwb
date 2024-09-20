import { UseQueryResult, useQuery } from "@tanstack/react-query";
import {
  RegisteredInstituteType,
  RegisteredInstituteStaffType,
  PaginationType,
  StudentApplicationType,
} from "../../utils/types";
import { useAxios } from "../useAxios";
import { api_routes } from "../../utils/routes/api";
import { usePaginationQueryParam } from "../usePaginationQueryParam";
import { useSearchQueryParam } from "../useSearchQueryParam";

export const RegisteredInstituteQueryKey = "registered_institute";
export const RegisteredInstitutesQueryKey = "registered_institutes";
export const RegisteredInstitutesStaffQueryKey = "registered_institutes_staff";
export const RegisteredInstitutesScholarshipQueryKey = "registered_institutes_scholarship";

export const useRegisteredInstitutesQuery: () => UseQueryResult<
  PaginationType<RegisteredInstituteType>,
  unknown
> = () => {
  const axios = useAxios();
  const { page, limit } = usePaginationQueryParam();
  const { search } = useSearchQueryParam();
  return useQuery({
    queryKey: [RegisteredInstitutesQueryKey, page, limit, search],
    queryFn: async () => {
      const response = await axios.get<
        PaginationType<RegisteredInstituteType>
      >(
        api_routes.admin.registered_institute.paginate +
          `?page=${page}&total=${limit}&filter[search]=${search}`
      );
      return response.data;
    },
  });
};

export const useRegisteredInstitutesStaffQuery: (id: number) => UseQueryResult<
  PaginationType<RegisteredInstituteStaffType>,
  unknown
> = (id) => {
  const axios = useAxios();
  const { page, limit } = usePaginationQueryParam("_staff");
  const { search } = useSearchQueryParam("_staff");
  return useQuery({
    queryKey: [RegisteredInstitutesStaffQueryKey, id, page, limit, search],
    queryFn: async () => {
      const response = await axios.get<
        PaginationType<RegisteredInstituteStaffType>
      >(
        api_routes.admin.registered_institute.staff.paginate(id) +
          `?page=${page}&total=${limit}&filter[search]=${search}`
      );
      return response.data;
    },
  });
};

export const useRegisteredInstitutesScholarshipQuery: (id: number) => UseQueryResult<
  PaginationType<StudentApplicationType>,
  unknown
> = (id) => {
  const axios = useAxios();
  const { page, limit } = usePaginationQueryParam("_scholarship");
  const { search } = useSearchQueryParam("_scholarship");
  return useQuery({
    queryKey: [RegisteredInstitutesScholarshipQueryKey, id, page, limit, search],
    queryFn: async () => {
      const response = await axios.get<
        PaginationType<StudentApplicationType>
      >(
        api_routes.admin.registered_institute.scholarship.paginate(id) +
          `?page=${page}&total=${limit}&filter[search]=${search}`
      );
      return response.data;
    },
  });
};

export const useRegisteredInstituteQuery: (
  id: number,
  enabled: boolean
) => UseQueryResult<RegisteredInstituteType, unknown> = (id, enabled) => {
  const axios = useAxios();
  return useQuery({
    queryKey: [RegisteredInstituteQueryKey, id],
    queryFn: async () => {
      const response = await axios.get<{ data: RegisteredInstituteType }>(
        api_routes.admin.registered_institute.view(id)
      );
      return response.data.data;
    },
    enabled,
  });
};
