import {
	Button,
	ButtonToolbar,
	Col,
	Heading,
	HeadingGroup,
	Panel,
	Row,
	Stack,
	Text,
	useMediaQuery,
} from "rsuite";
import { useIndustryAccountQuery } from "../../../../hooks/data/profile";
import ErrorBoundaryLayout from "../../../../layouts/ErrorBoundaryLayout";
import FileUploader from "../../../FileUploader";
import { api_routes } from "../../../../utils/routes/api";
import { useState } from "react";
import AccountInfoUpdate from "./AccountInfoUpdate";
import { useUser } from "../../../../hooks/useUser";
import { RolesEnum } from "../../../../utils/constants/role";

export default function IndustryDashboardAccountInfo() {
	const [isMobile] = useMediaQuery("(max-width: 700px)");
	const [instituteUpdateModal, setIndustryUpdateModal] = useState<boolean>(false);
	const {user} = useUser();
	const {
			data: account_info,
			isLoading: isAccountLoading,
			isFetching: isAccountFetching,
			isRefetching: isAccountRefetching,
			refetch: accountRefetch,
			error: accountError,
	} = useIndustryAccountQuery(true);

	return (
			<div>
					<ErrorBoundaryLayout
							loading={isAccountRefetching || isAccountLoading || isAccountFetching}
							error={accountError}
							refetch={accountRefetch}
					>
							<div className="mt-1">
									<Panel
											header={
													<Stack justifyContent={(user && user.role === RolesEnum.INDUSTRY) ? "space-between" : "center"}>
															<Heading level={6} style={{ color: "white" }}>
																	Industry Information
															</Heading>
															{(user && user.role === RolesEnum.INDUSTRY) && <ButtonToolbar>
																	<Button appearance="primary" color="green" size="sm" onClick={() => setIndustryUpdateModal(true)}>
																			Edit
																	</Button>
															</ButtonToolbar>}
													</Stack>
											}
											className="info-modal-panel"
											bordered
											style={{ backgroundColor: "white" }}
									>
											<Stack
													alignItems="flex-start"
													direction={isMobile ? "column" : "row"}
													spacing={10}
													className="info-modal-stack"
											>
													<HeadingGroup className="mb-1">
															<Heading level={6} className="info-heading">
																	Industry Name
															</Heading>
															<Text>{account_info?.registered_industry.name}</Text>
													</HeadingGroup>
													<HeadingGroup className="mb-1">
															<Heading level={6} className="info-heading">
																	Industry Reg. No.
															</Heading>
															<Text>{account_info?.registered_industry.reg_id}</Text>
													</HeadingGroup>
													<HeadingGroup className="mb-1">
															<Heading level={6} className="info-heading">
																	Director Name
															</Heading>
															<Text>{account_info?.name}</Text>
													</HeadingGroup>
											</Stack>
											<Stack
													alignItems="flex-start"
													direction={isMobile ? "column" : "row"}
													spacing={10}
													className="info-modal-stack"
											>
													<HeadingGroup className="mb-1">
															<Heading level={6} className="info-heading">
																	Email
															</Heading>
															<Text>{account_info?.email}</Text>
													</HeadingGroup>
													<HeadingGroup className="mb-1">
															<Heading level={6} className="info-heading">
																	Phone
															</Heading>
															<Text>{account_info?.phone}</Text>
													</HeadingGroup>
													<HeadingGroup className="mb-1">
															<Heading level={6} className="info-heading">
																	Pincode
															</Heading>
															<Text>{account_info?.registered_industry.pincode}</Text>
													</HeadingGroup>
											</Stack>
											<Stack
													alignItems="flex-start"
													direction={isMobile ? "column" : "row"}
													spacing={10}
													className="info-modal-stack"
											>
													<HeadingGroup className="mb-1">
															<Heading level={6} className="info-heading">
																	GST No.
															</Heading>
															<Text>{account_info?.gst_no}</Text>
													</HeadingGroup>
													<HeadingGroup className="mb-1">
															<Heading level={6} className="info-heading">
																	PAN No.
															</Heading>
															<Text>{account_info?.pan_no}</Text>
													</HeadingGroup>
													<HeadingGroup className="mb-1">
															<Heading level={6} className="info-heading">
																	District
															</Heading>
															<Text>{account_info?.city.name}</Text>
													</HeadingGroup>
											</Stack>
											<Stack
													alignItems="flex-start"
													direction={isMobile ? "column" : "row"}
													spacing={10}
													className="info-modal-stack"
											>
													<HeadingGroup className="mb-1">
															<Heading level={6} className="info-heading">
																	Taluq
															</Heading>
															<Text>{account_info?.taluq.name}</Text>
													</HeadingGroup>
													<HeadingGroup className="mb-1">
															<Heading level={6} className="info-heading">
																	Address
															</Heading>
															<Text>{account_info?.address}</Text>
													</HeadingGroup>
													<div></div>
											</Stack>
									</Panel>
							</div>
							<div className="mt-1">
									<Row gutter={30}>
											<Col xs={8}>
													<Panel
															header={
																	<Stack justifyContent="center">
																			<Heading level={6} style={{ color: "white" }}>
																					Industry Registration File
																			</Heading>
																	</Stack>
															}
															className="info-modal-panel"
															bordered
															style={{ backgroundColor: "white" }}
													>
														<FileUploader src={account_info?.reg_doc} name="reg_doc" apiRoute={api_routes.industry.account.doc_update} refetch={accountRefetch} allowed={(user && user.role === RolesEnum.INDUSTRY) ? true : false} />
													</Panel>
											</Col>
											<Col xs={8}>
													<Panel
															header={
																	<Stack justifyContent="center">
																			<Heading level={6} style={{ color: "white" }}>
																					Director Signature
																			</Heading>
																	</Stack>
															}
															className="info-modal-panel"
															bordered
															style={{ backgroundColor: "white" }}
													>
														<FileUploader src={account_info?.sign} name="sign" apiRoute={api_routes.industry.account.doc_update} refetch={accountRefetch} allowed={(user && user.role === RolesEnum.INDUSTRY) ? true : false} />
													</Panel>
											</Col>
											<Col xs={8}>
													<Panel
															header={
																	<Stack justifyContent="center">
																			<Heading level={6} style={{ color: "white" }}>
																					Industry Seal
																			</Heading>
																	</Stack>
															}
															className="info-modal-panel"
															bordered
															style={{ backgroundColor: "white" }}
													>
														<FileUploader src={account_info?.seal} name="seal" apiRoute={api_routes.industry.account.doc_update} refetch={accountRefetch} allowed={(user && user.role === RolesEnum.INDUSTRY) ? true : false} />
													</Panel>
											</Col>
									</Row>
							</div>
							<div className="mt-1">
									<Row gutter={30}>
											<Col xs={8}>
													<Panel
															header={
																	<Stack justifyContent="center">
																			<Heading level={6} style={{ color: "white" }}>
																					GSTIN Certificate
																			</Heading>
																	</Stack>
															}
															className="info-modal-panel"
															bordered
															style={{ backgroundColor: "white" }}
													>
														<FileUploader src={account_info?.gst} name="gst" apiRoute={api_routes.industry.account.doc_update} refetch={accountRefetch} allowed={(user && user.role === RolesEnum.INDUSTRY) ? true : false} />
													</Panel>
											</Col>
											<Col xs={8}>
													<Panel
															header={
																	<Stack justifyContent="center">
																			<Heading level={6} style={{ color: "white" }}>
																					PAN Card
																			</Heading>
																	</Stack>
															}
															className="info-modal-panel"
															bordered
															style={{ backgroundColor: "white" }}
													>
														<FileUploader src={account_info?.pan} name="pan" apiRoute={api_routes.industry.account.doc_update} refetch={accountRefetch} allowed={(user && user.role === RolesEnum.INDUSTRY) ? true : false} />
													</Panel>
											</Col>
									</Row>
							</div>
							{(user && user.role === RolesEnum.INDUSTRY) && <AccountInfoUpdate modal={instituteUpdateModal} setModal={setIndustryUpdateModal} data={account_info} refetch={accountRefetch} error={accountError} loading={(isAccountRefetching || isAccountLoading || isAccountFetching)} />}
					</ErrorBoundaryLayout>
			</div>
	);
}
