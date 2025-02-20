import { AsyncPaginate } from "react-select-async-paginate";
import api from "../../utils/config/axios";
import { api_routes } from "../../utils/routes/api";
import { IndustryType, PaginationType } from "../../utils/types";
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
  taluq_id?: number;
};

export default function IndustrySelect({ value, setValue, isDisabled, taluq_id }: Props) {
  const loadOptions = useCallback(
    async (
      search: string,
      _loadedOptions: OptionsOrGroups<OptionType, GroupBase<OptionType>>,
      additional: { page: number } | undefined
    ) => {
      const response = await api.get<PaginationType<IndustryType>>(
        api_routes.user.industry.all +
          `?page=${
            additional ? additional.page : 1
          }&total=10&sort=name&filter[search]=${search}${
            taluq_id ? `&filter[has_taluq]=${taluq_id}` : ""
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
        },
      };
    },
    [taluq_id]
  );

  return (
    <div style={{ position: "relative", zIndex: 11}}>
      <AsyncPaginate
        value={value}
        loadOptions={loadOptions}
        isDisabled={isDisabled}
        onChange={(value) => setValue(value as OptionType)}
        additional={{
          page: 1,
        }}
        debounceTimeout={500}
        key={`taluq__${taluq_id ? taluq_id : ''}`}
        cacheUniqs={[taluq_id]}
      />
    </div>
  );
}
