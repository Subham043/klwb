import { Panel, Stack, HeadingGroup, Heading, Text, useMediaQuery } from "rsuite"
import { StudentApplicationType } from "../../../utils/types";
import classes from './index.module.css';
import FileViewer from "../../FileViewer";

type Props = {
	data: StudentApplicationType;
}

function CasteInfo({ data }: Props) {
	const [isMobile] = useMediaQuery('(max-width: 700px)');
	return (
		<div className="mb-1">
		<Panel header={
			<div className="text-center">
				<h5 className={classes.inner_main_heading}>Scheduled Caste / Scheduled Tribes? Certificate</h5>
			</div>
		} className='info-modal-panel' bordered>
			<Stack alignItems="flex-start" direction={isMobile ? 'column' : 'row'} spacing={10} className='info-modal-stack'>
				<HeadingGroup className='mb-1'>
					<Heading level={6} className='info-heading'>Scheduled Caste / Scheduled Tribes</Heading>
					<Text>{data?.basic_detail.is_scst.toString()==="false" ? "NO" : "YES"}</Text>
				</HeadingGroup>
				<HeadingGroup className='mb-1'>
					<Heading level={6} className='info-heading'>Category</Heading>
					<Text>{data?.basic_detail.category}</Text>
				</HeadingGroup>
				{data?.basic_detail.is_scst.toString()==="true" ? <HeadingGroup className='mb-1'>
					<Heading level={6} className='info-heading'>Caste Certificate Number</Heading>
					<Text>{data?.basic_detail.cast_no}</Text>
				</HeadingGroup> : <div></div>}
			</Stack>
			{(data?.basic_detail.cast_certificate && data?.basic_detail.is_scst.toString()==="true") && <Stack alignItems="flex-start" direction={isMobile ? 'column' : 'row'} spacing={10} className='info-modal-stack'>
				<HeadingGroup className='mb-1'>
					<Heading level={6} className='info-heading'>Caste Certificate</Heading>
					<FileViewer src={data?.basic_detail.cast_certificate} />
				</HeadingGroup>
			</Stack>}
		</Panel>
		</div>
	)
}

export default CasteInfo