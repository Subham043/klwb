import { useSearchParams } from "react-router-dom";
import { SelectPicker } from "rsuite";

type PropType = {
		key?: string
};

const data = [
  { label: "PENDING", value: "pending" },
  { label: "APPROVED", value: "approved" },
  { label: "REJECTED", value: "rejected" },
];

const SelectStatus = (props: PropType) => {
  const {
				key,
  } = props;

		const [searchParams, setSearchParams] = useSearchParams();
  const selectHandler = (value: string) => {
			searchParams.set("status"+(key || ""), value)
			setSearchParams(searchParams)
		}
  return (
    <SelectPicker
      data={data}
      name="status"
      value={searchParams.get("status"+(key || "")) || ''}
      onChange={(value) => selectHandler(value || '')}
      placeholder={"Select Status"}
      style={{ minWidth: "150px" }}
    />
  );
};

export default SelectStatus;
