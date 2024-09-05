import { useMediaQuery } from "rsuite/esm/useMediaQuery/useMediaQuery";
import ErrorBoundaryLayout from "../../../layouts/ErrorBoundaryLayout";
import { useToast } from "../../../hooks/useToast";
import { useAxios } from "../../../hooks/useAxios";
import { useState } from "react";
import { useRegisteredIndustryQuery } from "../../../hooks/data/registered_industry";
import { api_routes } from "../../../utils/routes/api";
import { Button, ButtonToolbar, Heading, HeadingGroup, Panel, Stack, Text } from "rsuite";
import Status from "../../Status";
import Moment from "../../Moment";
import { VerificationEnum } from "../../../utils/constants/verified";
import IndustryInfoUpdate from "./IndustryInfoUpdate";
import IndustryAuthUpdate from "./IndustryAuthUpdate";
import FileViewer from "../../FileViewer";

type Props = {
	id: number;
}

export default function IndustryInfo({ id }: Props) {
	const [isMobile] = useMediaQuery('(max-width: 700px)');
	const { toastError, toastSuccess } = useToast();
	const axios = useAxios();
	const { data, isFetching, isLoading, isRefetching, refetch: refetchData, error } = useRegisteredIndustryQuery(Number(id) || 0, true);
	const [toggleLoading, setToggleLoading] = useState<boolean>(false);
	const [industryUpdateModal, setIndustryUpdateModal] = useState<boolean>(false);
	const [industryAuthModal, setIndustryAuthModal] = useState<boolean>(false);

	const toggleStatus = async () => {
		setToggleLoading(true);
		try {
			const response = await axios.get(api_routes.admin.registered_industry.toggle(Number(id) || 0));
			toastSuccess(response.data.message);
			refetchData();
		} catch (error) {
			toastError("Failed to toggle status");
		} finally {
			setToggleLoading(false);
		}
	}
	return (
		<ErrorBoundaryLayout loading={(isFetching || isLoading || isRefetching)} error={error} refetch={refetchData}>
			<div className="mb-1">
				<Panel
					header={
						<Stack justifyContent="space-between">
							<Heading level={6} style={{ color: 'white' }}>Industry Information</Heading>
							<ButtonToolbar>
								<Button appearance="primary" color="cyan" size="sm" onClick={() => setIndustryUpdateModal(true)}>Edit</Button>
								<Button appearance="primary" color="orange" size="sm" onClick={toggleStatus} disabled={toggleLoading} loading={toggleLoading} >{data?.is_blocked ? "Unblock" : "Block"}</Button>
							</ButtonToolbar>
						</Stack>
					}
					className='info-modal-panel'
					bordered>
					<Stack alignItems="flex-start" direction={isMobile ? 'column' : 'row'} spacing={10} className='info-modal-stack'>
						<HeadingGroup className='mb-1'>
							<Heading level={6} className='info-heading'>Name</Heading>
							<Text>{data?.industry.name}</Text>
						</HeadingGroup>
						<HeadingGroup className='mb-1'>
							<Heading level={6} className='info-heading'>Reg. ID</Heading>
							<Text>{data?.industry.reg_id}</Text>
						</HeadingGroup>
						<HeadingGroup className='mb-1'>
							<Heading level={6} className='info-heading'>Act</Heading>
							<Text>{data?.industry.act_label}</Text>
						</HeadingGroup>
					</Stack>
					<Stack alignItems="flex-start" direction={isMobile ? 'column' : 'row'} spacing={10} className='info-modal-stack'>
						<HeadingGroup className='mb-1'>
							<Heading level={6} className='info-heading'>Address</Heading>
							<Text>{data?.address}</Text>
						</HeadingGroup>
						<HeadingGroup className='mb-1'>
							<Heading level={6} className='info-heading'>District</Heading>
							<Text>{data?.city.name}</Text>
						</HeadingGroup>
						<HeadingGroup className='mb-1'>
							<Heading level={6} className='info-heading'>Taluq</Heading>
							<Text>{data?.taluq.name}</Text>
						</HeadingGroup>
					</Stack>
					<Stack alignItems="flex-start" direction={isMobile ? 'column' : 'row'} spacing={10} className='info-modal-stack'>
						<HeadingGroup className='mb-1'>
							<Heading level={6} className='info-heading'>Industry Reg. File</Heading>
							<FileViewer src={data?.reg_doc} />
						</HeadingGroup>
						<HeadingGroup className='mb-1'>
							<Heading level={6} className='info-heading'>Director Signature</Heading>
							<FileViewer src={data?.seal} />
						</HeadingGroup>
						<HeadingGroup className='mb-1'>
							<Heading level={6} className='info-heading'>Industry Seal</Heading>
							<FileViewer src={data?.seal} />
						</HeadingGroup>
					</Stack>
				</Panel>
			</div>
			<div className="mb-1">
				<Panel
					header={
						<Stack justifyContent="space-between">
							<Heading level={6} style={{ color: 'white' }}>Login Information</Heading>
							<Button appearance="primary" color="cyan" size="sm" onClick={() => setIndustryAuthModal(true)}>Edit</Button>
						</Stack>
					}
					className='info-modal-panel'
					bordered>
					<Stack alignItems="flex-start" direction={isMobile ? 'column' : 'row'} spacing={10} className='info-modal-stack'>
						<HeadingGroup className='mb-1'>
							<Heading level={6} className='info-heading'>Director Name</Heading>
							<Text>{data?.name}</Text>
						</HeadingGroup>
						<HeadingGroup className='mb-1'>
							<Heading level={6} className='info-heading'>Email</Heading>
							<Text>{data?.email}</Text>
						</HeadingGroup>
						<HeadingGroup className='mb-1'>
							<Heading level={6} className='info-heading'>Phone</Heading>
							<Text>{data?.phone}</Text>
						</HeadingGroup>
					</Stack>
					<Stack alignItems="flex-start" direction={isMobile ? 'column' : 'row'} spacing={10} className='info-modal-stack'>
						<HeadingGroup className='mb-1'>
							<Heading level={6} className='info-heading'>Verification</Heading>
							<Status status={data?.verified === VerificationEnum.VERIFIED} wrongLabel={VerificationEnum.VERIFICATION_PENDING} correctLabel={VerificationEnum.VERIFIED} />
						</HeadingGroup>
						<HeadingGroup className='mb-1'>
							<Heading level={6} className='info-heading'>Status</Heading>
							<Status status={!data?.is_blocked} wrongLabel="Blocked" />
						</HeadingGroup>
						<HeadingGroup className='mb-1'>
							<Heading level={6} className='info-heading'>Registered On</Heading>
							<Text><Moment datetime={data?.created_at || ''} /></Text>
						</HeadingGroup>
					</Stack>
				</Panel>
			</div>
			<IndustryInfoUpdate modal={industryUpdateModal} setModal={setIndustryUpdateModal} data={data} refetch={refetchData} error={error} loading={(isFetching || isLoading || isRefetching)} />
			<IndustryAuthUpdate modal={industryAuthModal} setModal={setIndustryAuthModal} data={data} refetch={refetchData} error={error} loading={(isFetching || isLoading || isRefetching)} />
		</ErrorBoundaryLayout>
	)
}
