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
import MainCardContainer from "../../MainCards/MainCardContainer";

type Props = {
	data: StudentApplicationType | null;
}

export default function ScholarshipInfo({ data }: Props) {
	return <div className="data-table-container">
	<MainCardContainer
		header={
			<Stack justifyContent="center" alignItems="center">
				<div className="text-center">
					<h1 className={classes.main_heading}>Online Scholarship Application Form</h1>
					<h6 className={classes.main_sub_heading}>ಸಂಘಟಿತ ಕಾರ್ಮಿಕ ಮಕ್ಕಳಿಂದ ಶೈಕ್ಷಣಿಕ ಪ್ರೋತ್ಸಾಹ ಧನ ಸಹಾಯಕ್ಕಾಗಿ ಅರ್ಜಿ</h6>
				</div>
			</Stack>
		}
	>
		<Divider />
		{data && <>
			<StudentInfo data={data} />
			<MarkInfo data={data} />
			<CasteInfo data={data} />
			<IndustryInfo data={data} />
			<AadharInfo data={data} />
			<BankInfo data={data} />
			<ConfirmationReport />
		</>}
	</MainCardContainer>
</div>
}