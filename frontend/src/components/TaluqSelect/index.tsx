import { AsyncPaginate } from "react-select-async-paginate";
import api from "../../utils/config/axios";
import { api_routes } from "../../utils/routes/api";
import { TaluqType, PaginationType } from "../../utils/types";
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
  city_id?: number;
};

export default function TaluqSelect({
  value,
  setValue,
  isDisabled,
  city_id,
}: Props) {

  const loadOptions = useCallback(
    async (
      search: string,
      _loadedOptions: OptionsOrGroups<OptionType, GroupBase<OptionType>>,
      additional: { page: number } | undefined
    ) => {
      const response = await api.get<PaginationType<TaluqType>>(
        api_routes.user.taluq.all +
          `?page=${additional ? additional.page : 1}${
            city_id ? `&sort=name&filter[has_city]=${city_id}` : ""
          }&total=10&filter[search]=${encodeURIComponent(search)}`
      );

      return {
        options: response.data.data.map((taluq) => ({
          value: taluq.id,
          label: taluq.name,
        })),
        hasMore: response.data.meta.current_page < response.data.meta.last_page,
        additional: {
          page: response.data.meta.current_page + 1,
        },
      };
    },
    [city_id]
  );

  return (
    <div style={{ position: "relative", zIndex: 12}}>
      <AsyncPaginate
        key={`city__${city_id ? city_id : ''}`}
        value={value}
        loadOptions={loadOptions}
        isDisabled={isDisabled}
        onChange={(value) => setValue(value as OptionType)}
        additional={{
          page: 1,
        }}
        debounceTimeout={500}
        cacheUniqs={[city_id]}
      />
    </div>
  );
}
