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
      searchParams.set("page"+(key || ""), value.toString())
      setSearchParams(searchParams)
    }
    const limitHandler = (value: number) => {
      searchParams.set("limit"+(key || ""), value.toString())
      setSearchParams(searchParams)
    }

    return {
        page: searchParams.get('page' + (key || '')) || QueryInitialPageParam.toString(),
        pageHandler,
        limit: searchParams.get('limit' + (key || '')) || QueryTotalCount.toString(),
        limitHandler
    };
}