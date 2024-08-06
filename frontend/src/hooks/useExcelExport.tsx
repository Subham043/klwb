import { useState } from 'react';
import { useToast } from './useToast';
import { useAxios } from './useAxios';
import { useSearchParams } from 'react-router-dom';

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
    const axios = useAxios();
    const [searchParams] = useSearchParams();
    const search = searchParams.get('search') || '';
    const [excelLoading, setExcelLoading] = useState<boolean>(false);
    const exportExcel = async (excel_url: string, excel_file_name: string) => {
        setExcelLoading(true);
        try {
            const response = await axios.get(`${excel_url}${search.length > 0 ? `?filter[search]=${search}` : ''}`, {responseType: 'blob'});
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', excel_file_name);
            document.body.appendChild(link);
            link.click();
            link.remove();
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