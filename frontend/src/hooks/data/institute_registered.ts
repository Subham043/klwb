import { UseQueryResult, useQuery } from "@tanstack/react-query";
import {
  InstituteRegisteredType,
  InstituteRegisteredStaffType,
  PaginationType,
} from "../../utils/types";
import { useAxios } from "../useAxios";
import { api_routes } from "../../utils/routes/api";
import { usePaginationQueryParam } from "../usePaginationQueryParam";
import { useSearchQueryParam } from "../useSearchQueryParam";

export const InstituteRegisteredQueryKey = "institute_registered";
export const InstitutesRegisteredQueryKey = "institutes_registered";
export const InstitutesRegisteredStaffQueryKey = "institutes_registered_staff";

export const useInstitutesRegisteredQuery: () => UseQueryResult<
  PaginationType<InstituteRegisteredType>,
  unknown
> = () => {
  const axios = useAxios();
  const { page, limit } = usePaginationQueryParam();
  const { search } = useSearchQueryParam();
  return useQuery({
    queryKey: [InstitutesRegisteredQueryKey, page, limit, search],
    queryFn: async () => {
      const response = await axios.get<
        PaginationType<InstituteRegisteredType>
      >(
        api_routes.admin.institute.registered.paginate +
          `?page=${page}&total=${limit}&filter[search]=${search}`
      );
      return response.data;
    },
  });
};

export const useInstitutesRegisteredStaffQuery: (id: number) => UseQueryResult<
  PaginationType<InstituteRegisteredStaffType>,
  unknown
> = (id) => {
  const axios = useAxios();
  const { page, limit } = usePaginationQueryParam("_staff");
  const { search } = useSearchQueryParam("_staff");
  return useQuery({
    queryKey: [InstitutesRegisteredStaffQueryKey, id, page, limit, search],
    queryFn: async () => {
      const response = await axios.get<
        PaginationType<InstituteRegisteredStaffType>
      >(
        api_routes.admin.institute.registered.staff.paginate(id) +
          `?page=${page}&total=${limit}&filter[search]=${search}`
      );
      return response.data;
    },
  });
};

export const useInstituteRegisteredQuery: (
  id: number,
  enabled: boolean
) => UseQueryResult<InstituteRegisteredType, unknown> = (id, enabled) => {
  const axios = useAxios();
  return useQuery({
    queryKey: [InstituteRegisteredQueryKey, id],
    queryFn: async () => {
      const response = await axios.get<{ data: InstituteRegisteredType }>(
        api_routes.admin.institute.registered.view(id)
      );
      return response.data.data;
    },
    enabled,
  });
};
