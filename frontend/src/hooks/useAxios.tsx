import { useUser } from './useUser';
import api from '../utils/config/axios';
import { AxiosInstance, isAxiosError } from 'axios';
import { useToast } from './useToast';
import { useMemo } from 'react';

/*
  * Axios Hook Type
*/
type AxiosHookType = () => AxiosInstance


/*
  Axios Hook Function: This hook is used to have common toast configs at one place
*/
export const useAxios:AxiosHookType = () => {
    
    const {user, removeUser} = useUser();
    const {toastError} = useToast();
    
    const axios = useMemo(() => {
        api.interceptors.response.use(
            (response) => response,
            (error) => {
                if (isAxiosError(error) && (error.response?.status === 401 || error.response?.status === 403) && user) {
                    removeUser();
                    toastError(error.response.data?.message || "Session expired. Please login again.");
                }
                return Promise.reject(error);
            }
        );
        return api
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, removeUser])
    return axios
}