import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { api_routes } from "../../utils/api_routes";
import { useSearchParams } from "react-router-dom";
import { QueryInitialPageParam, QueryTotalCount } from "../../utils/constants";
import api from "../../utils/axios";
import { CourseType, PaginationType } from "../../utils/types";

export const CourseQueryKey = "course";
export const CoursesQueryKey = "courses";

export const useCoursesQuery: () => UseQueryResult<
  PaginationType<CourseType>,
  unknown
> = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || QueryInitialPageParam.toString();
  const limit = searchParams.get("limit") || QueryTotalCount.toString();
  const search = searchParams.get("search") || "";
  return useQuery({
    queryKey: [CoursesQueryKey, page, limit, search],
    queryFn: async () => {
      const response = await api.get<PaginationType<CourseType>>(
        api_routes.admin.course.paginate +
          `?page=${page}&total=${limit}&filter[search]=${search}`
      );
      return response.data;
    },
  });
};

export const useCourseQuery: (
  id: number,
  enabled: boolean
) => UseQueryResult<CourseType, unknown> = (id, enabled) => {
  return useQuery({
    queryKey: [CourseQueryKey, id],
    queryFn: async () => {
      const response = await api.get<{ data: CourseType }>(
        api_routes.admin.course.view(id)
      );
      return response.data.data;
    },
    enabled,
  });
};
