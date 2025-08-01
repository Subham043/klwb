import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { ActivityLogType, ContributionType, PaginationType } from "../../utils/types";
import { useAxios } from "../useAxios";
import { api_routes } from "../../utils/routes/api";
import { useSearchQueryParam } from "../useSearchQueryParam";
import { usePaginationQueryParam } from "../usePaginationQueryParam";
import { useSearchParams } from "react-router-dom";

export const ContributionQueryKey = "contribution";
export const ContributionsQueryKey = "contributions";
export const ContributionsActivityLogsQueryKey = "contributions_activity_log";

export const useContributionsQuery: () => UseQueryResult<
  PaginationType<ContributionType>,
  unknown
> = () => {
  const axios = useAxios();
  const { page, limit } = usePaginationQueryParam();
  const { search } = useSearchQueryParam();
  const [searchParams] = useSearchParams();
  return useQuery({
    queryKey: [ContributionsQueryKey, page, limit, search, searchParams.get("city_id") || "", searchParams.get("taluq_id") || "", searchParams.get("year") || "", searchParams.get("from_date") || "", searchParams.get("to_date") || ""],
    queryFn: async () => {
      const response = await axios.get<PaginationType<ContributionType>>(
        api_routes.admin.contribution.list +
          `?page=${page}&total=${limit}&filter[search]=${encodeURIComponent(search)}&filter[has_city]=${searchParams.get("city_id") || ""}&filter[has_taluq]=${searchParams.get("taluq_id") || ""}&filter[year]=${searchParams.get("year") || ""}&filter[from_date]=${searchParams.get("from_date") || ""}&filter[to_date]=${searchParams.get("to_date") || ""}`
      );
      return response.data;
    },
  });
};

export const useContributionQuery: (
  id: number,
  enabled: boolean
) => UseQueryResult<ContributionType, unknown> = (id, enabled) => {
  const axios = useAxios();
  return useQuery({
    queryKey: [ContributionQueryKey, id],
    queryFn: async () => {
      const response = await axios.get<{ data: ContributionType }>(
        api_routes.admin.contribution.view(id)
      );
      return response.data.data;
    },
    enabled,
  });
};

export const useContributionsActivityLogsQuery: (props:{id: number, enabled?: boolean}) => UseQueryResult<
  PaginationType<ActivityLogType>,
  unknown
> = ({id, enabled=false}) => {
  const axios = useAxios();
  const { page, limit } = usePaginationQueryParam("_activity_logs");
  return useQuery({
    queryKey: [ContributionsActivityLogsQueryKey, id, page, limit],
    queryFn: async () => {
      const response = await axios.get<
        PaginationType<ActivityLogType>
      >(
        api_routes.admin.contribution.activity_log(id) +
          `?page=${page}&total=${limit}`
      );
      return response.data;
    },
    enabled,
  });
};