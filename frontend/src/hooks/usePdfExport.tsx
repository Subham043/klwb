import { useState } from 'react';
import { useToast } from './useToast';
import { useAxios } from './useAxios';

/*
  * Toast Hook Type
*/
type PdfExportHookType = () => {
    pdfLoading: boolean;
    exportPdf:  (pdf_url: string, pdf_file_name: string) => Promise<void>;
}


/*
  Toast Hook Function: This hook is used to have common toast configs at one place
*/
export const usePdfExport:PdfExportHookType = () => {

    const {toastError, toastSuccess} = useToast();
    const axios = useAxios();
    const [pdfLoading, setPdfLoading] = useState<boolean>(false);
    const exportPdf = async (pdf_url: string, _pdf_file_name: string) => {
        setPdfLoading(true);
        try {
            const response = await axios.get(`${pdf_url}`, 
                {
                    responseType: 'blob',
                }
            );
            const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
            window.open(url, '_blank');
            window.URL.revokeObjectURL(url);
            // const link = document.createElement('a');
            // link.href = url;
            // link.setAttribute('download', pdf_file_name);
            // document.body.appendChild(link);
            // link.click();
            // link.remove();
            toastSuccess('Pdf Exported Successfully');
        } catch (error) {
            toastError('Something went wrong. Please try again later.');
        }finally{
            setPdfLoading(false);
        }
    }

    return {
        exportPdf,
        pdfLoading
    };
}