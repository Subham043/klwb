import { useSearchParams } from 'react-router-dom';
import { QueryInitialPageParam, QueryTotalCount } from '../utils/constants';

/*
  * Toast Hook Type
*/
type PaginationQueryParamHookType = () => {
    page: string;
    pageHandler:  (value: number) => void;
    limit: string;
    limitHandler:  (value: number) => void;
}


/*
  Toast Hook Function: This hook is used to have common toast configs at one place
*/
export const usePaginationQueryParam:PaginationQueryParamHookType = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const pageHandler = (value: number) => {
      setSearchParams({page: value.toString(), limit: searchParams.get('limit') || QueryTotalCount.toString(), search: searchParams.get('search') || ''})
    }
    const limitHandler = (value: number) => {
      setSearchParams({page: searchParams.get('page') || QueryInitialPageParam.toString(), limit: value.toString(), search: searchParams.get('search') || ''})
    }

    return {
        page: searchParams.get('page') || QueryInitialPageParam.toString(),
        pageHandler,
        limit: searchParams.get('limit') || QueryTotalCount.toString(),
        limitHandler
    };
}