import { useSearchParams } from "react-router-dom";
import { SelectPicker } from "rsuite";

type PropType = {
  key?: string;
};

const data = [
  { label: "VERIFIED", value: "verified" },
  { label: "VERIFICATION PENDING", value: "verification_pending" }
];

const SelectVerificationStatus = (props: PropType) => {
  const { key } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const selectHandler = (value: string) => {
    searchParams.set("verification_status" + (key || ""), value);
    setSearchParams(searchParams);
  };
  return (
    <SelectPicker
      data={data}
      name="verification_status"
      value={searchParams.get("verification_status" + (key || "")) || ""}
      onChange={(value) => selectHandler(value || "")}
      placeholder={"Select Verification Status"}
      style={{ minWidth: "150px" }}
    />
  );
};

export default SelectVerificationStatus;
