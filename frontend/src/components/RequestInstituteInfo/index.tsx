import { Button, Heading, HeadingGroup, Modal, Panel, Stack, Text, useMediaQuery } from 'rsuite'
import { useRequestInstituteQuery } from '../../hooks/data/request_institute';
import { useDeleteQuery } from '../../hooks/useDeleteQuery';
import { useToast } from '../../hooks/useToast';
import { useState } from 'react';
import { useAxios } from '../../hooks/useAxios';
import { api_routes } from '../../utils/routes/api';
import ErrorBoundaryLayout from '../../layouts/ErrorBoundaryLayout';
import FileViewer from '../FileViewer';

export default function RequestInstituteInfo({modal, modalHandler, refetch}:{modal: {status:boolean, id?:number}; modalHandler: (value:{status:boolean, id?:number})=>void; refetch: ()=>void}) {
    const {data, isFetching, isLoading, isRefetching, refetch:refetchData, error } = useRequestInstituteQuery(modal.id ? modal.id : 0, (modal.status && modal.id!==undefined && modal.id>0));
    const [isMobile] = useMediaQuery('(max-width: 700px)');
    const {deleteHandler, deleteLoading} = useDeleteQuery();
    const {toastError, toastSuccess} = useToast();
    const [approveLoading, setApproveLoading] = useState<boolean>(false);
    const axios = useAxios();

    const onRejectHandler = async (id:number) => {
        await deleteHandler(api_routes.admin.request_institute.delete(id));
        modalHandler({status:false})
        refetch();
    }
    
    const onApproveHandler = async (id:number) => {
        setApproveLoading(true)
        try {
            await axios.post(api_routes.admin.request_institute.approve(id), {});
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
                    <Panel header="Institute Request" className='info-modal-panel' bordered>

                        <Stack alignItems="flex-start" direction={isMobile ? 'column' : 'row'} spacing={10} className='info-modal-stack'>
                            <HeadingGroup className='mb-1'>
                                <Heading level={6} className='info-heading'>Name</Heading>
                                <Text>{data?.name}</Text>
                            </HeadingGroup>
                            <HeadingGroup className='mb-1'>
                                <Heading level={6} className='info-heading'>Email</Heading>
                                <Text>{data?.email}</Text>
                            </HeadingGroup>
                        </Stack>
                        <Stack direction={isMobile ? 'column' : 'row'} spacing={10} className='info-modal-stack'>
                            <HeadingGroup className='mb-1'>
                                <Heading level={6} className='info-heading'>Mobile</Heading>
                                <Text>{data?.mobile}</Text>
                            </HeadingGroup>
                            <HeadingGroup className='mb-1'>
                                <Heading level={6} className='info-heading'>Pincode</Heading>
                                <Text>{data?.pincode}</Text>
                            </HeadingGroup>
                        </Stack>
                        <Stack direction={isMobile ? 'column' : 'row'} spacing={10} className='info-modal-stack'>
                            <HeadingGroup className='mb-1'>
                                <Heading level={6} className='info-heading'>District</Heading>
                                <Text>{data?.taluq.city.name}</Text>
                            </HeadingGroup>
                            <HeadingGroup className='mb-1'>
                                <Heading level={6} className='info-heading'>Taluq</Heading>
                                <Text>{data?.taluq.name}</Text>
                            </HeadingGroup>
                        </Stack>
                        <HeadingGroup className='mb-1'>
                            <Heading level={6} className='info-heading'>Address</Heading>
                            <Text>{data?.address}</Text>
                        </HeadingGroup>
                        <HeadingGroup className='mb-1'>
                            <Heading level={6} className='mb-1 info-heading'>Register Doc</Heading>
                            <FileViewer src={data?.register_doc} />
                        </HeadingGroup>
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