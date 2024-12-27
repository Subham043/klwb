import { AsyncPaginate } from "react-select-async-paginate";
import type { GroupBase, OptionsOrGroups } from "react-select";
import { useCallback } from "react";
import { api_routes } from "../../../../../utils/routes/api";
import { CourseType, PaginationType } from "../../../../../utils/types";
import api from "../../../../../utils/config/axios";
import { Form } from "rsuite";

type OptionType = {
  value: number;
  label: string;
};

type Props = {
  value?: OptionType|undefined;
  setValue: (value: OptionType) => void;
  graduation?: number;
  isDisabled?: boolean;
};

export default function CourseSelect({ value, setValue, isDisabled, graduation }: Props) {
  const loadOptions = useCallback(
    async (
      search: string,
      _loadedOptions: OptionsOrGroups<OptionType, GroupBase<OptionType>>,
      additional: { page: number, graduation_id?: number } | undefined
    ) => {
      const response = await api.get<PaginationType<CourseType>>(
        api_routes.user.course.all +
          `?page=${
            additional ? additional.page : 1
          }&total=10&filter[search]=${search}${
            additional && additional.graduation_id ? `&filter[has_graduation]=${additional.graduation_id}` : ""
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
    []
  );

  return (
				<div style={{ position: "relative", zIndex: 11}} key={graduation}>
          <Form.ControlLabel>Course</Form.ControlLabel>
          <AsyncPaginate
              value={value}
              loadOptions={loadOptions}
              isDisabled={isDisabled}
              onChange={(value) => {setValue(value as OptionType);}}
              additional={{
                  page: 1,
                  graduation_id: graduation
              }}
              noOptionsMessage={() => "No Course Available. You can leave it empty."}
              debounceTimeout={500}
              key={graduation}
          />
				</div>
  );
}
