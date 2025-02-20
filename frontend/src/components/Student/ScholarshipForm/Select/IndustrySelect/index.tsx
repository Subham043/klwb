import { AsyncPaginate } from "react-select-async-paginate";
import type { GroupBase, OptionsOrGroups } from "react-select";
import { useCallback } from "react";
import { api_routes } from "../../../../../utils/routes/api";
import { IndustryType, PaginationType } from "../../../../../utils/types";
import api from "../../../../../utils/config/axios";

type OptionType = {
  value: number;
  label: string;
};

type Props = {
  value?: OptionType;
  setValue: (value: OptionType) => void;
  taluq?: number;
  isDisabled?: boolean;
};

export default function IndustrySelect({ value, setValue, isDisabled, taluq }: Props) {
  const loadOptions = useCallback(
    async (
      search: string,
      _loadedOptions: OptionsOrGroups<OptionType, GroupBase<OptionType>>,
      additional: { page: number, taluq_id?: number } | undefined
    ) => {
      const response = await api.get<PaginationType<IndustryType>>(
        api_routes.user.industry.all +
          `?page=${
            additional ? additional.page : 1
          }&total=10&sort=name&filter[search]=${search}${
            additional && additional.taluq_id ? `&filter[has_taluq]=${additional.taluq_id}` : ""
          }`
      );
      return {
        options: response.data.data.map((industry) => ({
          value: industry.id,
          label: industry.name,
        })),
        hasMore: response.data.meta.current_page < response.data.meta.last_page,
        additional: {
          page: response.data.meta.current_page + 1,
          taluq_id: additional?.taluq_id
        },
      };
    },
    []
  );

  return (
				<div style={{ position: "relative", zIndex: 13}} key={taluq}>
					<AsyncPaginate
							value={value}
							loadOptions={loadOptions}
							isDisabled={isDisabled}
							onChange={(value) => {setValue(value as OptionType);}}
							additional={{
									page: 1,
                  taluq_id: taluq
							}}
							debounceTimeout={500}
              key={taluq}
					/>
				</div>
  );
}
