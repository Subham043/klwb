import { useSearchParams } from "react-router-dom";
import { SelectPicker } from "rsuite";
import { useUser } from "../../../hooks/useUser";
import { RolesEnum } from "../../../utils/constants/role";

type PropType = {
  key?: string;
};

const data = [
  { label: "PENDING", value: "pending" },
  { label: "APPROVED", value: "approved" },
  { label: "REJECTED", value: "rejected" },
];

const SelectStatus = (props: PropType) => {
  const { key } = props;
  const {user} = useUser();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectHandler = (value: string) => {
    searchParams.set("status" + (key || ""), value);
    setSearchParams(searchParams);
  };
  return (
    <SelectPicker
      data={(user && (user.role == RolesEnum.ADMIN || user.role === RolesEnum.SUPER_ADMIN || user.role === RolesEnum.VERIFICATION_OFFICER)) ? [...data, { label: "PAYMENT PROCESSED", value: "payment_processed" }] : data}
      name="status"
      value={searchParams.get("status" + (key || "")) || ""}
      onChange={(value) => selectHandler(value || "")}
      placeholder={"Select Status"}
      style={{ minWidth: "150px" }}
    />
  );
};

export default SelectStatus;
