import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { api_routes } from "../../utils/api_routes";
import { useSearchParams } from "react-router-dom";
import { QueryInitialPageParam, QueryTotalCount } from "../../utils/constants";
import { RegisteredInstituteType, PaginationType } from "../../utils/types";
import { useAxios } from "../useAxios";

export const RegisteredInstituteQueryKey = "registered_institute";
export const RegisteredInstitutesQueryKey = "registered_institutes";
export const RegisteredInstituteSelectQueryKey = "registered_institute_select";

export const useRegisteredInstitutesQuery: () => UseQueryResult<
  PaginationType<RegisteredInstituteType>,
  unknown
> = () => {
  const axios = useAxios();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || QueryInitialPageParam.toString();
  const limit = searchParams.get("limit") || QueryTotalCount.toString();
  const search = searchParams.get("search") || "";
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
  enabled: boolean
) => UseQueryResult<RegisteredInstituteType[], unknown> = (enabled) => {
  const axios = useAxios();
  return useQuery({
    queryKey: [RegisteredInstituteSelectQueryKey],
    queryFn: async () => {
      const response = await axios.get<{ data: RegisteredInstituteType[] }>(
        api_routes.admin.registered_institute.all
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
