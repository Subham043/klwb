import moment from "moment";
import { useSearchParams } from "react-router-dom";
import { SelectPicker } from "rsuite";

type PropType = {
	key?: string
  className?: string;
  canClear?: boolean;
};

const diff = moment().year() - 2017;

const data = Array.from({ length: diff }, (_, i) => ({ label : (moment().year() - i).toString(), value : (moment().year() - i).toString() }));

const SelectYear = ({ canClear=true, ...props }: PropType) => {
  const {
		key,
  } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const selectHandler = (value: string) => {
    searchParams.set("year"+(key || ""), value)
    setSearchParams(searchParams)
  }

  return (
    <SelectPicker
      data={data}
      name="year"
      value={searchParams.get("year"+(key || "")) || ''}
      onChange={(value) => selectHandler(value || '')}
      placeholder={"Select Year"}
      virtualized
      style={{ minWidth: "150px" }}
      className={props.className}
      cleanable={canClear}
    />
  );
};

export default SelectYear;
