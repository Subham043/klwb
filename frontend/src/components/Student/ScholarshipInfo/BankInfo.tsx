import { Panel, Stack, HeadingGroup, Heading, Text, useMediaQuery } from "rsuite"
import { StudentApplicationType } from "../../../utils/types";
import classes from './index.module.css';

type Props = {
	data: StudentApplicationType;
}

function BankInfo({ data }: Props) {
	const [isMobile] = useMediaQuery('(max-width: 700px)');
	return (
		<div className="mb-1">
		<Panel header={
			<div className="text-center">
				<h5 className={classes.inner_main_heading}>Bank Details</h5>
			</div>
		} className='info-modal-panel' bordered>
			<Stack alignItems="flex-start" direction={isMobile ? 'column' : 'row'} spacing={10} className='info-modal-stack'>
				<HeadingGroup className='mb-1'>
					<Heading level={6} className='info-heading'>Bank name</Heading>
					<Text>{data?.account.bank_name}</Text>
				</HeadingGroup>
				<HeadingGroup className='mb-1'>
					<Heading level={6} className='info-heading'>Branch Name</Heading>
					<Text>{data?.account.branch}</Text>
				</HeadingGroup>
				<HeadingGroup className='mb-1'>
					<Heading level={6} className='info-heading'>Account Type</Heading>
					<Text>{data?.account.type.toString()==="1" ? "Parent" : "Student"}</Text>
				</HeadingGroup>
			</Stack>
			<Stack alignItems="flex-start" direction={isMobile ? 'column' : 'row'} spacing={10} className='info-modal-stack'>
				<HeadingGroup className='mb-1'>
					<Heading level={6} className='info-heading'>Account Holder name</Heading>
					<Text>{data?.account.holder}</Text>
				</HeadingGroup>
				<HeadingGroup className='mb-1'>
					<Heading level={6} className='info-heading'>Account Number</Heading>
					<Text>{data?.account.acc_no}</Text>
				</HeadingGroup>
				<HeadingGroup className='mb-1'>
					<Heading level={6} className='info-heading'>IFSC Code No</Heading>
					<Text>{data?.account.ifsc}</Text>
				</HeadingGroup>
			</Stack>
			{data?.account.passbook && <Stack alignItems="flex-start" direction={isMobile ? 'column' : 'row'} spacing={10} className='info-modal-stack'>
				<HeadingGroup className='mb-1'>
					<Heading level={6} className='info-heading'>Passbook Front Page Copy</Heading>
					<img src={data?.account.passbook} alt="" style={{objectFit: 'contain', height: '100px'}} />
				</HeadingGroup>
			</Stack>}
		</Panel>
		</div>
	)
}

export default BankInfo