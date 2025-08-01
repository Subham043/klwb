import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { StateType, PaginationType } from "../../utils/types";
import { useAxios } from "../useAxios";
import { api_routes } from "../../utils/routes/api";
import { usePaginationQueryParam } from "../usePaginationQueryParam";
import { useSearchQueryParam } from "../useSearchQueryParam";

export const StateQueryKey = "state";
export const StatesQueryKey = "states";
export const StateSelectQueryKey = "state_select";

export const useStatesQuery: () => UseQueryResult<
  PaginationType<StateType>,
  unknown
> = () => {
  const axios = useAxios();
  const { page, limit } = usePaginationQueryParam();
  const { search } = useSearchQueryParam();
  return useQuery({
    queryKey: [StatesQueryKey, page, limit, search],
    queryFn: async () => {
      const response = await axios.get<PaginationType<StateType>>(
        api_routes.admin.state.paginate +
          `?page=${page}&total=${limit}&filter[search]=${encodeURIComponent(search)}`
      );
      return response.data;
    },
  });
};

export const useStateSelectQuery: (
  enabled: boolean
) => UseQueryResult<StateType[], unknown> = (enabled) => {
  const axios = useAxios();
  return useQuery({
    queryKey: [StateSelectQueryKey],
    queryFn: async () => {
      const response = await axios.get<{ data: StateType[] }>(
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
  const axios = useAxios();
  return useQuery({
    queryKey: [StateQueryKey, id],
    queryFn: async () => {
      const response = await axios.get<{ data: StateType }>(
        api_routes.admin.state.view(id)
      );
      return response.data.data;
    },
    enabled,
  });
};
