import { FC, useState } from "react";
import {
  Badge,
  ButtonToolbar,
  IconButton,
  Table,
  Tooltip,
  Whisper,
} from "rsuite";
import PaginatedTableLayout from "../../../layouts/PaginatedTable";
import Moment from "../../../components/Moment";
import SelectYear from "../../../components/Institute/SelectYear";
import { table } from "../../../utils/constants/table";
import { api_routes } from "../../../utils/routes/api";
import ChangeListIcon from "@rsuite/icons/ChangeList";
import PaymentStatusBadge from "../../../components/PaymentStatusBadge";
import SelectCityStatus from "../../../components/SelectCity";
import SelectTaluqStatus from "../../../components/SelectTaluq";
import SelectDateRangePicker from "../../../components/SelectDateRangePicker";
import { useAxios } from "../../../hooks/useAxios";
import { useToast } from "../../../hooks/useToast";
import ReloadIcon from "@rsuite/icons/Reload";
import { DrawerProps, ExcelUploadModalProps } from "../../../utils/types";
import EditBtn from "../../../components/Buttons/EditBtn";
import UploadBtn from "../../../components/Buttons/UploadBtn";
import { useAttemptedContributionsQuery } from "../../../hooks/data/attempted_contribution";
import AttemptedContributionForm from "../../../components/Admin/AttemptedContributionForm";
import AttemptedContributionExcelUploadForm from "../../../components/Admin/AttemptedContributionExcelUploadForm";

const Reverify = ({
  reg_industry_id,
  id,
  refetch,
}: {
  reg_industry_id: number;
  id: number;
  refetch: () => void;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const axios = useAxios();
  const { toastError } = useToast();

  const reVerifyHandler = async () => {
    setLoading(true);
    try {
      await axios.get(
        api_routes.admin.registered_industry.contribution.re_verify(
          reg_industry_id,
          id
        )
      );
      refetch();
    } catch (error) {
      toastError("Failed to re-verify payment. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Whisper
      placement="bottomEnd"
      controlId="control-id-click"
      trigger="hover"
      speaker={<Tooltip>Re-Verify</Tooltip>}
    >
      <IconButton
        appearance="primary"
        color="violet"
        size="sm"
        icon={<ReloadIcon />}
        loading={loading}
        onClick={reVerifyHandler}
      />
    </Whisper>
  );
};

const Excel = ({ link }: { link: string }) => {
  return (
    <ButtonToolbar>
      <Whisper
        placement="bottomEnd"
        controlId="control-id-click"
        trigger="hover"
        speaker={<Tooltip>Download</Tooltip>}
      >
        <IconButton
          appearance="primary"
          color={"green"}
          icon={<ChangeListIcon />}
          as={"a"}
          href={link}
          download={true}
          size="sm"
        />
      </Whisper>
    </ButtonToolbar>
  );
};

const AttemptedContributionListPage: FC = () => {
  const { data, isLoading, isFetching, isRefetching, refetch, error } =
    useAttemptedContributionsQuery();
  const [openDrawer, setOpenDrawer] = useState<DrawerProps>({
    status: false,
    type: "Create",
  });
  const [excelModal, setExcelModal] = useState<ExcelUploadModalProps>({
    status: false,
  });

  return (
    <PaginatedTableLayout title="Contribution Attempted">
      <PaginatedTableLayout.Header
        title="Contribution Attempted"
        addBtn={false}
        excelLink={api_routes.admin.attempted_contribution.excel}
        excelName="attempted_contribution.xlsx"
      >
        <SelectDateRangePicker />
        <SelectCityStatus />
        <SelectTaluqStatus />
        <SelectYear />
      </PaginatedTableLayout.Header>
      <PaginatedTableLayout.Content
        total={data?.meta.total || 0}
        error={error}
        refetch={refetch}
      >
        <Table
          loading={isLoading || isFetching || isRefetching}
          {...table}
          wordWrap="break-all"
          data={data?.data || []}
        >
          <Table.Column width={60} align="center" fixed verticalAlign="middle">
            <Table.HeaderCell>Year</Table.HeaderCell>
            <Table.Cell fullText dataKey="year" />
          </Table.Column>

          <Table.Column width={260} verticalAlign="middle">
            <Table.HeaderCell>Company Name</Table.HeaderCell>
            <Table.Cell fullText dataKey="industry.name" />
          </Table.Column>

          <Table.Column width={260} verticalAlign="middle">
            <Table.HeaderCell>Company Act</Table.HeaderCell>
            <Table.Cell fullText dataKey="industry.act_label" />
          </Table.Column>

          <Table.Column width={260} verticalAlign="middle">
            <Table.HeaderCell>Company Category</Table.HeaderCell>
            <Table.Cell fullText dataKey="industry.category" />
          </Table.Column>

          <Table.Column width={260} verticalAlign="middle">
            <Table.HeaderCell>District</Table.HeaderCell>
            <Table.Cell fullText dataKey="industry.city.name" />
          </Table.Column>

          <Table.Column width={260} verticalAlign="middle">
            <Table.HeaderCell>Taluq</Table.HeaderCell>
            <Table.Cell fullText dataKey="industry.taluq.name" />
          </Table.Column>

          <Table.Column width={100} verticalAlign="middle">
            <Table.HeaderCell>Male Count</Table.HeaderCell>
            <Table.Cell fullText dataKey="male" />
          </Table.Column>

          <Table.Column width={100} verticalAlign="middle">
            <Table.HeaderCell>Female Count</Table.HeaderCell>
            <Table.Cell fullText dataKey="female" />
          </Table.Column>

          <Table.Column width={100} verticalAlign="middle">
            <Table.HeaderCell>Total Count</Table.HeaderCell>
            <Table.Cell fullText dataKey="total_employees" />
          </Table.Column>

          <Table.Column width={100} verticalAlign="middle">
            <Table.HeaderCell>Price</Table.HeaderCell>
            <Table.Cell fullText style={{ padding: "6px" }}>
              {(rowData) => (
                <span>
                  {rowData.total_employees * (rowData.year < 2025 ? 60 : 150)}
                </span>
              )}
            </Table.Cell>
          </Table.Column>

          <Table.Column width={100} verticalAlign="middle">
            <Table.HeaderCell>Interest</Table.HeaderCell>
            <Table.Cell fullText dataKey="interest" />
          </Table.Column>

          <Table.Column width={100} verticalAlign="middle">
            <Table.HeaderCell>Amount</Table.HeaderCell>
            <Table.Cell fullText dataKey="price" />
          </Table.Column>

          <Table.Column width={260} verticalAlign="middle">
            <Table.HeaderCell>Payment ID</Table.HeaderCell>
            <Table.Cell fullText dataKey="pay_id" />
          </Table.Column>

          <Table.Column width={200} verticalAlign="middle">
            <Table.HeaderCell>Status</Table.HeaderCell>

            <Table.Cell style={{ padding: "6px" }}>
              {(rowData) => <PaymentStatusBadge pay_status={rowData.status} />}
            </Table.Cell>
          </Table.Column>

          <Table.Column width={130} verticalAlign="middle">
            <Table.HeaderCell>Manual Verification</Table.HeaderCell>

            <Table.Cell style={{ padding: "6px" }}>
              {(rowData) =>
                rowData.resolved === 1 ? (
                  <Badge
                    style={{ background: "#4caf50", padding: "7px 9px" }}
                    content={"YES"}
                  />
                ) : (
                  <Badge
                    style={{ background: "#f44336", padding: "7px 9px" }}
                    content={"NO"}
                  />
                )
              }
            </Table.Cell>
          </Table.Column>

          <Table.Column width={80} verticalAlign="middle">
            <Table.HeaderCell>Edited</Table.HeaderCell>

            <Table.Cell style={{ padding: "6px" }}>
              {(rowData) =>
                rowData.is_edited ? (
                  <Badge
                    style={{ background: "#4caf50", padding: "7px 9px" }}
                    content={"YES"}
                  />
                ) : (
                  <Badge
                    style={{ background: "#f44336", padding: "7px 9px" }}
                    content={"NO"}
                  />
                )
              }
            </Table.Cell>
          </Table.Column>

          <Table.Column width={120} verticalAlign="middle">
            <Table.HeaderCell>Employee Excel</Table.HeaderCell>

            <Table.Cell style={{ padding: "6px" }}>
              {(rowData) =>
                (rowData.status === 0 || rowData.status === 2) &&
                rowData.employee_excel ? (
                  <Excel link={rowData.employee_excel} />
                ) : (
                  <></>
                )
              }
            </Table.Cell>
          </Table.Column>

          <Table.Column width={250} verticalAlign="middle">
            <Table.HeaderCell>Paid On</Table.HeaderCell>

            <Table.Cell fullText style={{ padding: "6px" }}>
              {(rowData) => <Moment datetime={rowData.payed_on} />}
            </Table.Cell>
          </Table.Column>
          <Table.Column width={130} fixed="right" verticalAlign="middle">
            <Table.HeaderCell>Action</Table.HeaderCell>

            <Table.Cell style={{ padding: "6px" }}>
              {(rowData) => (
                <ButtonToolbar>
                  <EditBtn
                    clickHandler={() =>
                      setOpenDrawer({
                        status: true,
                        type: "Edit",
                        id: rowData.id,
                      })
                    }
                  />
                  {(rowData.status === 0 || rowData.status === 2) &&
                    !rowData.employee_excel && (
                      <UploadBtn
                        clickHandler={() =>
                          setExcelModal({
                            status: true,
                            id: rowData.id,
                          })
                        }
                      />
                    )}
                  <Reverify
                    reg_industry_id={rowData.comp_regd_id}
                    id={rowData.id}
                    refetch={refetch}
                  />
                </ButtonToolbar>
              )}
            </Table.Cell>
          </Table.Column>
        </Table>
      </PaginatedTableLayout.Content>
      <AttemptedContributionForm
        drawer={openDrawer}
        drawerHandler={(value) => setOpenDrawer(value)}
        refetch={refetch}
      />
      <AttemptedContributionExcelUploadForm
        modal={excelModal}
        modalHandler={setExcelModal}
        refetch={refetch}
      />
    </PaginatedTableLayout>
  );
};

export default AttemptedContributionListPage;
