import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { ApplicationFeeType, PaginationType } from "../../utils/types";
import { useAxios } from "../useAxios";
import { api_routes } from "../../utils/routes/api";
import { usePaginationQueryParam } from "../usePaginationQueryParam";
import { useSearchQueryParam } from "../useSearchQueryParam";

export const ApplicationFeeQueryKey = "application_fee";
export const ApplicationFeesQueryKey = "application_fees";
export const ApplicationFeeSelectQueryKey = "application_fee_select";

export const useApplicationFeesQuery: () => UseQueryResult<
  PaginationType<ApplicationFeeType>,
  unknown
> = () => {
  const axios = useAxios();
  const { page, limit } = usePaginationQueryParam();
  const { search } = useSearchQueryParam();
  return useQuery({
    queryKey: [ApplicationFeesQueryKey, page, limit, search],
    queryFn: async () => {
      const response = await axios.get<PaginationType<ApplicationFeeType>>(
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
  const axios = useAxios();
  return useQuery({
    queryKey: [ApplicationFeeSelectQueryKey],
    queryFn: async () => {
      const response = await axios.get<{ data: ApplicationFeeType[] }>(
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
  const axios = useAxios();
  return useQuery({
    queryKey: [ApplicationFeeQueryKey, id],
    queryFn: async () => {
      const response = await axios.get<{ data: ApplicationFeeType }>(
        api_routes.admin.application_fee.view(id)
      );
      return response.data.data;
    },
    enabled,
  });
};
