import { useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ClassType, PaginationType } from "../../utils/types";
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

const SelectClassStatus = (props: PropType) => {
  const { key } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const selectHandler = (value: OptionType) => {
    if(value){
      searchParams.set("class_id" + (key || ""), value.value.toString());
      searchParams.set("class_name" + (key || ""), value.label.toString());
    }else{
      searchParams.delete("class_id" + (key || ""));
      searchParams.delete("class_name" + (key || ""));
    }
    setSearchParams(searchParams);
  };
  const loadOptions = useCallback(
    async (
      search: string,
      _loadedOptions: OptionsOrGroups<OptionType, GroupBase<OptionType>>,
      additional: { page: number } | undefined
    ) => {
      const response = await api.get<PaginationType<ClassType>>(
        api_routes.user.class.all +
          `?page=${
            additional ? additional.page : 1
          }&total=10&filter[search]=${search}${
            searchParams.get("course_id") ? `&filter[has_course]=${searchParams.get("course_id")}` : ""
          }`
      );
      return {
        options: response.data.data.map((classe) => ({
          value: classe.id,
          label: classe.name,
        })),
        hasMore: response.data.meta.current_page < response.data.meta.last_page,
        additional: {
          page: response.data.meta.current_page + 1,
        },
      };
    },
    [searchParams.get("course_id")]
  );
  
  useEffect(()=>{
    searchParams.delete("class_id" + (key || ""));
    searchParams.delete("class_name" + (key || ""));
    setSearchParams(searchParams);
  },[searchParams.get("graduation_id"), searchParams.get("course_id")])

  return (
    <div style={{ position: "relative", zIndex: 12, minWidth: "200px"}}>
      <AsyncPaginate
          placeholder="Select Class"
          value={(searchParams.get("class_id")) ? {
            label: searchParams.get("class_name" + (key || "")) || "",
            value: Number(searchParams.get("class_id" + (key || 0)) || 0),
          } : undefined}
          loadOptions={loadOptions}
          onChange={(value) => {selectHandler(value as OptionType);}}
          additional={{
              page: 1,
          }}
          isDisabled={searchParams.get("course_id") ? false : true}
          debounceTimeout={500}
          isClearable
          key={searchParams.get("course_id") ? `course__${searchParams.get("course_id")}` : "course__"}
      />
    </div>
  );
};

export default SelectClassStatus;
