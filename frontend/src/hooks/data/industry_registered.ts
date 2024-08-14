import { UseQueryResult, useQuery } from "@tanstack/react-query";
import {
  IndustryRegisteredType,
  IndustryRegisteredStaffType,
  PaginationType,
} from "../../utils/types";
import { useAxios } from "../useAxios";
import { api_routes } from "../../utils/routes/api";
import { usePaginationQueryParam } from "../usePaginationQueryParam";
import { useSearchQueryParam } from "../useSearchQueryParam";

export const IndustryRegisteredQueryKey = "industry_registered";
export const IndustriesRegisteredQueryKey = "industries_registered";
export const IndustriesRegisteredStaffQueryKey = "industries_registered_staff";

export const useIndustriesRegisteredQuery: () => UseQueryResult<
  PaginationType<IndustryRegisteredType>,
  unknown
> = () => {
  const axios = useAxios();
  const { page, limit } = usePaginationQueryParam();
  const { search } = useSearchQueryParam();
  return useQuery({
    queryKey: [IndustriesRegisteredQueryKey, page, limit, search],
    queryFn: async () => {
      const response = await axios.get<
        PaginationType<IndustryRegisteredType>
      >(
        api_routes.admin.industry.registered.paginate +
          `?page=${page}&total=${limit}&filter[search]=${search}`
      );
      return response.data;
    },
  });
};

export const useIndustriesRegisteredStaffQuery: (id: number) => UseQueryResult<
  PaginationType<IndustryRegisteredStaffType>,
  unknown
> = (id) => {
  const axios = useAxios();
  const { page, limit } = usePaginationQueryParam("_staff");
  const { search } = useSearchQueryParam("_staff");
  return useQuery({
    queryKey: [IndustriesRegisteredStaffQueryKey, id, page, limit, search],
    queryFn: async () => {
      const response = await axios.get<
        PaginationType<IndustryRegisteredStaffType>
      >(
        api_routes.admin.industry.registered.staff.paginate(id) +
          `?page=${page}&total=${limit}&filter[search]=${search}`
      );
      return response.data;
    },
  });
};

export const useIndustryRegisteredQuery: (
  id: number,
  enabled: boolean
) => UseQueryResult<IndustryRegisteredType, unknown> = (id, enabled) => {
  const axios = useAxios();
  return useQuery({
    queryKey: [IndustryRegisteredQueryKey, id],
    queryFn: async () => {
      const response = await axios.get<{ data: IndustryRegisteredType }>(
        api_routes.admin.industry.registered.view(id)
      );
      return response.data.data;
    },
    enabled,
  });
};
