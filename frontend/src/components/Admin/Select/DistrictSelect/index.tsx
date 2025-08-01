import { AsyncPaginate } from "react-select-async-paginate";
import type { GroupBase, OptionsOrGroups } from "react-select";
import { useCallback } from "react";
import api from "../../../../utils/config/axios";
import { CityType, PaginationType } from "../../../../utils/types";
import { api_routes } from "../../../../utils/routes/api";

type OptionType = {
  value: number;
  label: string;
};

type Props = {
  value?: OptionType;
  setValue: (value: OptionType) => void;
  isDisabled?: boolean;
};

export default function DistrictSelect({ value, setValue, isDisabled }: Props) {
  const loadOptions = useCallback(
    async (
      search: string,
      _loadedOptions: OptionsOrGroups<OptionType, GroupBase<OptionType>>,
      additional: { page: number } | undefined
    ) => {
      const response = await api.get<PaginationType<CityType>>(
        api_routes.admin.city.paginate +
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
				<div style={{ position: "relative", zIndex: 15}}>
					<AsyncPaginate
							value={value}
							loadOptions={loadOptions}
							isDisabled={isDisabled}
							onChange={(value) => {
                setValue(value as OptionType);
              }}
							additional={{
									page: 1,
							}}
							debounceTimeout={500}
					/>
				</div>
  );
}
