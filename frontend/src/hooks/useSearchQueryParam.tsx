import { useSearchParams } from 'react-router-dom';
import { DebouncedFunc } from 'lodash';
import { QueryInitialPageParam, QueryTotalCount } from '../utils/constants';
import debounce from 'lodash.debounce';

/*
  * Toast Hook Type
*/
type SearchQueryParamHookType = () => {
    search: string,
    searchHandler:  DebouncedFunc<(value: string) => void>;
}


/*
  Toast Hook Function: This hook is used to have common toast configs at one place
*/
export const useSearchQueryParam:SearchQueryParamHookType = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const searchHandler = debounce((value: string) => setSearchParams({page: searchParams.get('page') || QueryInitialPageParam.toString(), limit: searchParams.get('limit') || QueryTotalCount.toString(), search: value}), 500)

    return {
        search: searchParams.get("search") || "",
        searchHandler
    };
}