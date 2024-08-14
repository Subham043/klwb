import { FC } from "react"
import { useParams } from "react-router-dom"
import DetailLayout from "../../layouts/DetailLayout";
import Staff from "../../components/IndustryRegisteredInfo/Staff";
import Scholarship from "../../components/IndustryRegisteredInfo/Scholarship";
import IndustryInfo from "../../components/IndustryRegisteredInfo/IndustryInfo";


const IndustryRegisteredInfo:FC = () => {
    const {id} = useParams<{ id: string }>();

    return <DetailLayout title="Registered Industry Information">
        <IndustryInfo id={Number(id)} />
        <Scholarship />
        <Staff id={Number(id)} />
    </DetailLayout>
}

export default IndustryRegisteredInfo