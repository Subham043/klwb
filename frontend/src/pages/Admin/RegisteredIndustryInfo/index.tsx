import { FC } from "react"
import { useParams } from "react-router-dom"
import DetailLayout from "../../../layouts/DetailLayout";
import Staff from "../../../components/Admin/RegisteredIndustryInfo/Staff";
import Scholarship from "../../../components/Admin/RegisteredIndustryInfo/Scholarship";
import IndustryInfo from "../../../components/Admin/RegisteredIndustryInfo/IndustryInfo";


const RegisteredIndustryInfo:FC = () => {
    const {id} = useParams<{ id: string }>();

    return <DetailLayout title="Registered Industry Information">
        <IndustryInfo id={Number(id)} />
        <Scholarship />
        <Staff id={Number(id)} />
    </DetailLayout>
}

export default RegisteredIndustryInfo