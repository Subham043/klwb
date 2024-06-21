import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { api_routes } from "../../utils/api_routes";
import { useSearchParams } from "react-router-dom";
import { QueryInitialPageParam, QueryTotalCount } from "../../utils/constants";
import api from "../../utils/axios";
import { ApplicationFeeType, PaginationType } from "../../utils/types";

export const ApplicationFeeQueryKey = "application_fee";
export const ApplicationFeesQueryKey = "application_fees";
export const ApplicationFeeSelectQueryKey = "application_fee_select";

export const useApplicationFeesQuery: () => UseQueryResult<
  PaginationType<ApplicationFeeType>,
  unknown
> = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || QueryInitialPageParam.toString();
  const limit = searchParams.get("limit") || QueryTotalCount.toString();
  const search = searchParams.get("search") || "";
  return useQuery({
    queryKey: [ApplicationFeesQueryKey, page, limit, search],
    queryFn: async () => {
      const response = await api.get<PaginationType<ApplicationFeeType>>(
        api_routes.admin.application_fee.paginate +
          `?page=${page}&total=${limit}&filter[search]=${search}`
      );
      return response.data;
    },
  });
};

export const useApplicationFeeSelectQuery: (
  enabled: boolean
) => UseQueryResult<ApplicationFeeType[], unknown> = (enabled) => {
  return useQuery({
    queryKey: [ApplicationFeeSelectQueryKey],
    queryFn: async () => {
      const response = await api.get<{ data: ApplicationFeeType[] }>(
        api_routes.admin.application_fee.all
      );
      return response.data.data;
    },
    enabled,
  });
};

export const useApplicationFeeQuery: (
  id: number,
  enabled: boolean
) => UseQueryResult<ApplicationFeeType, unknown> = (id, enabled) => {
  return useQuery({
    queryKey: [ApplicationFeeQueryKey, id],
    queryFn: async () => {
      const response = await api.get<{ data: ApplicationFeeType }>(
        api_routes.admin.application_fee.view(id)
      );
      return response.data.data;
    },
    enabled,
  });
};
