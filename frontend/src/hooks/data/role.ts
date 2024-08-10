import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { RoleType } from "../../utils/types";
import { useAxios } from "../useAxios";
import { api_routes } from "../../utils/routes/api";

export const RoleSelectQueryKey = "role_select";

export const useRoleSelectQuery: (
  enabled: boolean
) => UseQueryResult<RoleType[], unknown> = (enabled) => {
  const axios = useAxios();
  return useQuery({
    queryKey: [RoleSelectQueryKey],
    queryFn: async () => {
      const response = await axios.get<{ data: RoleType[] }>(
        api_routes.admin.role
      );
      return response.data.data;
    },
    enabled,
  });
};
