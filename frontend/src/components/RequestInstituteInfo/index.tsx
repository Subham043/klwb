import { Button, Divider, Heading, HeadingGroup, Loader, Modal, Panel, Stack, Text, useMediaQuery } from 'rsuite'
import { useRequestInstituteQuery } from '../../hooks/data/request_institute';

export default function RequestInstituteInfo({modal, modalHandler}:{modal: {status:boolean, id?:number}; modalHandler: (value:{status:boolean, id?:number})=>void}) {
    const {data, isFetching, isLoading } = useRequestInstituteQuery(modal.id ? modal.id : 0, (modal.status && modal.id!==undefined && modal.id>0));
    const [isMobile] = useMediaQuery('(max-width: 700px)');

    return (
        <Modal overflow={false} size={"sm"} open={modal.status} onClose={()=>modalHandler({status:false})} className='info-modal'>
            <>
                {(isFetching || isLoading) && <Loader backdrop content="loading..." vertical style={{ zIndex: 1000 }} />}
                <Panel header="Institute Request" className='info-modal-panel' bordered>

                    <Stack divider={<Divider />} direction={isMobile ? 'column' : 'row'} spacing={10} className='info-modal-stack'>
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
                        <img src={data?.register_doc} alt="" style={{objectFit: 'contain', height: '200px'}} />
                    </HeadingGroup>
                </Panel>
            </>
            <Modal.Footer className='mb-1 info-modal-footer'>
                <Button onClick={()=>modalHandler({status:false})} appearance="primary">
                    Ok
                </Button>
                <Button onClick={()=>modalHandler({status:false})} appearance="subtle">
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    )
}