import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { GraduationType, PaginationType } from "../../utils/types";
import { useAxios } from "../useAxios";
import { api_routes } from "../../utils/routes/api";
import { useSearchQueryParam } from "../useSearchQueryParam";
import { usePaginationQueryParam } from "../usePaginationQueryParam";

export const GraduationQueryKey = "graduation";
export const GraduationsQueryKey = "graduations";
export const GraduationSelectQueryKey = "graduation_select";

export const useGraduationsQuery: () => UseQueryResult<
  PaginationType<GraduationType>,
  unknown
> = () => {
  const axios = useAxios();
  const { page, limit } = usePaginationQueryParam();
  const { search } = useSearchQueryParam();
  return useQuery({
    queryKey: [GraduationsQueryKey, page, limit, search],
    queryFn: async () => {
      const response = await axios.get<PaginationType<GraduationType>>(
        api_routes.admin.graduation.paginate +
          `?page=${page}&total=${limit}&filter[search]=${search}`
      );
      return response.data;
    },
  });
};

export const useGraduationSelectQuery: (
  enabled: boolean
) => UseQueryResult<GraduationType[], unknown> = (enabled) => {
  const axios = useAxios();
  return useQuery({
    queryKey: [GraduationSelectQueryKey],
    queryFn: async () => {
      const response = await axios.get<{ data: GraduationType[] }>(
        api_routes.admin.graduation.all
      );
      return response.data.data;
    },
    enabled,
  });
};

export const useGraduationQuery: (
  id: number,
  enabled: boolean
) => UseQueryResult<GraduationType, unknown> = (id, enabled) => {
  const axios = useAxios();
  return useQuery({
    queryKey: [GraduationQueryKey, id],
    queryFn: async () => {
      const response = await axios.get<{ data: GraduationType }>(
        api_routes.admin.graduation.view(id)
      );
      return response.data.data;
    },
    enabled,
  });
};
