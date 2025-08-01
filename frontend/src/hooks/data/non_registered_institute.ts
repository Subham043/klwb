import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { NonRegisteredInstituteType, PaginationType } from "../../utils/types";
import { useAxios } from "../useAxios";
import { api_routes } from "../../utils/routes/api";
import { usePaginationQueryParam } from "../usePaginationQueryParam";
import { useSearchQueryParam } from "../useSearchQueryParam";
import { useSearchParams } from "react-router-dom";

export const NonRegisteredInstituteQueryKey = "non_registered_institute";
export const NonRegisteredInstitutesQueryKey = "non_registered_institutes";

export const useNonRegisteredInstitutesQuery: () => UseQueryResult<
  PaginationType<NonRegisteredInstituteType>,
  unknown
> = () => {
  const axios = useAxios();
  const { page, limit } = usePaginationQueryParam();
  const { search } = useSearchQueryParam();
  const [searchParams] = useSearchParams();
  return useQuery({
    queryKey: [NonRegisteredInstitutesQueryKey, page, limit, search, searchParams.get("city_id") || "", searchParams.get("taluq_id") || "", searchParams.get("active_status") || ""],
    queryFn: async () => {
      const response = await axios.get<
        PaginationType<NonRegisteredInstituteType>
      >(
        api_routes.admin.non_registered_institute.paginate +
          `?page=${page}&total=${limit}&filter[search]=${encodeURIComponent(search)}&filter[has_city]=${searchParams.get("city_id") || ""}&filter[has_taluq]=${searchParams.get("taluq_id") || ""}&filter[active_status]=${searchParams.get("active_status") || ""}`
      );
      return response.data;
    },
  });
};

export const useNonRegisteredInstituteQuery: (
  id: number,
  enabled: boolean
) => UseQueryResult<NonRegisteredInstituteType, unknown> = (id, enabled) => {
  const axios = useAxios();
  return useQuery({
    queryKey: [NonRegisteredInstituteQueryKey, id],
    queryFn: async () => {
      const response = await axios.get<{ data: NonRegisteredInstituteType }>(
        api_routes.admin.non_registered_institute.view(id)
      );
      return response.data.data;
    },
    enabled,
  });
};
