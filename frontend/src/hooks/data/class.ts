import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { api_routes } from "../../utils/api_routes";
import { useSearchParams } from "react-router-dom";
import { QueryInitialPageParam, QueryTotalCount } from "../../utils/constants";
import { ClassType, PaginationType } from "../../utils/types";
import { useAxios } from "../useAxios";

export const ClassQueryKey = "class";
export const ClassesQueryKey = "classes";
export const ClassSelectQueryKey = "class_select";

export const useClassesQuery: () => UseQueryResult<
  PaginationType<ClassType>,
  unknown
> = () => {
  const axios = useAxios();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || QueryInitialPageParam.toString();
  const limit = searchParams.get("limit") || QueryTotalCount.toString();
  const search = searchParams.get("search") || "";
  return useQuery({
    queryKey: [ClassesQueryKey, page, limit, search],
    queryFn: async () => {
      const response = await axios.get<PaginationType<ClassType>>(
        api_routes.admin.class.paginate +
          `?page=${page}&total=${limit}&filter[search]=${search}`
      );
      return response.data;
    },
  });
};

export const useClassSelectQuery: (
  enabled: boolean
) => UseQueryResult<ClassType[], unknown> = (enabled) => {
  const axios = useAxios();
  return useQuery({
    queryKey: [ClassSelectQueryKey],
    queryFn: async () => {
      const response = await axios.get<{ data: ClassType[] }>(
        api_routes.admin.class.all
      );
      return response.data.data;
    },
    enabled,
  });
};

export const useClassQuery: (
  id: number,
  enabled: boolean
) => UseQueryResult<ClassType, unknown> = (id, enabled) => {
  const axios = useAxios();
  return useQuery({
    queryKey: [ClassQueryKey, id],
    queryFn: async () => {
      const response = await axios.get<{ data: ClassType }>(
        api_routes.admin.class.view(id)
      );
      return response.data.data;
    },
    enabled,
  });
};
