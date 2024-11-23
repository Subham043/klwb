import { AsyncPaginate } from "react-select-async-paginate";
import api from "../../utils/config/axios";
import { api_routes } from "../../utils/routes/api";
import { GraduationType, PaginationType } from "../../utils/types";
import type { GroupBase, OptionsOrGroups } from "react-select";
import { useCallback } from "react";

type OptionType = {
  value: number;
  label: string;
};

type Props = {
  value?: OptionType;
  setValue: (value: OptionType) => void;
  isDisabled?: boolean;
};

export default function GraduationSelect({ value, setValue, isDisabled }: Props) {
  const loadOptions = useCallback(
    async (
      search: string,
      _loadedOptions: OptionsOrGroups<OptionType, GroupBase<OptionType>>,
      additional: { page: number } | undefined
    ) => {
      const response = await api.get<PaginationType<GraduationType>>(
        api_routes.admin.graduation.paginate +
          `?page=${
            additional ? additional.page : 1
          }&total=10&filter[search]=${search}`
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
				<div style={{ position: "relative", zIndex: 12}}>
					<AsyncPaginate
							value={value}
							loadOptions={loadOptions}
							isDisabled={isDisabled}
							onChange={(value) => {setValue(value as OptionType);}}
							additional={{
									page: 1,
							}}
							debounceTimeout={500}
					/>
				</div>
  );
}