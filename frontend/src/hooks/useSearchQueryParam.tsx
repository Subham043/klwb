import { useSearchParams } from 'react-router-dom';
import { DebouncedFunc } from 'lodash';
import debounce from 'lodash.debounce';

/*
  * Toast Hook Type
*/
type SearchQueryParamHookType = (key?: string) => {
    search: string,
    searchHandler:  DebouncedFunc<(value: string) => void>;
}


/*
  Toast Hook Function: This hook is used to have common toast configs at one place
*/
export const useSearchQueryParam:SearchQueryParamHookType = (key?: string) => {

    const [searchParams, setSearchParams] = useSearchParams();
    const searchHandler = debounce((value: string) => {
      searchParams.set("search"+(key || ""), value)
      setSearchParams(searchParams)
    }, 500)

    return {
        search: searchParams.get("search"+(key || "")) || "",
        searchHandler
    };
}