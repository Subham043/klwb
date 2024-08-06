import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { api_routes } from "../../utils/api_routes";
import { useSearchParams } from "react-router-dom";
import { QueryInitialPageParam, QueryTotalCount } from "../../utils/constants";
import { RequestInstituteType, PaginationType } from "../../utils/types";
import { useAxios } from "../useAxios";

export const RequestInstituteQueryKey = "request_institute";
export const RequestInstitutesQueryKey = "request_institutes";
export const RequestInstituteSelectQueryKey = "request_institute_select";

export const useRequestInstitutesQuery: () => UseQueryResult<
  PaginationType<RequestInstituteType>,
  unknown
> = () => {
  const axios = useAxios();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || QueryInitialPageParam.toString();
  const limit = searchParams.get("limit") || QueryTotalCount.toString();
  const search = searchParams.get("search") || "";
  return useQuery({
    queryKey: [RequestInstitutesQueryKey, page, limit, search],
    queryFn: async () => {
      const response = await axios.get<PaginationType<RequestInstituteType>>(
        api_routes.admin.request_institute.paginate +
          `?page=${page}&total=${limit}&filter[search]=${search}`
      );
      return response.data;
    },
  });
};

export const useRequestInstituteSelectQuery: (
  enabled: boolean
) => UseQueryResult<RequestInstituteType[], unknown> = (enabled) => {
  const axios = useAxios();
  return useQuery({
    queryKey: [RequestInstituteSelectQueryKey],
    queryFn: async () => {
      const response = await axios.get<{ data: RequestInstituteType[] }>(
        api_routes.admin.request_institute.all
      );
      return response.data.data;
    },
    enabled,
  });
};

export const useRequestInstituteQuery: (
  id: number,
  enabled: boolean
) => UseQueryResult<RequestInstituteType, unknown> = (id, enabled) => {
  const axios = useAxios();
  return useQuery({
    queryKey: [RequestInstituteQueryKey, id],
    queryFn: async () => {
      const response = await axios.get<{ data: RequestInstituteType }>(
        api_routes.admin.request_institute.view(id)
      );
      return response.data.data;
    },
    enabled,
  });
};
