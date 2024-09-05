import {
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useToast } from "../useToast";
import { isAxiosError } from "axios";
import { AuthType, RegisteredIndustryType, InstituteRegisteredType } from "../../utils/types";
import { useUser } from "../useUser";
import { useAxios } from "../useAxios";
import { api_routes } from "../../utils/routes/api";

export const ProfileQueryKey = "profile";
export const InstituteAccountQueryKey = "institute_account_info";
export const IndustryAccountQueryKey = "industry_account_info";

export const useProfileQuery: (
  enabled: boolean
) => UseQueryResult<AuthType, unknown> = (enabled) => {
  const axios = useAxios();
  const {profileViewApiLink} = useUser();
  return useQuery({
    queryKey: [ProfileQueryKey],
    queryFn: async () => {
      const response = await axios.get<{ profile: AuthType }>(
        profileViewApiLink
      );
      return response.data.profile;
    },
    enabled,
  });
};

export const useProfileQuerySetData = () => {
  const queryClient = useQueryClient();

  const updateProfile = (updateProfileVal: AuthType) => {
    queryClient.setQueryData<AuthType>([ProfileQueryKey], updateProfileVal);
  };

  return {
    updateProfile,
  };
};

export const useUpdateProfileMutation = () => {
  const { updateProfile } = useProfileQuerySetData();
  const { toastSuccess, toastError } = useToast();
  const { setUser, profileUpdateApiLink } = useUser();
  const axios = useAxios();

  return useMutation({
    mutationFn: async (updateProfileVal: {
      name: string;
      email: string;
      phone: number;
    }) => {
      const response = await axios.post<{ profile: AuthType }>(
        profileUpdateApiLink,
        updateProfileVal
      );
      return response.data.profile;
    },
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: (updateProfileVal) => {
      // ✅ update detail view directly
      setUser(updateProfileVal);
      updateProfile(updateProfileVal);
      toastSuccess("Profile updated successfully.");
    },
    onError: (error) => {
      if (!isAxiosError(error)) {
        toastError("Something went wrong. Please try again later.");
      }
    },
  });
};


export const useInstituteAccountQuery: (
  enabled: boolean
) => UseQueryResult<InstituteRegisteredType, unknown> = (enabled) => {
  const axios = useAxios();
  return useQuery({
    queryKey: [InstituteAccountQueryKey],
    queryFn: async () => {
      const response = await axios.get<{ account_info: InstituteRegisteredType }>(
        api_routes.institute.account.info
      );
      return response.data.account_info;
    },
    enabled,
  });
};

export const useIndustryAccountQuery: (
  enabled: boolean
) => UseQueryResult<RegisteredIndustryType, unknown> = (enabled) => {
  const axios = useAxios();
  return useQuery({
    queryKey: [IndustryAccountQueryKey],
    queryFn: async () => {
      const response = await axios.get<{ account_info: RegisteredIndustryType }>(
        api_routes.industry.account.info
      );
      return response.data.account_info;
    },
    enabled,
  });
};