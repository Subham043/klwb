import { FC, useState } from "react"
import { Button, ButtonToolbar, Checkbox, IconButton, Table, Tooltip, Whisper } from "rsuite"
import PaginatedTableLayout from "../../../layouts/PaginatedTable";
import Moment from "../../../components/Moment";
import { page_routes } from "../../../utils/routes/pages";
import { useFinanceScholarshipListQuery } from "../../../hooks/data/finance_scholarship";
import { table } from "../../../utils/constants/table";
import { ViewLink } from "../../../components/Buttons/ViewBtn";
import StatusBadge from "../../../components/Institute/StatusBadge";
import ApplicationFilter from "../../../components/ApplicationFilter";
import { api_routes } from "../../../utils/routes/api";
import PaymentStatusBadge from "../../../components/PaymentStatusBadge";
import CheckIcon from '@rsuite/icons/Check';
import CloseIcon from '@rsuite/icons/Close';
import { useToast } from "../../../hooks/useToast";
import { useAxios } from "../../../hooks/useAxios";
import { isAxiosError } from "axios";
import { AxiosErrorResponseType } from "../../../utils/types";
import FinanceScholarshipRejectForm from "../../../components/Finance/RejectModal";
import { useSearchParams } from "react-router-dom";
import ConfirmAlert from "../../../components/ConfirmAlert";


const FinanceScholarshipListPage: FC = () => {
    const { data, isLoading, isFetching, isRefetching, refetch, error } = useFinanceScholarshipListQuery();
    const [openDrawer, setOpenDrawer] = useState<boolean>(false);
    const [approveLoading, setApproveLoading] = useState<boolean>(false);
    const [modal, setModal] = useState<{ open: boolean; id: number }>({
        open: false,
        id: 0,
    });
    const { toastError, toastSuccess } = useToast();
    const axios = useAxios();
    const [searchParams] = useSearchParams();
    const [checkedValue, setCheckedValue] = useState<number[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    
    const onMultipleApproveHandler = async () => {
        setLoading(true);
        try {
            await axios.post(
            api_routes.finance.scholarship.approve_multiple,
            {
                id: checkedValue,
            }
            );
            toastSuccess("Approved Successfully");
            setCheckedValue([]);
            refetch();
        } catch (error) {
            toastError("Error Approving. Please try again later");
        } finally {
            setLoading(false);
        }
    };

    const onApproveHandler = async (id: number) => {
        setApproveLoading(true);
        try {
          await axios.post(api_routes.finance.scholarship.approve(id), {});
          toastSuccess("Payment Approved Successfully");
          refetch();
        } catch (error) {
          if (isAxiosError<AxiosErrorResponseType>(error)) {
            if (error?.response?.data?.message) {
              toastError(error.response.data.message);
            } else {
              toastError("Something went wrong");
            }
          }
        } finally {
          setApproveLoading(false);
        }
      };

    return <>
        <PaginatedTableLayout title="Scholarship List">
            <PaginatedTableLayout.Header title="Scholarship List" addBtn={false} excelLink={api_routes.finance.scholarship.excel} excelName="applications.xlsx">
                {(searchParams.get("payment_status")==="pending" || searchParams.get("payment_status")==="rejected") && (checkedValue.length>0) && 
                <ConfirmAlert confirmHandler={onMultipleApproveHandler} message="Are you sure you want to approve selected applications?">
                    <Button appearance="primary" color="violet" type="button" active loading={loading} disabled={loading}>
                        Approve
                    </Button>
                </ConfirmAlert>}
                <Button appearance="primary" type="button" active onClick={() => setOpenDrawer(true)}>
                    Filter
                </Button>
            </PaginatedTableLayout.Header>
            <PaginatedTableLayout.Content total={(data?.meta.total || 0)} error={error} refetch={refetch}>
                <Table
                    loading={isLoading || isFetching || isRefetching}
                    {...table}
                    data={data?.data || []}
                >
                    {(searchParams.get("payment_status")==="pending" || searchParams.get("payment_status")==="rejected") && <Table.Column width={50} verticalAlign="middle" align="center" fixed>
                        <Table.HeaderCell>Select</Table.HeaderCell>

                        <Table.Cell fullText style={{ padding: '6px' }}>
                            {rowData => (
                                <Checkbox value={rowData.id} disabled={rowData.pay_status === 1} checked={checkedValue.includes(rowData.id)} onChange={_value => checkedValue.includes(rowData.id) ? setCheckedValue(checkedValue.filter(id => id !== rowData.id)) : setCheckedValue([...checkedValue, rowData.id])} />
                            )}
                        </Table.Cell>
                    </Table.Column>}

                    <Table.Column width={60} align="center" fixed>
                        <Table.HeaderCell>Id</Table.HeaderCell>
                        <Table.Cell fullText dataKey="id" />
                    </Table.Column>

                    <Table.Column width={260}>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.Cell fullText dataKey="basic_detail.name" />
                    </Table.Column>
                    
                    <Table.Column width={260}>
                        <Table.HeaderCell>Phone</Table.HeaderCell>
                        <Table.Cell fullText dataKey="basic_detail.parent_phone" />
                    </Table.Column>

                    <Table.Column width={260}>
                        <Table.HeaderCell>Institute</Table.HeaderCell>
                        <Table.Cell fullText dataKey="present_institute_name" />
                    </Table.Column>

                    <Table.Column width={260}>
                        <Table.HeaderCell>Industry</Table.HeaderCell>
                        <Table.Cell fullText dataKey="industry_name" />
                    </Table.Column>

                    <Table.Column width={260}>
                        <Table.HeaderCell>Graduation</Table.HeaderCell>
                        <Table.Cell fullText dataKey="mark.graduation.name" />
                    </Table.Column>

                    <Table.Column width={160}>
                        <Table.HeaderCell>Course</Table.HeaderCell>
                        <Table.Cell fullText dataKey="mark.course.name" />
                    </Table.Column>

                    <Table.Column width={160}>
                        <Table.HeaderCell>Class</Table.HeaderCell>
                        <Table.Cell fullText dataKey="mark.class.name" />
                    </Table.Column>

                    <Table.Column width={160}>
                        <Table.HeaderCell>Aadhar Card No.</Table.HeaderCell>
                        <Table.Cell fullText dataKey="basic_detail.adharcard_no" />
                    </Table.Column>

                    <Table.Column width={160}>
                        <Table.HeaderCell>Father's Aadhar</Table.HeaderCell>
                        <Table.Cell fullText>
                            {rowData => (
                                <span>{rowData?.basic_detail.not_applicable &&
                                    rowData?.basic_detail.not_applicable === "father"
                                    ? "Not Applicable"
                                    : rowData?.basic_detail.f_adhar}</span>
                            )}
                        </Table.Cell>
                    </Table.Column>

                    <Table.Column width={160}>
                        <Table.HeaderCell>Mother's Aadhar</Table.HeaderCell>
                        <Table.Cell fullText>
                            {rowData => (
                                <span>{rowData?.basic_detail.not_applicable &&
                                    rowData?.basic_detail.not_applicable === "mother"
                                    ? "Not Applicable"
                                    : rowData?.basic_detail.m_adhar}</span>
                            )}
                        </Table.Cell>
                    </Table.Column>

                    <Table.Column width={160}>
                        <Table.HeaderCell>District</Table.HeaderCell>
                        <Table.Cell fullText dataKey="company.district.name" />
                    </Table.Column>

                    <Table.Column width={160}>
                        <Table.HeaderCell>Taluq</Table.HeaderCell>
                        <Table.Cell fullText dataKey="company.taluq.name" />
                    </Table.Column>

                    <Table.Column width={160} verticalAlign="middle">
                        <Table.HeaderCell>Amount</Table.HeaderCell>

                        <Table.Cell fullText style={{ padding: '6px' }}>
                            {rowData => (
                                <span>{rowData?.scholarship_fee?.amount || 0}</span>
                            )}
                        </Table.Cell>
                    </Table.Column>

                    <Table.Column width={160}>
                        <Table.HeaderCell>Year</Table.HeaderCell>
                        <Table.Cell fullText dataKey="application_year" />
                    </Table.Column>

                    <Table.Column width={250} verticalAlign="middle">
                        <Table.HeaderCell>Status</Table.HeaderCell>

                        <Table.Cell style={{ padding: '6px' }}>
                            {rowData => (
                                <StatusBadge status={rowData.status} application_state={rowData.application_state} current_application_state={4} current_application_state_name="ADMIN"  />
                            )}
                        </Table.Cell>
                    </Table.Column>

                    <Table.Column width={250} verticalAlign="middle">
                        <Table.HeaderCell>Payment Status</Table.HeaderCell>

                        <Table.Cell style={{ padding: '6px' }}>
                            {rowData => (
                                <PaymentStatusBadge pay_status={rowData.pay_status}  />
                            )}
                        </Table.Cell>
                    </Table.Column>

                    <Table.Column width={250} verticalAlign="middle">
                        <Table.HeaderCell>Applied On</Table.HeaderCell>

                        <Table.Cell fullText style={{ padding: '6px' }}>
                            {rowData => (
                                <Moment datetime={rowData.date} />
                            )}
                        </Table.Cell>
                    </Table.Column>

                    <Table.Column width={130} fixed="right">
                        <Table.HeaderCell>Action</Table.HeaderCell>

                        <Table.Cell style={{ padding: '6px' }}>
                            {rowData => (
                                <ButtonToolbar>
                                    <ViewLink to={page_routes.finance.scholarship.view(rowData.id)} />
                                    {(rowData.pay_status === 0 || rowData.pay_status === 2) && <Whisper
                                        placement="bottomEnd"
                                        controlId="control-id-click"
                                        trigger="hover"
                                        speaker={<Tooltip>Payment Success</Tooltip>}
                                    >
                                        <IconButton
                                            appearance="primary"
                                            color="green"
                                            size="sm"
                                            icon={<CheckIcon />}
                                            onClick={() => onApproveHandler(rowData.id)}
                                            loading={approveLoading}
                                            disabled={approveLoading}
                                        />
                                    </Whisper>}
                                    {(rowData.pay_status === 0 || rowData.pay_status === 1) && <Whisper
                                        placement="bottomEnd"
                                        controlId="control-id-click"
                                        trigger="hover"
                                        speaker={<Tooltip>Payment Failed</Tooltip>}
                                    >
                                        <IconButton
                                            appearance="primary"
                                            color="red"
                                            size="sm"
                                            icon={<CloseIcon />}
                                            onClick={() => setModal({ open: true, id: rowData.id })}
                                        />
                                    </Whisper>}
                                </ButtonToolbar>
                            )}
                        </Table.Cell>
                    </Table.Column>
                </Table>
            </PaginatedTableLayout.Content>
        </PaginatedTableLayout>
        <ApplicationFilter drawer={openDrawer} drawerHandler={setOpenDrawer} />
        <FinanceScholarshipRejectForm modal={modal.open} setModal={(value) => setModal({ ...modal, open: value })} id={modal.id} refetch={refetch} />
    </>
}

export default FinanceScholarshipListPage