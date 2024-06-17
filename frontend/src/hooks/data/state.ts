import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { api_routes } from "../../utils/api_routes";
import { useSearchParams } from "react-router-dom";
import { QueryInitialPageParam, QueryTotalCount } from "../../utils/constants";
import api from "../../utils/axios";
import { StateType, PaginationType } from "../../utils/types";

export const StateQueryKey = "state";
export const StatesQueryKey = "states";
export const StateSelectQueryKey = "state_select";

export const useStatesQuery: () => UseQueryResult<
  PaginationType<StateType>,
  unknown
> = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || QueryInitialPageParam.toString();
  const limit = searchParams.get("limit") || QueryTotalCount.toString();
  const search = searchParams.get("search") || "";
  return useQuery({
    queryKey: [StatesQueryKey, page, limit, search],
    queryFn: async () => {
      const response = await api.get<PaginationType<StateType>>(
        api_routes.admin.state.paginate +
          `?page=${page}&total=${limit}&filter[search]=${search}`
      );
      return response.data;
    },
  });
};

export const useStateSelectQuery: (
  enabled: boolean
) => UseQueryResult<StateType[], unknown> = (enabled) => {
  return useQuery({
    queryKey: [StateSelectQueryKey],
    queryFn: async () => {
      const response = await api.get<{ data: StateType[] }>(
        api_routes.admin.state.all
      );
      return response.data.data;
    },
    enabled,
  });
};

export const useStateQuery: (
  id: number,
  enabled: boolean
) => UseQueryResult<StateType, unknown> = (id, enabled) => {
  return useQuery({
    queryKey: [StateQueryKey, id],
    queryFn: async () => {
      const response = await api.get<{ data: StateType }>(
        api_routes.admin.state.view(id)
      );
      return response.data.data;
    },
    enabled,
  });
};
