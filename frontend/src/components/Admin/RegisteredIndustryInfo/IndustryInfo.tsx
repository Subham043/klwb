import ErrorBoundaryLayout from "../../../layouts/ErrorBoundaryLayout";
import { useToast } from "../../../hooks/useToast";
import { useAxios } from "../../../hooks/useAxios";
import { useState } from "react";
import { useRegisteredIndustryQuery } from "../../../hooks/data/registered_industry";
import { api_routes } from "../../../utils/routes/api";
import { Button, ButtonToolbar, Col, Grid, Heading, Panel, Row, Stack } from "rsuite";
import Status from "../../Status";
import Moment from "../../Moment";
import { VerificationEnum } from "../../../utils/constants/verified";
import IndustryInfoUpdate from "./IndustryInfoUpdate";
import IndustryAuthUpdate from "./IndustryAuthUpdate";
import FileViewer from "../../FileViewer";
import DetailInfo from "../../DetailInfo";

type Props = {
	id: number;
}

export default function IndustryInfo({ id }: Props) {
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
						<Grid fluid>
							<Row gutter={30}>
									<Col className="pb-1" xs={8}>
											<DetailInfo title="Name" value={data?.industry.name} />
									</Col>
									<Col className="pb-1" xs={8}>
											<DetailInfo title="Reg. ID" value={data?.industry.reg_id} />
									</Col>
									<Col className="pb-1" xs={8}>
											<DetailInfo title="Act" value={data?.industry.act_label} />
									</Col>
									<Col className="pb-1" xs={8}>
											<DetailInfo title="Address" value={data?.address} />
									</Col>
									<Col className="pb-1" xs={8}>
											<DetailInfo title="District" value={data?.city.name} />
									</Col>
									<Col className="pb-1" xs={8}>
											<DetailInfo title="Taluq" value={data?.taluq.name} />
									</Col>
									<Col className="pb-1" xs={8}>
											<DetailInfo title="Industry Reg. File" value={<FileViewer src={data?.reg_doc} />} />
									</Col>
									<Col className="pb-1" xs={8}>
											<DetailInfo title="Director Signature" value={<FileViewer src={data?.sign} />} />
									</Col>
									<Col className="pb-1" xs={8}>
											<DetailInfo title="Industry Seal" value={<FileViewer src={data?.seal} />} />
									</Col>
							</Row>
						</Grid>
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
						<Grid fluid>
							<Row gutter={30}>
									<Col className="pb-1" xs={8}>
											<DetailInfo title="Director Name" value={data?.name} />
									</Col>
									<Col className="pb-1" xs={8}>
											<DetailInfo title="Email" value={data?.email} />
									</Col>
									<Col className="pb-1" xs={8}>
											<DetailInfo title="Phone" value={data?.phone} />
									</Col>
									<Col className="pb-1" xs={8}>
											<DetailInfo title="Verification" value={<Status status={data?.verified === VerificationEnum.VERIFIED} wrongLabel={VerificationEnum.VERIFICATION_PENDING} correctLabel={VerificationEnum.VERIFIED} />} />
									</Col>
									<Col className="pb-1" xs={8}>
											<DetailInfo title="Status" value={<Status status={!data?.is_blocked} wrongLabel="Blocked" />} />
									</Col>
									<Col className="pb-1" xs={8}>
											<DetailInfo title="Registered On" value={<Moment datetime={data?.created_at || ''} />} />
									</Col>
							</Row>
						</Grid>
				</Panel>
			</div>
			<IndustryInfoUpdate modal={industryUpdateModal} setModal={setIndustryUpdateModal} data={data} refetch={refetchData} error={error} loading={(isFetching || isLoading || isRefetching)} />
			<IndustryAuthUpdate modal={industryAuthModal} setModal={setIndustryAuthModal} data={data} refetch={refetchData} error={error} loading={(isFetching || isLoading || isRefetching)} />
		</ErrorBoundaryLayout>
	)
}
