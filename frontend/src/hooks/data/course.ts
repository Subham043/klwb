import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { api_routes } from "../../utils/api_routes";
import { useSearchParams } from "react-router-dom";
import { QueryInitialPageParam, QueryTotalCount } from "../../utils/constants";
import { CourseType, PaginationType } from "../../utils/types";
import { useAxios } from "../useAxios";

export const CourseQueryKey = "course";
export const CoursesQueryKey = "courses";
export const CourseSelectQueryKey = "course_select";

export const useCoursesQuery: () => UseQueryResult<
  PaginationType<CourseType>,
  unknown
> = () => {
  const axios = useAxios();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || QueryInitialPageParam.toString();
  const limit = searchParams.get("limit") || QueryTotalCount.toString();
  const search = searchParams.get("search") || "";
  return useQuery({
    queryKey: [CoursesQueryKey, page, limit, search],
    queryFn: async () => {
      const response = await axios.get<PaginationType<CourseType>>(
        api_routes.admin.course.paginate +
          `?page=${page}&total=${limit}&filter[search]=${search}`
      );
      return response.data;
    },
  });
};

export const useCourseSelectQuery: (
  enabled: boolean
) => UseQueryResult<CourseType[], unknown> = (enabled) => {
  const axios = useAxios();
  return useQuery({
    queryKey: [CourseSelectQueryKey],
    queryFn: async () => {
      const response = await axios.get<{ data: CourseType[] }>(
        api_routes.admin.course.all
      );
      return response.data.data;
    },
    enabled,
  });
};

export const useCourseQuery: (
  id: number,
  enabled: boolean
) => UseQueryResult<CourseType, unknown> = (id, enabled) => {
  const axios = useAxios();
  return useQuery({
    queryKey: [CourseQueryKey, id],
    queryFn: async () => {
      const response = await axios.get<{ data: CourseType }>(
        api_routes.admin.course.view(id)
      );
      return response.data.data;
    },
    enabled,
  });
};
