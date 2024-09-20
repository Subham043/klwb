import {
	Button,
	ButtonToolbar,
	Input,
	InputGroup,
	Pagination,
	Stack,
	Table,
} from "rsuite";
import { useExcelExport } from "../../../hooks/useExcelExport";
import { usePaginationQueryParam } from "../../../hooks/usePaginationQueryParam";
import { useSearchQueryParam } from "../../../hooks/useSearchQueryParam";
import ErrorBoundaryLayout from "../../../layouts/ErrorBoundaryLayout";
import ModalCardContainer from "../../MainCards/ModalCardContainer";
import SearchIcon from "@rsuite/icons/Search";
import { table } from "../../../utils/constants/table";
import { api_routes } from "../../../utils/routes/api";
import Moment from "../../Moment";
import { ViewLink } from "../../Buttons/ViewBtn";
import { page_routes } from "../../../utils/routes/pages";
import { useRegisteredIndustriesScholarshipQuery } from "../../../hooks/data/registered_industry";
import StatusBadge from "../../Student/StatusBadge";
import ApplicationStateBadge from "../../Student/ApplicationStateBadge";

export type Props = {
	id: number;
};

export default function Scholarship({ id }: Props) {
	const { search, searchHandler } = useSearchQueryParam("_scholarship");
	const { page, pageHandler, limit, limitHandler } =
			usePaginationQueryParam("_scholarship");
	const {
			data: scholarships,
			isFetching: isScholarshipFetching,
			isLoading: isScholarshipLoading,
			isRefetching: isScholarshipRefetching,
			error,
			refetch: refetchData,
	} = useRegisteredIndustriesScholarshipQuery(Number(id) || 0);
	const { excelLoading, exportExcel } = useExcelExport();

	const excelHandler = async () => {
			await exportExcel(
					api_routes.admin.registered_industry.scholarship.excel(Number(id)),
					"registered_industry_scholarships.xlsx"
			);
	};

	return (
			<div className="mb-1">
					<ErrorBoundaryLayout error={error} refetch={refetchData}>
							<ModalCardContainer header="Scholarship Information">
									<div className="mb-1">
											<Stack justifyContent="space-between">
													<ButtonToolbar>
															<Button
																	appearance="default"
																	active
																	loading={excelLoading}
																	onClick={excelHandler}
															>
																	Export Excel
															</Button>
													</ButtonToolbar>
													<InputGroup size="md" inside>
															<Input
																	placeholder="Search"
																	defaultValue={search}
																	onChange={searchHandler}
															/>
															<InputGroup.Button>
																	<SearchIcon />
															</InputGroup.Button>
													</InputGroup>
											</Stack>
									</div>
									<Table
											loading={isScholarshipLoading || isScholarshipFetching || isScholarshipRefetching}
											{...table}
											data={scholarships?.data || []}
									>
											<Table.Column width={60} align="center" fixed>
													<Table.HeaderCell>Id</Table.HeaderCell>
													<Table.Cell dataKey="id" />
											</Table.Column>

											<Table.Column width={260}>
													<Table.HeaderCell>Name</Table.HeaderCell>
													<Table.Cell dataKey="basic_detail.name" />
											</Table.Column>

											<Table.Column width={260}>
													<Table.HeaderCell>Institute</Table.HeaderCell>
													<Table.Cell dataKey="present_institute_name" />
											</Table.Column>

											<Table.Column width={260}>
													<Table.HeaderCell>Industry</Table.HeaderCell>
													<Table.Cell dataKey="industry_name" />
											</Table.Column>

											<Table.Column width={260}>
													<Table.HeaderCell>Graduation</Table.HeaderCell>
													<Table.Cell dataKey="mark.graduation.name" />
											</Table.Column>

											<Table.Column width={160}>
													<Table.HeaderCell>Course</Table.HeaderCell>
													<Table.Cell dataKey="mark.course.name" />
											</Table.Column>

											<Table.Column width={160}>
													<Table.HeaderCell>Class</Table.HeaderCell>
													<Table.Cell dataKey="mark.class.name" />
											</Table.Column>

											<Table.Column width={160} verticalAlign="middle">
													<Table.HeaderCell>Amount</Table.HeaderCell>

													<Table.Cell style={{ padding: "6px" }}>
															{(rowData) => (
																	<span>{rowData?.scholarship_fee?.amount || 0}</span>
															)}
													</Table.Cell>
											</Table.Column>

											<Table.Column width={160}>
													<Table.HeaderCell>Year</Table.HeaderCell>
													<Table.Cell dataKey="application_year" />
											</Table.Column>

											<Table.Column width={160} verticalAlign="middle">
													<Table.HeaderCell>Application State</Table.HeaderCell>

													<Table.Cell style={{ padding: "6px" }}>
															{(rowData) => (
																	<ApplicationStateBadge
																			application_state={rowData?.application_state}
																	/>
															)}
													</Table.Cell>
											</Table.Column>

											<Table.Column width={160} verticalAlign="middle">
													<Table.HeaderCell>Status</Table.HeaderCell>

													<Table.Cell style={{ padding: "6px" }}>
															{(rowData) => <StatusBadge status={rowData?.status} />}
													</Table.Cell>
											</Table.Column>

											<Table.Column width={250} verticalAlign="middle">
													<Table.HeaderCell>Applied On</Table.HeaderCell>

													<Table.Cell style={{ padding: "6px" }}>
															{(rowData) => <Moment datetime={rowData.date} />}
													</Table.Cell>
											</Table.Column>

											<Table.Column width={100} fixed="right">
													<Table.HeaderCell>Action</Table.HeaderCell>

													<Table.Cell style={{ padding: "6px" }}>
															{(rowData) => (
																	<ButtonToolbar>
																			<ViewLink
																					to={page_routes.industry.scholarship.view(rowData.id)}
																			/>
																	</ButtonToolbar>
															)}
													</Table.Cell>
											</Table.Column>
									</Table>
									<div className="mt-1">
											<Pagination
													prev
													next
													first
													last
													ellipsis
													boundaryLinks
													maxButtons={5}
													size="sm"
													layout={["total", "-", "limit", "|", "pager", "skip"]}
													total={scholarships?.meta.total || 0}
													limitOptions={[10, 30, 50]}
													limit={Number(limit)}
													activePage={Number(page)}
													onChangePage={pageHandler}
													onChangeLimit={limitHandler}
											/>
									</div>
							</ModalCardContainer>
					</ErrorBoundaryLayout>
			</div>
	);
}
