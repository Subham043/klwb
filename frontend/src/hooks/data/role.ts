import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { api_routes } from "../../utils/api_routes";
import api from "../../utils/axios";
import { RoleType } from "../../utils/types";

export const RoleSelectQueryKey = "role_select";

export const useRoleSelectQuery: (
  enabled: boolean
) => UseQueryResult<RoleType[], unknown> = (enabled) => {
  return useQuery({
    queryKey: [RoleSelectQueryKey],
    queryFn: async () => {
      const response = await api.get<{ data: RoleType[] }>(
        api_routes.admin.role
      );
      return response.data.data;
    },
    enabled,
  });
};
