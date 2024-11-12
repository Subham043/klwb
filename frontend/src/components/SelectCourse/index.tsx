import { useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { CourseType, PaginationType } from "../../utils/types";
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

const SelectCourseStatus = (props: PropType) => {
  const { key } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const selectHandler = (value: OptionType) => {
    if(value){
      searchParams.set("course_id" + (key || ""), value.value.toString());
      searchParams.set("course_name" + (key || ""), value.label.toString());
    }else{
      searchParams.delete("course_id" + (key || ""));
      searchParams.delete("course_name" + (key || ""));
    }
    setSearchParams(searchParams);
  };
  const loadOptions = useCallback(
    async (
      search: string,
      _loadedOptions: OptionsOrGroups<OptionType, GroupBase<OptionType>>,
      additional: { page: number } | undefined
    ) => {
      const response = await api.get<PaginationType<CourseType>>(
        api_routes.user.course.all +
          `?page=${
            additional ? additional.page : 1
          }&total=10&filter[search]=${search}${
            searchParams.get("graduation_id") ? `&filter[has_graduation]=${searchParams.get("graduation_id")}` : ""
          }`
      );
      return {
        options: response.data.data.map((course) => ({
          value: course.id,
          label: course.name,
        })),
        hasMore: response.data.meta.current_page < response.data.meta.last_page,
        additional: {
          page: response.data.meta.current_page + 1,
        },
      };
    },
    [searchParams.get("graduation_id")]
  );
  
  useEffect(()=>{
    searchParams.delete("course_id" + (key || ""));
    searchParams.delete("course_name" + (key || ""));
    setSearchParams(searchParams);
  },[searchParams.get("graduation_id")])

  return (
    <div style={{ position: "relative", zIndex: 12, minWidth: "200px"}}>
      <AsyncPaginate
          placeholder="Select Course"
          value={(searchParams.get("course_id")) ? {
            label: searchParams.get("course_name" + (key || "")) || "",
            value: Number(searchParams.get("course_id" + (key || 0)) || 0),
          } : undefined}
          loadOptions={loadOptions}
          onChange={(value) => {selectHandler(value as OptionType);}}
          additional={{
              page: 1,
          }}
          isDisabled={searchParams.get("graduation_id") ? false : true}
          debounceTimeout={500}
          isClearable
          key={searchParams.get("graduation_id") ? `graduation__${searchParams.get("graduation_id")}` : "graduation__"}
      />
    </div>
  );
};

export default SelectCourseStatus;
