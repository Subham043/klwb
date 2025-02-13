import { useState } from 'react';
import { useToast } from './useToast';
import { env } from '../utils/config/env';
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
    const [excelLoading, setExcelLoading] = useState<boolean>(false);
    const [searchParams] = useSearchParams();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const exportExcel = async (excel_url: string, _excel_file_name: string) => {
        setExcelLoading(true);
        try {
            const filter: string[] = [];
            searchParams.forEach((value, key) => {
                if(key === 'city_id'){
                    filter.push(`filter[has_city]=${value}`);
                }else if(key === 'state_id'){
                    filter.push(`filter[has_state]=${value}`);
                }else if(key === 'taluq_id'){
                    filter.push(`filter[has_taluq]=${value}`);
                }else if(key === 'graduation_id'){
                    filter.push(`filter[has_graduation]=${value}`);
                }else if(key === 'course_id'){
                    filter.push(`filter[has_course]=${value}`);
                }else if(key === 'class_id'){
                    filter.push(`filter[has_class]=${value}`);
                }else if(key === 'category'){
                    filter.push(`filter[has_category]=${value}`);
                }else if(key === 'gender'){
                    filter.push(`filter[has_gender]=${value}`);
                }else if(key === 'page' || key === 'limit' || key.includes('_name')){
                    // Do nothing
                }else{
                    filter.push(`filter[${key}]=${value}`);
                }
            })
            window.open(env.API_ENDPOINT + `${excel_url}?${filter.join('&')}`, '_blank');
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