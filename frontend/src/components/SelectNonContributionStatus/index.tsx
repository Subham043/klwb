import { useSearchParams } from "react-router-dom";
import { SelectPicker } from "rsuite";

type PropType = {
  key?: string;
  className?: string;
  disabledFields?: string[]
};

const data = [
  { label: "REGISTERED", value: "registered" },
  { label: "NON-REGISTERED", value: "non_registered" },
];

const SelectNonContributionStatus = (props: PropType) => {
  const { key, disabledFields=[] } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const selectHandler = (value: string) => {
    searchParams.set("status" + (key || ""), value);
    setSearchParams(searchParams);
  };
  return (
    <SelectPicker
      data={data.filter((item) => !disabledFields.includes(item.value))}
      name="status"
      value={searchParams.get("status" + (key || "")) || ""}
      onChange={(value) => selectHandler(value || "")}
      placeholder={"Select Status"}
      style={{ minWidth: "150px" }}
      className={props.className}
    />
  );
};

export default SelectNonContributionStatus;
