import { UseQueryResult, useQuery } from "@tanstack/react-query";
import {
  RegisteredInstituteType,
  RegisteredInstituteStaffType,
  PaginationType,
  StudentApplicationType,
  ActivityLogType,
} from "../../utils/types";
import { useAxios } from "../useAxios";
import { api_routes } from "../../utils/routes/api";
import { usePaginationQueryParam } from "../usePaginationQueryParam";
import { useSearchQueryParam } from "../useSearchQueryParam";
import { useSearchParams } from "react-router-dom";

export const RegisteredInstituteQueryKey = "registered_institute";
export const RegisteredInstitutesQueryKey = "registered_institutes";
export const RegisteredInstitutesStaffQueryKey = "registered_institutes_staff";
export const RegisteredInstitutesScholarshipQueryKey = "registered_institutes_scholarship";
export const RegisteredInstitutesActivityLogsQueryKey = "registered_institutes_activity_log";

export const useRegisteredInstitutesQuery: () => UseQueryResult<
  PaginationType<RegisteredInstituteType>,
  unknown
> = () => {
  const axios = useAxios();
  const { page, limit } = usePaginationQueryParam();
  const { search } = useSearchQueryParam();
  const [searchParams] = useSearchParams();
  return useQuery({
    queryKey: [RegisteredInstitutesQueryKey, page, limit, search, searchParams.get("city_id") || "", searchParams.get("taluq_id") || "", searchParams.get("verification_status") || "", searchParams.get("active_status") || ""],
    queryFn: async () => {
      const response = await axios.get<
        PaginationType<RegisteredInstituteType>
      >(
        api_routes.admin.registered_institute.paginate +
          `?page=${page}&total=${limit}&filter[search]=${encodeURIComponent(search)}&filter[has_city]=${searchParams.get("city_id") || ""}&filter[has_taluq]=${searchParams.get("taluq_id") || ""}&filter[verification_status]=${searchParams.get("verification_status") || ""}&filter[active_status]=${searchParams.get("active_status") || ""}`
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
          `?page=${page}&total=${limit}&filter[search]=${encodeURIComponent(search)}`
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
          `?page=${page}&total=${limit}&filter[search]=${encodeURIComponent(search)}`
      );
      return response.data;
    },
  });
};

export const useRegisteredInstitutesActivityLogsQuery: (id: number) => UseQueryResult<
  PaginationType<ActivityLogType>,
  unknown
> = (id) => {
  const axios = useAxios();
  const { page, limit } = usePaginationQueryParam("_activity_logs");
  return useQuery({
    queryKey: [RegisteredInstitutesActivityLogsQueryKey, id, page, limit],
    queryFn: async () => {
      const response = await axios.get<
        PaginationType<ActivityLogType>
      >(
        api_routes.admin.registered_institute.activity_log.paginate(id) +
          `?page=${page}&total=${limit}`
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
