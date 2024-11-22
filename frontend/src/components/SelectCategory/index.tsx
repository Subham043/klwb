import { useSearchParams } from "react-router-dom";
import { SelectPicker } from "rsuite";

type PropType = {
  key?: string;
  className?: string;
};

const data = [
  { label: "General", value: "general" },
  { label: "OBC", value: "obc" },
  { label: "SC", value: "sc" },
  { label: "ST", value: "st" },
];

const SelectCategory = (props: PropType) => {
  const { key } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const selectHandler = (value: string) => {
    searchParams.set("category" + (key || ""), value);
    setSearchParams(searchParams);
  };
  return (
    <SelectPicker
      data={data}
      name="category"
      value={searchParams.get("category" + (key || "")) || ""}
      onChange={(value) => selectHandler(value || "")}
      placeholder={"Select Category"}
      style={{ minWidth: "150px" }}
      className={props.className}
    />
  );
};

export default SelectCategory;
