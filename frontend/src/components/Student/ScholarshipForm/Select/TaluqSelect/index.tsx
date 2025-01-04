import { AsyncPaginate } from "react-select-async-paginate";
import type { GroupBase, OptionsOrGroups } from "react-select";
import { useCallback } from "react";
import { api_routes } from "../../../../../utils/routes/api";
import { CityType, PaginationType } from "../../../../../utils/types";
import api from "../../../../../utils/config/axios";

type OptionType = {
  value: number;
  label: string;
};

type Props = {
  value?: OptionType;
  setValue: (value: OptionType) => void;
  district?: number;
  isDisabled?: boolean;
};

export default function TaluqSelect({ value, setValue, isDisabled, district }: Props) {
  const loadOptions = useCallback(
    async (
      search: string,
      _loadedOptions: OptionsOrGroups<OptionType, GroupBase<OptionType>>,
      additional: { page: number, district_id?: number } | undefined
    ) => {
      const response = await api.get<PaginationType<CityType>>(
        api_routes.user.taluq.all +
          `?page=${
            additional ? additional.page : 1
          }&total=10&filter[search]=${search}${
            additional && additional.district_id ? `&filter[has_city]=${additional.district_id}` : ""
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
          district_id: additional?.district_id
        },
      };
    },
    []
  );

  return (
				<div style={{ position: "relative", zIndex: 14}} key={district}>
					<AsyncPaginate
							value={value}
							loadOptions={loadOptions}
							isDisabled={isDisabled}
							onChange={(value) => {setValue(value as OptionType);}}
							additional={{
									page: 1,
                  district_id: district
							}}
							debounceTimeout={500}
              key={district}
					/>
				</div>
  );
}
