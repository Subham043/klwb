import { useSearchParams } from "react-router-dom";
import { SelectPicker } from "rsuite";

type PropType = {
  key?: string;
};

const data = [
  { label: "ACTIVE", value: "active" },
  { label: "BLOCKED", value: "blocked" }
];

const SelectAccountStatus = (props: PropType) => {
  const { key } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const selectHandler = (value: string) => {
    searchParams.set("account_status" + (key || ""), value);
    setSearchParams(searchParams);
  };
  return (
    <SelectPicker
      data={data}
      name="account_status"
      value={searchParams.get("account_status" + (key || "")) || ""}
      onChange={(value) => selectHandler(value || "")}
      placeholder={"Select Account Status"}
      style={{ minWidth: "150px" }}
    />
  );
};

export default SelectAccountStatus;
