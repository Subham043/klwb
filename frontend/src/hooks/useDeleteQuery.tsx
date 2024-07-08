import { useState } from 'react';
import { useToast } from './useToast';
import { useAxios } from './useAxios';

/*
  * Toast Hook Type
*/
type DeleteQueryHookType = () => {
    deleteLoading: boolean;
    deleteHandler:  (delete_url: string) => Promise<void>;
}


/*
  Toast Hook Function: This hook is used to have common toast configs at one place
*/
export const useDeleteQuery:DeleteQueryHookType = () => {

    const {toastError, toastSuccess} = useToast();
    const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
    const axios = useAxios();
    const deleteHandler = async (delete_url: string) => {
        setDeleteLoading(true)
        try {
            await axios.delete(`${delete_url}`);
            toastSuccess('Deleted Successfully');
        } catch (error) {
            toastError('Something went wrong. Please try again later.');
        }finally{
            setDeleteLoading(false);
        }
    }

    return {
        deleteHandler,
        deleteLoading
    };
}