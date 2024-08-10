import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { InstituteNonRegisteredType, PaginationType } from "../../utils/types";
import { useAxios } from "../useAxios";
import { api_routes } from "../../utils/routes/api";
import { usePaginationQueryParam } from "../usePaginationQueryParam";
import { useSearchQueryParam } from "../useSearchQueryParam";

export const InstituteNonRegisteredQueryKey = "institute_non_registered";
export const InstitutesNonRegisteredQueryKey = "institutes_non_registered";

export const useInstitutesNonRegisteredQuery: () => UseQueryResult<
  PaginationType<InstituteNonRegisteredType>,
  unknown
> = () => {
  const axios = useAxios();
  const { page, limit } = usePaginationQueryParam();
  const { search } = useSearchQueryParam();
  return useQuery({
    queryKey: [InstitutesNonRegisteredQueryKey, page, limit, search],
    queryFn: async () => {
      const response = await axios.get<
        PaginationType<InstituteNonRegisteredType>
      >(
        api_routes.admin.institute.non_registered.paginate +
          `?page=${page}&total=${limit}&filter[search]=${search}`
      );
      return response.data;
    },
  });
};

export const useInstituteNonRegisteredQuery: (
  id: number,
  enabled: boolean
) => UseQueryResult<InstituteNonRegisteredType, unknown> = (id, enabled) => {
  const axios = useAxios();
  return useQuery({
    queryKey: [InstituteNonRegisteredQueryKey, id],
    queryFn: async () => {
      const response = await axios.get<{ data: InstituteNonRegisteredType }>(
        api_routes.admin.institute.non_registered.view(id)
      );
      return response.data.data;
    },
    enabled,
  });
};
