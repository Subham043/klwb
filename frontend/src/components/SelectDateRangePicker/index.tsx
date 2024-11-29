import moment from "moment";
import { useSearchParams } from "react-router-dom";
import { DateRangePicker } from "rsuite";
import { DateRange } from "rsuite/esm/DateRangePicker";

type PropType = {
  key?: string;
  className?: string;
};

const SelectDateRangePicker = (props: PropType) => {
  const { key } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const selectHandler = (value: DateRange | null) => {
    if(value){
      searchParams.set("from_date" + (key || ""), moment(value[0]).format("YYYY-MM-DD"));
      searchParams.set("to_date" + (key || ""), moment(value[1]).format("YYYY-MM-DD"));
      setSearchParams(searchParams);
    }else{
      searchParams.delete("from_date" + (key || ""))
      searchParams.delete("to_date" + (key || ""))
      setSearchParams(searchParams);
    }
  };
  return (
    <DateRangePicker 
      showOneCalendar 
      placeholder="Select Date Range" 
      format="yyyy-MM-dd" 
      value={(searchParams.get("from_date" + (key || "")) && searchParams.get("to_date" + (key || ""))) ? [searchParams.get("from_date" + (key || "")) ? new Date(searchParams.get("from_date" + (key || "")) as string) : new Date(), searchParams.get("to_date" + (key || "")) ? new Date(searchParams.get("to_date" + (key || "")) as string) : new Date()] : null}
      onChange={selectHandler} 
    />
  );
};

export default SelectDateRangePicker;
