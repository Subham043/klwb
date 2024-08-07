import {
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useToast } from "../useToast";
import { isAxiosError } from "axios";
import { AuthType } from "../../utils/types";
import { useUser } from "../useUser";
import { useAxios } from "../useAxios";

export const ProfileQueryKey = "profile";

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
