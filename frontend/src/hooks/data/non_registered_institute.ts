import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { NonRegisteredInstituteType, PaginationType } from "../../utils/types";
import { useAxios } from "../useAxios";
import { api_routes } from "../../utils/routes/api";
import { usePaginationQueryParam } from "../usePaginationQueryParam";
import { useSearchQueryParam } from "../useSearchQueryParam";

export const NonRegisteredInstituteQueryKey = "non_registered_institute";
export const NonRegisteredInstitutesQueryKey = "non_registered_institutes";

export const useNonRegisteredInstitutesQuery: () => UseQueryResult<
  PaginationType<NonRegisteredInstituteType>,
  unknown
> = () => {
  const axios = useAxios();
  const { page, limit } = usePaginationQueryParam();
  const { search } = useSearchQueryParam();
  return useQuery({
    queryKey: [NonRegisteredInstitutesQueryKey, page, limit, search],
    queryFn: async () => {
      const response = await axios.get<
        PaginationType<NonRegisteredInstituteType>
      >(
        api_routes.admin.non_registered_institute.paginate +
          `?page=${page}&total=${limit}&filter[search]=${search}`
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
