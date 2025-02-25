import { Divider, Stack } from "rsuite";
import classes from './index.module.css';
import { StudentApplicationType } from "../../../utils/types";
import StudentInfo from "./StudentInfo";
import MarkInfo from "./MarkInfo";
import CasteInfo from "./CasteInfo";
import IndustryInfo from "./IndustryInfo";
import AadharInfo from "./AadharInfo";
import BankInfo from "./BankInfo";
import ConfirmationReport from "./ConfirmationReport";
import PanelCardContainer from "../../MainCards/PanelCardContainer";
import { useUser } from "../../../hooks/useUser";
import { RolesEnum } from "../../../utils/constants/role";
import NoteInfo from "./NoteInfo";
import Contribution from "../../Admin/RegisteredIndustryInfo/Contribution";
import StudentLoginInfo from "./StudentLoginInfo";

type Props = {
	data: StudentApplicationType | null;
	refetch?: () => void;
}

export default function ScholarshipInfo({ data, refetch }: Props) {
	const {user} = useUser();
	return <div className="data-table-container">
	<PanelCardContainer
		header={
			<Stack justifyContent="center" alignItems="center">
				<div className="text-center">
					<h1 className={classes.main_heading}>Online Scholarship Application Form</h1>
					<h6 className={classes.main_sub_heading}>ಸಂಘಟಿತ ಕಾರ್ಮಿಕ ಮಕ್ಕಳಿಂದ ಶೈಕ್ಷಣಿಕ ಪ್ರೋತ್ಸಾಹ ಧನ ಸಹಾಯಕ್ಕಾಗಿ ಅರ್ಜಿ</h6>
					{(user && (user.role == RolesEnum.ADMIN || user.role === RolesEnum.SUPER_ADMIN || user.role === RolesEnum.VERIFICATION_OFFICER || user.role === RolesEnum.FINANCIAL_OFFICER || user.role === RolesEnum.PAYMENT_OFFICER)) && <p className={classes.main_sub_text}>{data?.resubmitted_status ? 'Resubmitted Application' : 'Fresh Application'}</p>}
				</div>
			</Stack>
		}
	>
		<Divider />
		{data && <>
			{(user && (user.role == RolesEnum.ADMIN || user.role === RolesEnum.SUPER_ADMIN || user.role === RolesEnum.VERIFICATION_OFFICER)) && <NoteInfo data={data} refetch={refetch} />}
			<StudentInfo data={data} refetch={refetch} />
			<MarkInfo data={data} />
			<CasteInfo data={data} />
			<IndustryInfo data={data} refetch={refetch} />
			<AadharInfo data={data} />
			<BankInfo data={data} />
			{(user && (user.role == RolesEnum.VERIFICATION_OFFICER || user.role === RolesEnum.FINANCIAL_OFFICER || user.role === RolesEnum.STUDENT)) && <ConfirmationReport data={data} />}
			{(user && data.student && (user.role == RolesEnum.VERIFICATION_OFFICER || user.role == RolesEnum.ADMIN || user.role === RolesEnum.SUPER_ADMIN)) && <StudentLoginInfo data={data} />}
			{(user && data.company_id && (user.role == RolesEnum.ADMIN || user.role === RolesEnum.SUPER_ADMIN)) && <Contribution id={data.company_id} />}
		</>}
	</PanelCardContainer>
</div>
}