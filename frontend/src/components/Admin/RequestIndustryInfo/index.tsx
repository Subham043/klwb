import { Button, Col, Grid, Modal, Panel, Row } from 'rsuite'
import { useRequestIndustryQuery } from '../../../hooks/data/request_industry';
import { useDeleteQuery } from '../../../hooks/useDeleteQuery';
import { useToast } from '../../../hooks/useToast';
import { useState } from 'react';
import { useAxios } from '../../../hooks/useAxios';
import { api_routes } from '../../../utils/routes/api';
import ErrorBoundaryLayout from '../../../layouts/ErrorBoundaryLayout';
import FileViewer from '../../FileViewer';
import DetailInfo from '../../DetailInfo';

export default function RequestIndustryInfo({modal, modalHandler, refetch}:{modal: {status:boolean, id?:number}; modalHandler: (value:{status:boolean, id?:number})=>void; refetch: ()=>void}) {
    const {data, isFetching, isLoading, isRefetching, refetch:refetchData, error } = useRequestIndustryQuery(modal.id ? modal.id : 0, (modal.status && modal.id!==undefined && modal.id>0));
    const {deleteHandler, deleteLoading} = useDeleteQuery();
    const {toastError, toastSuccess} = useToast();
    const [approveLoading, setApproveLoading] = useState<boolean>(false);
    const axios = useAxios();

    const onRejectHandler = async (id:number) => {
        await deleteHandler(api_routes.admin.request_industry.delete(id));
        modalHandler({status:false})
        refetch();
    }
    
    const onApproveHandler = async (id:number) => {
        setApproveLoading(true)
        try {
            await axios.post(api_routes.admin.request_industry.approve(id), {});
            toastSuccess('Approved Successfully');
            modalHandler({status:false})
            refetch();
        } catch (error) {
            toastError('Something went wrong. Please try again later.');
        }finally{
            setApproveLoading(false);
        }
    }

    return (
        <Modal overflow={false} size={"sm"} open={modal.status} onClose={()=>modalHandler({status:false})} className='info-modal'>
            <ErrorBoundaryLayout loading={(isFetching || isLoading || isRefetching)} error={error} refetch={refetchData}>
                <>
                    <Panel header="Industry Request" className='info-modal-panel' bordered>
                        <Grid fluid>
                            <Row gutter={30}>
                                <Col className="pb-1" xs={12}>
                                    <DetailInfo title="Company" value={data?.company} />
                                </Col>
                                <Col className="pb-1" xs={12}>
                                    <DetailInfo title="Email" value={data?.email} />
                                </Col>
                                <Col className="pb-1" xs={12}>
                                    <DetailInfo title="Mobile" value={data?.mobile} />
                                </Col>
                                <Col className="pb-1" xs={12}>
                                    <DetailInfo title="Act" value={data?.act_label} />
                                </Col>
                                <Col className="pb-1" xs={12}>
                                    <DetailInfo title="GST" value={data?.gst_no} />
                                </Col>
                                <Col className="pb-1" xs={12}>
                                    <DetailInfo title="PAN" value={data?.pan_no} />
                                </Col>
                                <Col className="pb-1" xs={12}>
                                    <DetailInfo title="District" value={data?.city.name} />
                                </Col>
                                <Col className="pb-1" xs={12}>
                                    <DetailInfo title="Taluq" value={data?.taluq.name} />
                                </Col>
                                <Col className="pb-1" xs={12}>
                                    <DetailInfo title="Address" value={data?.address} />
                                </Col>
                                <Col className="pb-1" xs={12}>
                                    <DetailInfo title="Register Doc" value={<FileViewer src={data?.register_doc} />} />
                                </Col>
                            </Row>
                        </Grid>
                    </Panel>
                </>
                {data!==undefined && <Modal.Footer className='mb-1 info-modal-footer'>
                    <Button onClick={()=>onApproveHandler(data!.id)} loading={approveLoading} disabled={approveLoading} appearance="primary">
                        Approve
                    </Button>
                    <Button onClick={()=>onRejectHandler(data!.id)} loading={deleteLoading} disabled={deleteLoading} appearance="primary" color='red'>
                        Reject
                    </Button>
                    <Button onClick={()=>modalHandler({status:false})} appearance="subtle">
                        Cancel
                    </Button>
                </Modal.Footer>}
            </ErrorBoundaryLayout>
        </Modal>
    )
}