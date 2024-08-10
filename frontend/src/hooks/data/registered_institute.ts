import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { RegisteredInstituteType, PaginationType } from "../../utils/types";
import { useAxios } from "../useAxios";
import { api_routes } from "../../utils/routes/api";
import { usePaginationQueryParam } from "../usePaginationQueryParam";
import { useSearchQueryParam } from "../useSearchQueryParam";

export const RegisteredInstituteQueryKey = "registered_institute";
export const RegisteredInstitutesQueryKey = "registered_institutes";
export const RegisteredInstituteSelectQueryKey = "registered_institute_select";
export const RegisteredInstituteCommonSelectQueryKey =
  "registered_institute_common_select";

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
      const response = await axios.get<PaginationType<RegisteredInstituteType>>(
        api_routes.admin.registered_institute.paginate +
          `?page=${page}&total=${limit}&filter[search]=${search}`
      );
      return response.data;
    },
  });
};

export const useRegisteredInstituteSelectQuery: (
  enabled: boolean,
  taluq_id?: number
) => UseQueryResult<RegisteredInstituteType[], unknown> = (
  enabled,
  taluq_id
) => {
  const axios = useAxios();
  return useQuery({
    queryKey: [RegisteredInstituteSelectQueryKey, taluq_id],
    queryFn: async () => {
      const response = await axios.get<{ data: RegisteredInstituteType[] }>(
        api_routes.admin.registered_institute.all +
          (taluq_id ? `?filter[has_taluq]=${taluq_id}` : "")
      );
      return response.data.data;
    },
    enabled,
  });
};

export const useRegisteredInstituteCommonSelectQuery: (
  enabled: boolean,
  taluq_id?: number
) => UseQueryResult<RegisteredInstituteType[], unknown> = (
  enabled,
  taluq_id
) => {
  const axios = useAxios();
  return useQuery({
    queryKey: [RegisteredInstituteCommonSelectQueryKey, taluq_id],
    queryFn: async () => {
      const response = await axios.get<{ data: RegisteredInstituteType[] }>(
        api_routes.user.registered_institute.all +
          (taluq_id ? `?filter[has_taluq]=${taluq_id}` : "")
      );
      return response.data.data;
    },
    enabled,
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
