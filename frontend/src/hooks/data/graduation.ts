import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { api_routes } from "../../utils/api_routes";
import { useSearchParams } from "react-router-dom";
import { QueryInitialPageParam, QueryTotalCount } from "../../utils/constants";
import api from "../../utils/axios";
import { GraduationType, PaginationType } from "../../utils/types";

export const GradutaionQueryKey = "graduation";
export const GradutaionsQueryKey = "graduations";

export const useGradutaionsQuery: () => UseQueryResult<
  PaginationType<GraduationType>,
  unknown
> = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || QueryInitialPageParam.toString();
  const limit = searchParams.get("limit") || QueryTotalCount.toString();
  const search = searchParams.get("search") || "";
  return useQuery({
    queryKey: [GradutaionsQueryKey, page, limit, search],
    queryFn: async () => {
      const response = await api.get<PaginationType<GraduationType>>(
        api_routes.admin.graduation.paginate +
          `?page=${page}&total=${limit}&filter[search]=${search}`
      );
      return response.data;
    },
  });
};

export const useGradutaionQuery: (
  id: number,
  enabled: boolean
) => UseQueryResult<GraduationType, unknown> = (id, enabled) => {
  return useQuery({
    queryKey: [GradutaionQueryKey, id],
    queryFn: async () => {
      const response = await api.get<{ data: GraduationType }>(
        api_routes.admin.graduation.view(id)
      );
      return response.data.data;
    },
    enabled,
  });
};
