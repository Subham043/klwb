import { FC } from "react"
import { useParams } from "react-router-dom"
import DetailLayout from "../../layouts/DetailLayout";
import Staff from "../../components/InstituteRegisteredInfo/Staff";
import Scholarship from "../../components/InstituteRegisteredInfo/Scholarship";
import InstituteInfo from "../../components/InstituteRegisteredInfo/InstituteInfo";


const InstituteRegisteredInfo:FC = () => {
    const {id} = useParams<{ id: string }>();

    return <DetailLayout title="Registered Institute Information">
        <InstituteInfo id={Number(id)} />
        <Scholarship />
        <Staff id={Number(id)} />
    </DetailLayout>
}

export default InstituteRegisteredInfo