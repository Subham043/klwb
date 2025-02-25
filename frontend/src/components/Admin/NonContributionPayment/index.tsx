import {
  Badge,
  Button,
  ButtonToolbar,
  Modal,
  Pagination,
  Table,
  Tooltip,
  Whisper,
} from "rsuite";
import { usePaginationQueryParam } from "../../../hooks/usePaginationQueryParam";
import ErrorBoundaryLayout from "../../../layouts/ErrorBoundaryLayout";
import ModalCardContainer from "../../MainCards/ModalCardContainer";
import { table } from "../../../utils/constants/table";
import Moment from "../../Moment";
import { useNonContributionPaymentsQuery } from "../../../hooks/data/non_contribution_payment";
import PaymentStatusBadge from "../../PaymentStatusBadge";
import { useState } from "react";
import { useAxios } from "../../../hooks/useAxios";
import { useToast } from "../../../hooks/useToast";
import { api_routes } from "../../../utils/routes/api";
import ConfirmAlert from "../../ConfirmAlert";

export type Props = {
  modal: {
    status: boolean;
    data: number | null;
  };
  modalHandler: (value: { status: boolean; data: number | null }) => void;
  refetch?: () => void
};

const Reverify = ({reg_industry_id, id, year, refetch}:{reg_industry_id: number, id: number, year: number, refetch: () => void}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const axios = useAxios();
  const {toastError} = useToast();

  const reVerifyHandler = async () => {
      setLoading(true);
      try {
          await axios.post(api_routes.admin.non_contribution.mark_payment_complete(reg_industry_id, id), {
              year
          });
          refetch();
      } catch (error) {
          toastError("Failed to update payment status. Please try again later.")
      }finally {
          setLoading(false);
      }
  }
  return (
      <Whisper
          placement="bottomEnd"
          controlId="control-id-click"
          trigger="hover"
          speaker={<Tooltip>Mark Payment Complete</Tooltip>}
      >
        <ConfirmAlert confirmHandler={reVerifyHandler}>
          <Button appearance="primary" color="green" size="sm" loading={loading} disabled={loading}>Mark Complete</Button>
        </ConfirmAlert>
      </Whisper>
  )
}

export default function NonContributionPayment({
  modal,
  modalHandler,
  refetch,
}: Props) {
  const { page, pageHandler, limit, limitHandler } =
    usePaginationQueryParam("_non_contribution_payment");
  const {
    data,
    isFetching: isFetching,
    isLoading: isLoading,
    isRefetching: isRefetching,
    error,
    refetch: refetchData,
  } = useNonContributionPaymentsQuery({
    industry_id: modal.data || 0,
    enabled: modal.status,
  });

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
          <ModalCardContainer header="Non Contribution Payment List">
            <Table
                loading={isLoading||isFetching||isRefetching}
                {...table}
                data={data?.data || []}
            >
                <Table.Column width={60} align="center" fixed>
                    <Table.HeaderCell>Year</Table.HeaderCell>
                    <Table.Cell fullText dataKey="year" />
                </Table.Column>

                <Table.Column  width={260}>
                    <Table.HeaderCell>Company Name</Table.HeaderCell>
                    <Table.Cell fullText dataKey="industry.name" />
                </Table.Column>

                <Table.Column  width={260}>
                    <Table.HeaderCell>Company Act</Table.HeaderCell>
                    <Table.Cell fullText dataKey="industry.act_label" />
                </Table.Column>

                <Table.Column  width={260}>
                    <Table.HeaderCell>Company Category</Table.HeaderCell>
                    <Table.Cell fullText dataKey="industry.category" />
                </Table.Column>

                <Table.Column  width={260}>
                    <Table.HeaderCell>District</Table.HeaderCell>
                    <Table.Cell fullText dataKey="industry.city.name" />
                </Table.Column>

                <Table.Column  width={260}>
                    <Table.HeaderCell>Taluq</Table.HeaderCell>
                    <Table.Cell fullText dataKey="industry.taluq.name" />
                </Table.Column>

                <Table.Column width={100}>
                    <Table.HeaderCell>Male Count</Table.HeaderCell>
                    <Table.Cell fullText dataKey="male" />
                </Table.Column>

                <Table.Column width={100}>
                    <Table.HeaderCell>Female Count</Table.HeaderCell>
                    <Table.Cell fullText dataKey="female" />
                </Table.Column>

                <Table.Column width={100}>
                    <Table.HeaderCell>Total Count</Table.HeaderCell>
                    <Table.Cell fullText dataKey="total_employees" />
                </Table.Column>
                
                <Table.Column width={100} verticalAlign="middle">
                    <Table.HeaderCell>Price</Table.HeaderCell>
                    <Table.Cell fullText style={{ padding: '6px' }}>
                        {rowData => (
                            <span>{rowData.total_employees * 60}</span>
                        )}
                    </Table.Cell>
                </Table.Column>

                <Table.Column  width={100}>
                    <Table.HeaderCell>Interest</Table.HeaderCell>
                    <Table.Cell fullText dataKey="interest" />
                </Table.Column>
                
                <Table.Column  width={100}>
                    <Table.HeaderCell>Amount</Table.HeaderCell>
                    <Table.Cell fullText dataKey="price" />
                </Table.Column>

                <Table.Column  width={260}>
                    <Table.HeaderCell>Payment ID</Table.HeaderCell>
                    <Table.Cell fullText dataKey="pay_id" />
                </Table.Column>

                <Table.Column width={200} verticalAlign="middle">
                    <Table.HeaderCell>Status</Table.HeaderCell>

                    <Table.Cell style={{ padding: '6px' }}>
                        {rowData => (
                            <PaymentStatusBadge pay_status={rowData.status} />
                        )}
                    </Table.Cell>
                </Table.Column>
                
                <Table.Column width={100} verticalAlign="middle">
                    <Table.HeaderCell>Edited</Table.HeaderCell>

                    <Table.Cell style={{ padding: '6px' }}>
                        {rowData => (
                            rowData.is_edited ? <Badge style={{ background: '#4caf50', padding: '7px 9px', }} content={'YES'} /> :
                            <Badge style={{ background: '#f44336', padding: '7px 9px', }} content={'NO'} />
                        )}
                    </Table.Cell>
                </Table.Column>

                <Table.Column width={250} verticalAlign="middle">
                    <Table.HeaderCell>Paid On</Table.HeaderCell>

                    <Table.Cell fullText style={{ padding: '6px' }}>
                        {rowData => (
                            <Moment datetime={rowData.payed_on} />
                        )}
                    </Table.Cell>
                </Table.Column>
                <Table.Column width={120} fixed="right">
                    <Table.HeaderCell>Action</Table.HeaderCell>
    
                    <Table.Cell style={{ padding: "6px" }}>
                    {(rowData) => (
                        <ButtonToolbar>
                            {rowData.status !== 1 && <Reverify reg_industry_id={rowData.comp_regd_id} id={rowData.id} year={rowData.year} refetch={() => {modalHandler({ status: false, data: null }); refetch && refetch();}} />}
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
                total={data?.meta.total || 0}
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
    </div>
  );
}
