import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { ContributionComparisonReportType, ContributionReportType, PaginationType, ScholarshipReportType } from "../../utils/types";
import { useAxios } from "../useAxios";
import { api_routes } from "../../utils/routes/api";
import { usePaginationQueryParam } from "../usePaginationQueryParam";
import { useSearchParams } from "react-router-dom";

export const ScholarshipReportListQueryKey = "admin_scholarship_report_list";
export const ContributionsReportQueryKey = "contributions_report";
export const ContributionsComparisonReportQueryKey = "contributions_comparison_report";

export const useScholarshipReportListQuery: () => UseQueryResult<
  PaginationType<ScholarshipReportType>,
  unknown
> = () => {
  const axios = useAxios();
  const { page, limit } = usePaginationQueryParam();
  const [searchParams] = useSearchParams();
  return useQuery({
    queryKey: [ScholarshipReportListQueryKey, page, limit, searchParams.get("year") || "", searchParams.get("city_id") || "", searchParams.get("taluq_id") || "", searchParams.get("graduation_id") || "", searchParams.get("course_id") || "", searchParams.get("class_id") || ""],
    queryFn: async () => {
      const response = await axios.get<PaginationType<ScholarshipReportType>>(
        api_routes.admin.report.scholarship.list +
          `?page=${page}&total=${limit}&filter[has_city]=${searchParams.get("city_id") || ""}&filter[has_taluq]=${searchParams.get("taluq_id") || ""}&filter[has_graduation]=${searchParams.get("graduation_id") || ""}&filter[has_course]=${searchParams.get("course_id") || ""}&filter[has_class]=${searchParams.get("class_id") || ""}&filter[year]=${searchParams.get("year") || ""}`
      );
      return response.data;
    },
  });
};

export const useContributionReportQuery: () => UseQueryResult<
  PaginationType<ContributionReportType>,
  unknown
> = () => {
  const axios = useAxios();
  const { page, limit } = usePaginationQueryParam();
  const [searchParams] = useSearchParams();
  return useQuery({
    queryKey: [ContributionsReportQueryKey, page, limit, searchParams.get("city_id") || "", searchParams.get("taluq_id") || "", searchParams.get("year") || "", searchParams.get("from_date") || "", searchParams.get("to_date") || ""],
    queryFn: async () => {
      const response = await axios.get<PaginationType<ContributionReportType>>(
        api_routes.admin.report.contribution.list +
          `?page=${page}&total=${limit}&filter[has_city]=${searchParams.get("city_id") || ""}&filter[has_taluq]=${searchParams.get("taluq_id") || ""}&filter[year]=${searchParams.get("year") || ""}&filter[from_date]=${searchParams.get("from_date") || ""}&filter[to_date]=${searchParams.get("to_date") || ""}`
      );
      return response.data;
    },
  });
};

export const useContributionComparisonReportQuery: () => UseQueryResult<
  PaginationType<ContributionComparisonReportType>,
  unknown
> = () => {
  const axios = useAxios();
  const { page, limit } = usePaginationQueryParam();
  const [searchParams] = useSearchParams();
  return useQuery({
    queryKey: [ContributionsComparisonReportQueryKey, page, limit, searchParams.get("year") || ""],
    queryFn: async () => {
      const response = await axios.get<PaginationType<ContributionComparisonReportType>>(
        api_routes.admin.report.contribution_comparison.list +
          `?page=${page}&total=${limit}&filter[year]=${searchParams.get("year") || ""}`
      );
      return response.data;
    },
  });
};