import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { CourseType, PaginationType } from "../../utils/types";
import { useAxios } from "../useAxios";
import { api_routes } from "../../utils/routes/api";
import { useSearchQueryParam } from "../useSearchQueryParam";
import { usePaginationQueryParam } from "../usePaginationQueryParam";
import { useSearchParams } from "react-router-dom";

export const CourseQueryKey = "course";
export const CoursesQueryKey = "courses";
export const CourseSelectQueryKey = "course_select";
export const CourseCommonSelectQueryKey = "course_common_select";

export const useCoursesQuery: () => UseQueryResult<
  PaginationType<CourseType>,
  unknown
> = () => {
  const axios = useAxios();
  const { page, limit } = usePaginationQueryParam();
  const { search } = useSearchQueryParam();
  const [searchParams] = useSearchParams();
  return useQuery({
    queryKey: [CoursesQueryKey, page, limit, search, searchParams.get("graduation_id") || "", searchParams.get("active_status") || ""],
    queryFn: async () => {
      const response = await axios.get<PaginationType<CourseType>>(
        api_routes.admin.course.paginate +
          `?page=${page}&total=${limit}&filter[search]=${encodeURIComponent(search)}&filter[has_graduation]=${searchParams.get("graduation_id") || ""}&filter[active_status]=${searchParams.get("active_status") || ""}`
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

export const useCourseCommonSelectQuery: (
  enabled: boolean,
  graduation_id?: number
) => UseQueryResult<CourseType[], unknown> = (enabled, graduation_id) => {
  const axios = useAxios();
  return useQuery({
    queryKey: [CourseCommonSelectQueryKey, graduation_id],
    queryFn: async () => {
      const response = await axios.get<{ data: CourseType[] }>(
        api_routes.user.course.all + (graduation_id ? `?filter[has_graduation]=${graduation_id}` : "")
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
