import {
  Button,
  ButtonToolbar,
  IconButton,
  Modal,
  Pagination,
  Table,
} from "rsuite";
import { usePaginationQueryParam } from "../../../hooks/usePaginationQueryParam";
import ErrorBoundaryLayout from "../../../layouts/ErrorBoundaryLayout";
import ModalCardContainer from "../../MainCards/ModalCardContainer";
import { table } from "../../../utils/constants/table";
import Moment from "../../Moment";
import VisibleIcon from '@rsuite/icons/Visible';
import ActivityLogInfo from "../ActivityLogInfo";
import { useState } from "react";
import { ActivityLogType } from "../../../utils/types";
import { useContributionsActivityLogsQuery } from "../../../hooks/data/contribution";

export type Props = {
  modal: {
    status: boolean;
    data: number|null;
  }
  modalHandler: (value: { status: boolean; data: number|null }) => void;
};

export default function ContributionActivityLog({ modal, modalHandler }: Props) {
  const { page, pageHandler, limit, limitHandler } =
    usePaginationQueryParam("_activity_logs");
  const {
    data: activity_logss,
    isFetching: isActivityLogFetching,
    isLoading: isActivityLogLoading,
    isRefetching: isActivityLogRefetching,
    error,
    refetch: refetchData,
  } = useContributionsActivityLogsQuery({id: modal.data || 0, enabled: modal.status});
  const [modal2, setModal2] = useState<{ status: boolean; data: ActivityLogType|null }>({ status: false, data: null });

  return (
    <div className="mb-1">
      <Modal
        overflow={false}
        size="lg"
        open={modal.status}
        onClose={() => modalHandler({ status: false, data: null })}
        className="info-modal"
      >
        <ErrorBoundaryLayout error={error} refetch={refetchData}>
          <ModalCardContainer header="Activity Log Information">
            <Table
              loading={isActivityLogLoading || isActivityLogFetching || isActivityLogRefetching}
              {...table}
              data={activity_logss?.data || []}
            >
              <Table.Column width={60} align="center" fixed>
                <Table.HeaderCell>ID</Table.HeaderCell>
                <Table.Cell dataKey="id" />
              </Table.Column>

              <Table.Column  flexGrow={1}>
                  <Table.HeaderCell>Description</Table.HeaderCell>
                  <Table.Cell dataKey="description" />
              </Table.Column>

              <Table.Column  width={200}>
                  <Table.HeaderCell>Changed By</Table.HeaderCell>
                  <Table.Cell dataKey="causer.name" />
              </Table.Column>

              <Table.Column width={250} verticalAlign="middle">
                <Table.HeaderCell>Updated On</Table.HeaderCell>

                <Table.Cell style={{ padding: '6px' }}>
                  {rowData => (
                    <Moment datetime={rowData.created_at} />
                  )}
                </Table.Cell>
              </Table.Column>

              <Table.Column width={60} fixed="right">
                <Table.HeaderCell>Action</Table.HeaderCell>

                <Table.Cell style={{ padding: "6px" }}>
                  {(rowData) => (
                    <ButtonToolbar>
                      <IconButton appearance="primary" color="orange" size="sm" icon={<VisibleIcon />} onClick={() => setModal2({ status: true, data: rowData as ActivityLogType })} />
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
        <Modal.Footer className="mb-1 info-modal-footer">
          <Button
            onClick={() => modalHandler({ status: false, data: null })}
            appearance="subtle"
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <ActivityLogInfo modal={modal2} modalHandler={setModal2} />
    </div>
  );
}
