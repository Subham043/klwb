import { useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { TaluqType, PaginationType } from "../../utils/types";
import type { GroupBase, OptionsOrGroups } from "react-select";
import api from "../../utils/config/axios";
import { api_routes } from "../../utils/routes/api";
import { AsyncPaginate } from "react-select-async-paginate";

type OptionType = {
  value: number;
  label: string;
};

type PropType = {
  key?: string;
};

const SelectTaluqStatus = (props: PropType) => {
  const { key } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const selectHandler = (value: OptionType) => {
    if(value){
      searchParams.set("taluq_id" + (key || ""), value.value.toString());
      searchParams.set("taluq_name" + (key || ""), value.label.toString());
    }else{
      searchParams.delete("taluq_id" + (key || ""));
      searchParams.delete("taluq_name" + (key || ""));
    }
    setSearchParams(searchParams);
  };
  const loadOptions = useCallback(
    async (
      search: string,
      _loadedOptions: OptionsOrGroups<OptionType, GroupBase<OptionType>>,
      additional: { page: number } | undefined
    ) => {
      const response = await api.get<PaginationType<TaluqType>>(
        api_routes.user.taluq.all +
          `?page=${
            additional ? additional.page : 1
          }&total=10&sort=name&filter[search]=${search}${
            searchParams.get("city_id") ? `&filter[has_city]=${searchParams.get("city_id")}` : ""
          }`
      );
      return {
        options: response.data.data.map((taluq) => ({
          value: taluq.id,
          label: taluq.name,
        })),
        hasMore: response.data.meta.current_page < response.data.meta.last_page,
        additional: {
          page: response.data.meta.current_page + 1,
        },
      };
    },
    [searchParams.get("city_id")]
  );
  
  useEffect(()=>{
    searchParams.delete("taluq_id" + (key || ""));
    searchParams.delete("taluq_name" + (key || ""));
    setSearchParams(searchParams);
  },[searchParams.get("city_id")])

  return (
    <div style={{ position: "relative", zIndex: 12, minWidth: "200px"}}>
      <AsyncPaginate
          placeholder="Select Taluq"
          value={(searchParams.get("taluq_id")) ? {
            label: searchParams.get("taluq_name" + (key || "")) || "",
            value: Number(searchParams.get("taluq_id" + (key || 0)) || 0),
          } : undefined}
          loadOptions={loadOptions}
          onChange={(value) => {selectHandler(value as OptionType);}}
          additional={{
              page: 1,
          }}
          isDisabled={searchParams.get("city_id") ? false : true}
          debounceTimeout={500}
          isClearable
          key={searchParams.get("city_id") ? `city__${searchParams.get("city_id")}` : "city__"}
      />
    </div>
  );
};

export default SelectTaluqStatus;
