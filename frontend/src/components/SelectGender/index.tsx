import { useSearchParams } from "react-router-dom";
import { SelectPicker } from "rsuite";

type PropType = {
  key?: string;
  className?: string;
};

const data = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "others" },
];

const SelectGender = (props: PropType) => {
  const { key } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const selectHandler = (value: string) => {
    searchParams.set("gender" + (key || ""), value);
    setSearchParams(searchParams);
  };
  return (
    <SelectPicker
      data={data}
      name="gender"
      value={searchParams.get("gender" + (key || "")) || ""}
      onChange={(value) => selectHandler(value || "")}
      placeholder={"Select Gender"}
      style={{ minWidth: "150px" }}
      className={props.className}
    />
  );
};

export default SelectGender;
