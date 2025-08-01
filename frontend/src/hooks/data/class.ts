import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { ClassType, PaginationType } from "../../utils/types";
import { useAxios } from "../useAxios";
import { api_routes } from "../../utils/routes/api";
import { usePaginationQueryParam } from "../usePaginationQueryParam";
import { useSearchQueryParam } from "../useSearchQueryParam";
import { useSearchParams } from "react-router-dom";

export const ClassQueryKey = "class";
export const ClassesQueryKey = "classes";
export const ClassSelectQueryKey = "class_select";
export const ClassCommonSelectQueryKey = "class_common_select";

export const useClassesQuery: () => UseQueryResult<
  PaginationType<ClassType>,
  unknown
> = () => {
  const axios = useAxios();
  const { page, limit } = usePaginationQueryParam();
  const { search } = useSearchQueryParam();
  const [searchParams] = useSearchParams();
  return useQuery({
    queryKey: [ClassesQueryKey, page, limit, search, searchParams.get("course_id") || "", searchParams.get("graduation_id") || "", searchParams.get("active_status") || ""],
    queryFn: async () => {
      const response = await axios.get<PaginationType<ClassType>>(
        api_routes.admin.class.paginate +
          `?page=${page}&total=${limit}&filter[search]=${encodeURIComponent(search)}&filter[has_graduation]=${searchParams.get("graduation_id") || ""}&filter[has_course]=${searchParams.get("course_id") || ""}&filter[active_status]=${searchParams.get("active_status") || ""}`
      );
      return response.data;
    },
  });
};

export const useClassSelectQuery: (
  enabled: boolean,
  course_id?: number
) => UseQueryResult<ClassType[], unknown> = (enabled, course_id) => {
  const axios = useAxios();
  return useQuery({
    queryKey: [ClassSelectQueryKey, course_id],
    queryFn: async () => {
      const response = await axios.get<{ data: ClassType[] }>(
        api_routes.admin.class.all +
          (course_id ? `?filter[has_course]=${course_id}` : "")
      );
      return response.data.data;
    },
    enabled,
  });
};

export const useClassCommonSelectQuery: (
  enabled: boolean,
  course_id?: number
) => UseQueryResult<ClassType[], unknown> = (enabled, course_id) => {
  const axios = useAxios();
  return useQuery({
    queryKey: [ClassCommonSelectQueryKey, course_id],
    queryFn: async () => {
      const response = await axios.get<{ data: ClassType[] }>(
        api_routes.user.class.all + (course_id ? `?filter[has_course]=${course_id}` : "")
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
