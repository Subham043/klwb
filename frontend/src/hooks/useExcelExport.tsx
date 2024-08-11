import { useState } from 'react';
import { useToast } from './useToast';
// import { useAxios } from './useAxios';
import { env } from '../utils/config/env';

/*
  * Toast Hook Type
*/
type ExcelExportHookType = () => {
    excelLoading: boolean;
    exportExcel:  (excel_url: string, excel_file_name: string) => Promise<void>;
}


/*
  Toast Hook Function: This hook is used to have common toast configs at one place
*/
export const useExcelExport:ExcelExportHookType = () => {

    const {toastError, toastSuccess} = useToast();
    // const axios = useAxios();
    const [excelLoading, setExcelLoading] = useState<boolean>(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const exportExcel = async (excel_url: string, _excel_file_name: string) => {
        setExcelLoading(true);
        try {
            window.open(env.API_ENDPOINT + excel_url, '_blank');
            // const response = await axios.get(`${excel_url}`, 
            //     {
            //         responseType: 'blob',
            //     }
            // );
            // const url = window.URL.createObjectURL(new Blob([response.data]));
            // const link = document.createElement('a');
            // link.href = url;
            // link.setAttribute('download', excel_file_name);
            // document.body.appendChild(link);
            // link.click();
            // link.remove();
            toastSuccess('Excel Exported Successfully');
        } catch (error) {
            toastError('Something went wrong. Please try again later.');
        }finally{
            setExcelLoading(false);
        }
    }

    return {
        exportExcel,
        excelLoading
    };
}