import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { RequestInstituteType, PaginationType } from "../../utils/types";
import { useAxios } from "../useAxios";
import { api_routes } from "../../utils/routes/api";
import { usePaginationQueryParam } from "../usePaginationQueryParam";
import { useSearchQueryParam } from "../useSearchQueryParam";
import { useSearchParams } from "react-router-dom";

export const RequestInstituteQueryKey = "request_institute";
export const RequestInstitutesQueryKey = "request_institutes";
export const RequestInstituteSelectQueryKey = "request_institute_select";

export const useRequestInstitutesQuery: () => UseQueryResult<
  PaginationType<RequestInstituteType>,
  unknown
> = () => {
  const axios = useAxios();
  const { page, limit } = usePaginationQueryParam();
  const { search } = useSearchQueryParam();
  const [searchParams] = useSearchParams();
  return useQuery({
    queryKey: [RequestInstitutesQueryKey, page, limit, search, searchParams.get("city_id") || "", searchParams.get("taluq_id") || "", searchParams.get("status") || ""],
    queryFn: async () => {
      const response = await axios.get<PaginationType<RequestInstituteType>>(
        api_routes.admin.request_institute.paginate +
          `?page=${page}&total=${limit}&filter[search]=${encodeURIComponent(search)}&filter[has_city]=${searchParams.get("city_id") || ""}&filter[has_taluq]=${searchParams.get("taluq_id") || ""}&filter[status]=${searchParams.get("status") || ""}`
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
