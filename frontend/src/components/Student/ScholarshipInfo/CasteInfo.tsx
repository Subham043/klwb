import { Panel, Grid, Row, Col } from "rsuite"
import { StudentApplicationType } from "../../../utils/types";
import classes from './index.module.css';
import FileViewer from "../../FileViewer";
import DetailInfo from "../../DetailInfo";

type Props = {
	data: StudentApplicationType;
}

function CasteInfo({ data }: Props) {
	return (
		<div className="mb-1">
		<Panel header={
			<div className="text-center">
				<h5 className={classes.inner_main_heading}>Scheduled Caste / Scheduled Tribes? Certificate</h5>
			</div>
		} className='info-modal-panel' bordered>
			<Grid fluid>
				<Row gutter={30}>
					<Col className="pb-1" xs={8}>
							<DetailInfo title="Scheduled Caste / Scheduled Tribes" value={data?.basic_detail.is_scst.toString()==="false" ? "NO" : "YES"} />
					</Col>
					<Col className="pb-1" xs={8}>
							<DetailInfo title="Category" value={data?.basic_detail.category} />
					</Col>
					{data?.basic_detail.is_scst.toString()==="true" && <Col className="pb-1" xs={8}>
							<DetailInfo title="Caste Certificate Number" value={data?.basic_detail.cast_no} />
					</Col>}
					{(data?.basic_detail.cast_certificate && data?.basic_detail.is_scst.toString()==="true") && <Col className="pb-1" xs={8}>
							<DetailInfo title="Caste Certificate" value={<FileViewer src={data?.basic_detail.cast_certificate} />} />
					</Col>}
				</Row>
			</Grid>
		</Panel>
		</div>
	)
}

export default CasteInfo