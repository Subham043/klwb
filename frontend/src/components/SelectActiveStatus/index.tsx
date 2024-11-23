import { useSearchParams } from "react-router-dom";
import { SelectPicker } from "rsuite";

type PropType = {
  key?: string;
};

const data = [
  { label: "ACTIVE", value: "active" },
  { label: "INACTIVE", value: "inactive" }
];

const SelectActiveStatus = (props: PropType) => {
  const { key } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const selectHandler = (value: string) => {
    searchParams.set("active_status" + (key || ""), value);
    setSearchParams(searchParams);
  };
  return (
    <SelectPicker
      data={data}
      name="active_status"
      value={searchParams.get("active_status" + (key || "")) || ""}
      onChange={(value) => selectHandler(value || "")}
      placeholder={"Select Active Status"}
      style={{ minWidth: "150px" }}
    />
  );
};

export default SelectActiveStatus;