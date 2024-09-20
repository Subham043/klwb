import { FC } from "react"
import { useParams } from "react-router-dom"
import DetailLayout from "../../../layouts/DetailLayout";
import Staff from "../../../components/Admin/RegisteredInstituteInfo/Staff";
import Scholarship from "../../../components/Admin/RegisteredInstituteInfo/Scholarship";
import InstituteInfo from "../../../components/Admin/RegisteredInstituteInfo/InstituteInfo";


const RegisteredInstituteInfo:FC = () => {
    const {id} = useParams<{ id: string }>();

    return <DetailLayout title="Registered Institute Information">
        <InstituteInfo id={Number(id)} />
        <Scholarship id={Number(id)} />
        <Staff id={Number(id)} />
    </DetailLayout>
}

export default RegisteredInstituteInfo