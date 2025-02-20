import { AsyncPaginate } from "react-select-async-paginate";
import type { GroupBase, OptionsOrGroups } from "react-select";
import { useCallback } from "react";
import { api_routes } from "../../../../../utils/routes/api";
import { ClassType, PaginationType } from "../../../../../utils/types";
import api from "../../../../../utils/config/axios";
import { Form } from "rsuite";

type OptionType = {
  value?: number;
  label?: string;
};

type Props = {
  value?: OptionType|undefined;
  setValue: (value: OptionType) => void;
  course?: number;
  isDisabled?: boolean;
};

export default function ClassSelect({ value, setValue, isDisabled, course }: Props) {
  const loadOptions = useCallback(
    async (
      search: string,
      _loadedOptions: OptionsOrGroups<OptionType, GroupBase<OptionType>>,
      additional: { page: number, course_id?: number } | undefined
    ) => {
      const response = await api.get<PaginationType<ClassType>>(
        api_routes.user.class.all +
          `?page=${
            additional ? additional.page : 1
          }&total=10&sort=name&filter[search]=${search}${
            additional && additional.course_id ? `&filter[has_course]=${additional.course_id}` : ""
          }`
      );
      return {
        options: response.data.data.map((clas) => ({
          value: clas.id,
          label: clas.name,
        })),
        hasMore: response.data.meta.current_page < response.data.meta.last_page,
        additional: {
          page: response.data.meta.current_page + 1,
          course_id: additional?.course_id
        },
      };
    },
    []
  );

  return (
				<div style={{ position: "relative", zIndex: 10}} key={course}>
          <Form.ControlLabel>Class</Form.ControlLabel>
          <AsyncPaginate
              value={value && value.value ? value : undefined}
              loadOptions={loadOptions}
              isDisabled={isDisabled}
              onChange={(value) => {setValue(value as OptionType);}}
              additional={{
                  page: 1,
                  course_id: course
              }}
              noOptionsMessage={() => "No Classes Available. You can leave it empty."}
              debounceTimeout={500}
              key={course}
          />
				</div>
  );
}
