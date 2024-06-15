import {
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useToast } from "../useToast";
import { isAxiosError } from "axios";
import { api_routes } from "../../utils/api_routes";
import { AuthType } from "../../utils/types";
import api from "../../utils/axios";
import { useUser } from "../useUser";

export const ProfileQueryKey = "profile";

export const useProfileQuery: (
  enabled: boolean
) => UseQueryResult<AuthType, unknown> = (enabled) => {
  return useQuery({
    queryKey: [ProfileQueryKey],
    queryFn: async () => {
      const response = await api.get<{ profile: AuthType }>(
        api_routes.account.profile
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
  const { setUser } = useUser();

  return useMutation({
    mutationFn: async (updateProfileVal: {
      name: string;
      email: string;
      phone: number;
    }) => {
      const response = await api.post<{ profile: AuthType }>(
        api_routes.account.profile_update,
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
