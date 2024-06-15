import toast from 'react-hot-toast';

/*
  * Toast Hook Type
*/
type ToastHookType = () => {
    toastSuccess:(msg:string)=>void;
    toastError:(msg:string)=>void;
    toastInfo:(msg:string)=>void;
}


/*
  Toast Hook Function: This hook is used to have common toast configs at one place
*/
export const useToast:ToastHookType = () => {
    const toastSuccess = (msg:string) => {
        toast.dismiss();
        toast.success(msg, { duration: 5000, position: 'bottom-center', });
    }
    const toastError = (msg:string) =>  {
        toast.dismiss();
        toast.error(msg, { duration: 5000, position: 'bottom-center', });
    }
    const toastInfo = (msg:string) =>  {
        toast.dismiss();
        toast(msg, { duration: 5000, position: 'bottom-center', });
    }

    return {
        toastSuccess,
        toastError,
        toastInfo
    };
}