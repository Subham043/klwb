import { FC, useState } from "react";
import { Badge, Button, ButtonToolbar, Checkbox, IconButton, Table, Tooltip, Whisper } from "rsuite";
import PaginatedTableLayout from "../../../layouts/PaginatedTable";
import Moment from "../../../components/Moment";
import { page_routes } from "../../../utils/routes/pages";
import { useAdminScholarshipListQuery } from "../../../hooks/data/admin_scholarship";
import { table } from "../../../utils/constants/table";
import { ViewLink } from "../../../components/Buttons/ViewBtn";
import ApplicationFilter from "../../../components/ApplicationFilter";
import { api_routes } from "../../../utils/routes/api";
import PaymentStatusBadge from "../../../components/PaymentStatusBadge";
import { useSearchParams } from "react-router-dom";
import BlockBtn from "../../../components/Buttons/BlockBtn";
import ConfirmAlert from "../../../components/ConfirmAlert";
import { useAxios } from "../../../hooks/useAxios";
import { useToast } from "../../../hooks/useToast";
import { isAxiosError } from "axios";
import { AxiosErrorResponseType } from "../../../utils/types";
import AdminScholarshipRejectForm from "../../../components/Admin/RejectModal";
import CheckIcon from '@rsuite/icons/Check';
import CloseIcon from '@rsuite/icons/Close';
import ApplicationStatusBadge from "../../../components/ApplicationStatusBadge";

const AdminScholarshipListPage: FC = () => {
  const { data, isLoading, isFetching, isRefetching, refetch, error } =
    useAdminScholarshipListQuery();
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const [checkedValue, setCheckedValue] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [approveLoading, setApproveLoading] = useState<boolean>(false);
  const [modal, setModal] = useState<{ open: boolean; can_approve: boolean; id: number }>({
    open: false,
    can_approve: false,
    id: 0,
 });
  const { toastError, toastSuccess } = useToast();
  const axios = useAxios();

  const onMultipleApproveHandler = async () => {
    setLoading(true);
    try {
      await axios.post(api_routes.admin.scholarship.approve_multiple, {
        id: checkedValue,
      });
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
      await axios.post(api_routes.admin.scholarship.approve(id), {});
      toastSuccess("Approved Successfully");
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

  return (
    <>
      <PaginatedTableLayout title="Scholarship List">
        <PaginatedTableLayout.Header
          title="Scholarship List"
          addBtn={false}
          excelLink={api_routes.admin.scholarship.excel}
          excelName="applications.xlsx"
        >
          {searchParams.get("status") === "pending" &&
            checkedValue.length > 0 && (
              <ConfirmAlert
                confirmHandler={onMultipleApproveHandler}
                message="Are you sure you want to approve selected applications?"
              >
                <Button
                  appearance="primary"
                  color="violet"
                  type="button"
                  active
                  loading={loading}
                  disabled={loading}
                >
                  Approve
                </Button>
              </ConfirmAlert>
            )}
          <Button
            appearance="primary"
            type="button"
            active
            onClick={() => setOpenDrawer(true)}
          >
            Filter
          </Button>
        </PaginatedTableLayout.Header>
        <PaginatedTableLayout.Content
          total={data?.meta.total || 0}
          error={error}
          refetch={refetch}
        >
          <Table
            loading={isLoading || isFetching || isRefetching}
            {...table}
            data={data?.data || []}
          >
            {searchParams.get("status") === "pending" && (
              <Table.Column
                width={50}
                verticalAlign="middle"
                align="center"
                fixed
              >
                <Table.HeaderCell>Select</Table.HeaderCell>

                <Table.Cell fullText style={{ padding: "6px" }}>
                  {(rowData) => (
                    <Checkbox
                      value={rowData.id}
                      disabled={!rowData.can_approve}
                      checked={checkedValue.includes(rowData.id)}
                      onChange={(_value) =>
                        checkedValue.includes(rowData.id)
                          ? setCheckedValue(
                              checkedValue.filter((id) => id !== rowData.id)
                            )
                          : setCheckedValue([...checkedValue, rowData.id])
                      }
                    />
                  )}
                </Table.Cell>
              </Table.Column>
            )}

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
                {(rowData) => (
                  <span>
                    {rowData?.basic_detail.not_applicable &&
                    rowData?.basic_detail.not_applicable === "father"
                      ? "Not Applicable"
                      : rowData?.basic_detail.f_adhar}
                  </span>
                )}
              </Table.Cell>
            </Table.Column>

            <Table.Column width={160}>
              <Table.HeaderCell>Mother's Aadhar</Table.HeaderCell>
              <Table.Cell fullText>
                {(rowData) => (
                  <span>
                    {rowData?.basic_detail.not_applicable &&
                    rowData?.basic_detail.not_applicable === "mother"
                      ? "Not Applicable"
                      : rowData?.basic_detail.m_adhar}
                  </span>
                )}
              </Table.Cell>
            </Table.Column>

            <Table.Column width={160}>
              <Table.HeaderCell>District</Table.HeaderCell>
              <Table.Cell fullText dataKey="mark.district.name" />
            </Table.Column>

            <Table.Column width={160}>
              <Table.HeaderCell>Taluq</Table.HeaderCell>
              <Table.Cell fullText dataKey="mark.taluq.name" />
            </Table.Column>

            <Table.Column width={160} verticalAlign="middle">
              <Table.HeaderCell>Amount</Table.HeaderCell>

              <Table.Cell fullText style={{ padding: "6px" }}>
                {(rowData) => (
                  <span>{rowData?.scholarship_fee?.amount || 0}</span>
                )}
              </Table.Cell>
            </Table.Column>

            <Table.Column width={160}>
              <Table.HeaderCell>Year</Table.HeaderCell>
              <Table.Cell fullText dataKey="application_year" />
            </Table.Column>

            {searchParams.get("status") === "payment_processed" && (
              <Table.Column width={250} verticalAlign="middle">
                <Table.HeaderCell>Payment Status</Table.HeaderCell>

                <Table.Cell style={{ padding: "6px" }}>
                  {(rowData) => (
                    <PaymentStatusBadge pay_status={rowData.pay_status} />
                  )}
                </Table.Cell>
              </Table.Column>
            )}

            <Table.Column width={210} verticalAlign="middle">
              <Table.HeaderCell>Status</Table.HeaderCell>

              <Table.Cell style={{ padding: "6px" }}>
                {(rowData) => <ApplicationStatusBadge status={rowData?.status} application_state={rowData?.application_state} />}
              </Table.Cell>
            </Table.Column>

            {searchParams.get("status") === "rejected" && (
              <Table.Column width={250} verticalAlign="middle">
                <Table.HeaderCell>Reject Reason</Table.HeaderCell>
                <Table.Cell fullText dataKey="reject_reason" />
              </Table.Column>
            )}

            <Table.Column width={160} verticalAlign="middle">
              <Table.HeaderCell>Industry Payment</Table.HeaderCell>

              <Table.Cell style={{ padding: "6px" }}>
                {(rowData) =>
                  rowData.industryPayment ? (
                    <Badge
                      style={{ background: "#4caf50", padding: "7px 9px" }}
                      content={"PAID"}
                    />
                  ) : (
                    <Badge
                      style={{ background: "#f44336", padding: "7px 9px" }}
                      content={"UNPAID"}
                    />
                  )
                }
              </Table.Cell>
            </Table.Column>

            <Table.Column width={160} verticalAlign="middle">
              <Table.HeaderCell>Active/Inactive</Table.HeaderCell>

              <Table.Cell style={{ padding: "6px" }}>
                {(rowData) =>
                  rowData.inactive ? (
                    <Badge
                      style={{ background: "#f44336", padding: "7px 9px" }}
                      content={"INACTIVE"}
                    />
                  ) : (
                    <Badge
                      style={{ background: "#4caf50", padding: "7px 9px" }}
                      content={"ACTIVE"}
                    />
                  )
                }
              </Table.Cell>
            </Table.Column>

            <Table.Column width={160} verticalAlign="middle">
              <Table.HeaderCell>Verified By</Table.HeaderCell>
              <Table.Cell fullText style={{ padding: "6px" }}>
                {(rowData) => (
                  <span>{rowData?.approved_by?.name || "N/A"}</span>
                )}
              </Table.Cell>
            </Table.Column>

            <Table.Column width={250} verticalAlign="middle">
              <Table.HeaderCell>Applied On</Table.HeaderCell>

              <Table.Cell fullText style={{ padding: "6px" }}>
                {(rowData) => <Moment datetime={rowData.date} />}
              </Table.Cell>
            </Table.Column>

            <Table.Column width={130} fixed="right">
              <Table.HeaderCell>Action</Table.HeaderCell>

              <Table.Cell style={{ padding: "6px" }}>
                {(rowData) => (
                  <ButtonToolbar>
                    <ViewLink
                      to={page_routes.admin.scholarship.view(rowData.id)}
                    />
                    {(rowData.application_state === 4 && rowData.status === 0 && rowData.can_approve && searchParams.get("status") === "pending") && 
                    <>
                        <Whisper
                            placement="bottomEnd"
                            controlId="control-id-click"
                            trigger="hover"
                            speaker={<Tooltip>Approve Scholarship</Tooltip>}
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
                        </Whisper>
                        <Whisper
                            placement="bottomEnd"
                            controlId="control-id-click"
                            trigger="hover"
                            speaker={<Tooltip>Reject Scholarship</Tooltip>}
                        >
                            <IconButton
                                appearance="primary"
                                color="red"
                                size="sm"
                                icon={<CloseIcon />}
                                onClick={() => setModal({ open: true, id: rowData.id, can_approve: rowData.can_approve })}
                            />
                        </Whisper>
                    </>}
                    {!searchParams.get("status") && (
                      <BlockBtn
                        route={api_routes.admin.scholarship.toggle(rowData.id)}
                        refetch={refetch}
                        isBlocked={rowData.inactive}
                      />
                    )}
                  </ButtonToolbar>
                )}
              </Table.Cell>
            </Table.Column>
          </Table>
        </PaginatedTableLayout.Content>
      </PaginatedTableLayout>
      <ApplicationFilter drawer={openDrawer} drawerHandler={setOpenDrawer} />
      {searchParams.get("status") === "pending" && <AdminScholarshipRejectForm modal={modal.open && modal.can_approve} setModal={(value) => setModal({ open: value, id: 0, can_approve: false })} id={modal.id} refetch={refetch} />}
    </>
  );
};

export default AdminScholarshipListPage;
