import { FC } from "react"
import { Navigate } from "react-router-dom"
import { page_routes } from "../../utils/page_routes";
import { useUser } from "../../hooks/useUser";
import SuspenseOutlet from "../../components/SuspenseOutlet";

type GuestLayoutProps = {
  navigation_link?:string
}
/*
  * Layout to redirect the user to main screen if logged in else display auth or unprotected screen
*/
const GuestLayout:FC<GuestLayoutProps> = ({navigation_link = page_routes.dashboard}) => {
    const { isAuthenticated } = useUser();

    return (
        !isAuthenticated
        ? <SuspenseOutlet />
        : <Navigate to={navigation_link} />
    )
}

export default GuestLayout