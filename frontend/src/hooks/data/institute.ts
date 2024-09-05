import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { InstituteType, PaginationType } from "../../utils/types";
import { useAxios } from "../useAxios";
import { api_routes } from "../../utils/routes/api";
import { usePaginationQueryParam } from "../usePaginationQueryParam";
import { useSearchQueryParam } from "../useSearchQueryParam";

export const InstituteQueryKey = "institute";
export const InstitutesQueryKey = "institutes";
export const InstituteSelectQueryKey = "institute_select";
export const InstituteCommonSelectQueryKey =
  "institute_common_select";

export const useInstitutesQuery: () => UseQueryResult<
  PaginationType<InstituteType>,
  unknown
> = () => {
  const axios = useAxios();
  const { page, limit } = usePaginationQueryParam();
  const { search } = useSearchQueryParam();
  return useQuery({
    queryKey: [InstitutesQueryKey, page, limit, search],
    queryFn: async () => {
      const response = await axios.get<PaginationType<InstituteType>>(
        api_routes.admin.institute.paginate +
          `?page=${page}&total=${limit}&filter[search]=${search}`
      );
      return response.data;
    },
  });
};

export const useInstituteSelectQuery: (
  enabled: boolean,
  taluq_id?: number
) => UseQueryResult<InstituteType[], unknown> = (
  enabled,
  taluq_id
) => {
  const axios = useAxios();
  return useQuery({
    queryKey: [InstituteSelectQueryKey, taluq_id],
    queryFn: async () => {
      const response = await axios.get<{ data: InstituteType[] }>(
        api_routes.admin.institute.all +
          (taluq_id ? `?filter[has_taluq]=${taluq_id}` : "")
      );
      return response.data.data;
    },
    enabled,
  });
};

export const useInstituteCommonSelectQuery: (
  enabled: boolean,
  taluq_id?: number
) => UseQueryResult<InstituteType[], unknown> = (
  enabled,
  taluq_id
) => {
  const axios = useAxios();
  return useQuery({
    queryKey: [InstituteCommonSelectQueryKey, taluq_id],
    queryFn: async () => {
      const response = await axios.get<{ data: InstituteType[] }>(
        api_routes.user.institute.all +
          (taluq_id ? `?filter[has_taluq]=${taluq_id}` : "")
      );
      return response.data.data;
    },
    enabled,
  });
};

export const useInstituteQuery: (
  id: number,
  enabled: boolean
) => UseQueryResult<InstituteType, unknown> = (id, enabled) => {
  const axios = useAxios();
  return useQuery({
    queryKey: [InstituteQueryKey, id],
    queryFn: async () => {
      const response = await axios.get<{ data: InstituteType }>(
        api_routes.admin.institute.view(id)
      );
      return response.data.data;
    },
    enabled,
  });
};
