import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { PaginationType, ScholarshipReportType } from "../../utils/types";
import { useAxios } from "../useAxios";
import { api_routes } from "../../utils/routes/api";
import { usePaginationQueryParam } from "../usePaginationQueryParam";
import { useSearchParams } from "react-router-dom";

export const GovtScholarshipReportListQueryKey = "govt_scholarship_report_list";

export const useGovtScholarshipReportListQuery: () => UseQueryResult<
  PaginationType<ScholarshipReportType>,
  unknown
> = () => {
  const axios = useAxios();
  const { page, limit } = usePaginationQueryParam();
  const [searchParams] = useSearchParams();
  return useQuery({
    queryKey: [GovtScholarshipReportListQueryKey, page, limit, searchParams.get("year") || "", searchParams.get("city_id") || "", searchParams.get("taluq_id") || "", searchParams.get("graduation_id") || "", searchParams.get("course_id") || "", searchParams.get("class_id") || ""],
    queryFn: async () => {
      const response = await axios.get<PaginationType<ScholarshipReportType>>(
        api_routes.govt.report.scholarship.list +
          `?page=${page}&total=${limit}&filter[has_city]=${searchParams.get("city_id") || ""}&filter[has_taluq]=${searchParams.get("taluq_id") || ""}&filter[has_graduation]=${searchParams.get("graduation_id") || ""}&filter[has_course]=${searchParams.get("course_id") || ""}&filter[has_class]=${searchParams.get("class_id") || ""}&filter[application_year]=${searchParams.get("year") || ""}`
      );
      return response.data;
    },
  });
};