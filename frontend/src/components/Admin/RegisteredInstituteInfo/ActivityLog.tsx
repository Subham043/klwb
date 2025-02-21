import {
  Button,
  ButtonToolbar,
  IconButton,
  Pagination,
  Stack,
  Table,
} from "rsuite";
import { usePaginationQueryParam } from "../../../hooks/usePaginationQueryParam";
import ErrorBoundaryLayout from "../../../layouts/ErrorBoundaryLayout";
import ModalCardContainer from "../../MainCards/ModalCardContainer";
import { table } from "../../../utils/constants/table";
import Moment from "../../Moment";
import { useRegisteredInstitutesActivityLogsQuery } from "../../../hooks/data/registered_institute";
import VisibleIcon from "@rsuite/icons/Visible";
import ActivityLogInfo from "../ActivityLogInfo";
import { useState } from "react";
import { ActivityLogType } from "../../../utils/types";
import { useExcelExport } from "../../../hooks/useExcelExport";
import { api_routes } from "../../../utils/routes/api";

export type Props = {
  id: number;
};

export default function ActivityLog({ id }: Props) {
  const { page, pageHandler, limit, limitHandler } =
    usePaginationQueryParam("_activity_logs");
  const {
    data: activity_logss,
    isFetching: isActivityLogFetching,
    isLoading: isActivityLogLoading,
    isRefetching: isActivityLogRefetching,
    error,
    refetch: refetchData,
  } = useRegisteredInstitutesActivityLogsQuery(Number(id) || 0);
  const [modal, setModal] = useState<{
    status: boolean;
    data: ActivityLogType | null;
  }>({ status: false, data: null });
  const { excelLoading, exportExcel } = useExcelExport();

  const excelHandler = async () => {
    await exportExcel(
      api_routes.admin.registered_institute.activity_log.excel(Number(id)),
      "activity_logs.xlsx"
    );
  };

  return (
    <div className="mb-1">
      <ErrorBoundaryLayout error={error} refetch={refetchData}>
        <ModalCardContainer header="Activity Log Information">
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
            </Stack>
          </div>
          <Table
            loading={
              isActivityLogLoading ||
              isActivityLogFetching ||
              isActivityLogRefetching
            }
            {...table}
            data={activity_logss?.data || []}
          >
            <Table.Column width={60} align="center" fixed>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.Cell fullText dataKey="id" />
            </Table.Column>

            <Table.Column flexGrow={1}>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.Cell fullText dataKey="description" />
            </Table.Column>

            <Table.Column width={200}>
              <Table.HeaderCell>Changed By</Table.HeaderCell>
              <Table.Cell fullText dataKey="causer.name" />
            </Table.Column>

            <Table.Column width={250} verticalAlign="middle">
              <Table.HeaderCell>Updated On</Table.HeaderCell>

              <Table.Cell fullText style={{ padding: "6px" }}>
                {(rowData) => <Moment datetime={rowData.created_at} />}
              </Table.Cell>
            </Table.Column>

            <Table.Column width={60} fixed="right">
              <Table.HeaderCell>Action</Table.HeaderCell>

              <Table.Cell style={{ padding: "6px" }}>
                {(rowData) => (
                  <ButtonToolbar>
                    <IconButton
                      appearance="primary"
                      color="orange"
                      size="sm"
                      icon={<VisibleIcon />}
                      onClick={() =>
                        setModal({
                          status: true,
                          data: rowData as ActivityLogType,
                        })
                      }
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
              total={activity_logss?.meta.total || 0}
              limitOptions={[10, 30, 50]}
              limit={Number(limit)}
              activePage={Number(page)}
              onChangePage={pageHandler}
              onChangeLimit={limitHandler}
            />
          </div>
        </ModalCardContainer>
      </ErrorBoundaryLayout>
      <ActivityLogInfo modal={modal} modalHandler={setModal} />
    </div>
  );
}
