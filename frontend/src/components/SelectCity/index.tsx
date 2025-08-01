import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { CityType, PaginationType } from "../../utils/types";
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

const SelectCity = (props: PropType) => {
  const { key } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const selectHandler = (value: OptionType) => {
    if(value){
      searchParams.set("city_id" + (key || ""), value.value.toString());
      searchParams.set("city_name" + (key || ""), value.label.toString());
      searchParams.delete("taluq_id" + (key || ""));
      searchParams.delete("taluq_name" + (key || ""));
    }else{
      searchParams.delete("city_id" + (key || ""));
      searchParams.delete("city_name" + (key || ""));
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
      const response = await api.get<PaginationType<CityType>>(
        api_routes.user.city.all +
          `?page=${
            additional ? additional.page : 1
          }&total=10&sort=name&filter[search]=${encodeURIComponent(search)}`
      );
      return {
        options: response.data.data.map((city) => ({
          value: city.id,
          label: city.name,
        })),
        hasMore: response.data.meta.current_page < response.data.meta.last_page,
        additional: {
          page: response.data.meta.current_page + 1,
        },
      };
    },
    []
  );
  return (
    <div style={{ position: "relative", zIndex: 12, minWidth: "200px"}}>
      <AsyncPaginate
          placeholder="Select District"
          value={(searchParams.get("city_name") && searchParams.get("city_id")) ? {
            label: searchParams.get("city_name" + (key || "")) || "",
            value: Number(searchParams.get("city_id" + (key || 0)) || 0),
          } : undefined}
          loadOptions={loadOptions}
          onChange={(value) => {selectHandler(value as OptionType);}}
          additional={{
              page: 1,
          }}
          debounceTimeout={500}
          isClearable
      />
    </div>
  );
};

export default SelectCity;
