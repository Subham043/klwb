import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { GraduationType, PaginationType } from "../../utils/types";
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

const SelectGraduationStatus = (props: PropType) => {
  const { key } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const selectHandler = (value: OptionType) => {
    if(value){
      searchParams.set("graduation_id" + (key || ""), value.value.toString());
      searchParams.set("graduation_name" + (key || ""), value.label.toString());
      searchParams.delete("course_id" + (key || ""));
      searchParams.delete("course_name" + (key || ""));
      searchParams.delete("class_id" + (key || ""));
      searchParams.delete("class_name" + (key || ""));
    }else{
      searchParams.delete("graduation_id" + (key || ""));
      searchParams.delete("graduation_name" + (key || ""));
      searchParams.delete("course_id" + (key || ""));
      searchParams.delete("course_name" + (key || ""));
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
      const response = await api.get<PaginationType<GraduationType>>(
        api_routes.user.graduation.all +
          `?page=${
            additional ? additional.page : 1
          }&total=10&sort=name&filter[search]=${search}`
      );
      return {
        options: response.data.data.map((graduation) => ({
          value: graduation.id,
          label: graduation.name,
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
    <div style={{ position: "relative", zIndex: 12, minWidth: "150px"}}>
      <AsyncPaginate
          placeholder="Select Graduation"
          value={(searchParams.get("graduation_name") && searchParams.get("graduation_id")) ? {
            label: searchParams.get("graduation_name" + (key || "")) || "",
            value: Number(searchParams.get("graduation_id" + (key || 0)) || 0),
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

export default SelectGraduationStatus;
