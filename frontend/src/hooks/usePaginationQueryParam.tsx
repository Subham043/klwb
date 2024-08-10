import { useSearchParams } from 'react-router-dom';
import { QueryInitialPageParam, QueryTotalCount } from '../utils/constants/query_client';

/*
  * Toast Hook Type
*/
type PaginationQueryParamHookType = (key?:string) => {
    page: string;
    pageHandler:  (value: number) => void;
    limit: string;
    limitHandler:  (value: number) => void;
}


/*
  Toast Hook Function: This hook is used to have common toast configs at one place
*/
export const usePaginationQueryParam:PaginationQueryParamHookType = (key?:string) => {

    const [searchParams, setSearchParams] = useSearchParams();
    const pageHandler = (value: number) => {
      setSearchParams({["page" + (key || "")]: value.toString(), ["limit" + (key || "")]: searchParams.get('limit' + (key || '')) || QueryTotalCount.toString(), ["search" + (key || "")]: searchParams.get('search') || ''})
    }
    const limitHandler = (value: number) => {
      setSearchParams({["page" + (key || "")]: searchParams.get('page' + (key || '')) || QueryInitialPageParam.toString(), ["limit" + (key || "")]: value.toString(), ["search" + (key || "")]: searchParams.get('search') || ''})
    }

    return {
        page: searchParams.get('page' + (key || '')) || QueryInitialPageParam.toString(),
        pageHandler,
        limit: searchParams.get('limit' + (key || '')) || QueryTotalCount.toString(),
        limitHandler
    };
}