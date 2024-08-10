import { FC } from "react"
import { Navigate } from "react-router-dom"
import { useUser } from "../../hooks/useUser";
import SuspenseOutlet from "../../components/SuspenseOutlet";
import { page_routes } from "../../utils/routes/pages";

type GuestLayoutProps = {
  navigation_link?:string
}
/*
  * Layout to redirect the user to main screen if logged in else display auth or unprotected screen
*/
const GuestLayout:FC<GuestLayoutProps> = ({navigation_link = page_routes.student.dashboard}) => {
    const { isAuthenticated } = useUser();

    return (
        !isAuthenticated
        ? <SuspenseOutlet />
        : <Navigate to={navigation_link} />
    )
}

export const AdminGuestLayout = () => <GuestLayout navigation_link={page_routes.admin.dashboard} />
export const StudentGuestLayout = () => <GuestLayout navigation_link={page_routes.student.dashboard} />
export const InstituteGuestLayout = () => <GuestLayout navigation_link={page_routes.institute.dashboard} />