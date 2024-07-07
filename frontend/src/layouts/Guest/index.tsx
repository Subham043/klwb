import { FC } from "react"
import { Navigate } from "react-router-dom"
import { page_routes } from "../../utils/page_routes";
import { useUser } from "../../hooks/useUser";
import SuspenseOutlet from "../../components/SuspenseOutlet";

/*
  * Layout to redirect the user to main screen if logged in else display auth or unprotected screen
*/
const GuestLayout:FC = () => {
    const { isAuthenticated } = useUser();

    return (
        !isAuthenticated
        ? <SuspenseOutlet />
        : <Navigate to={page_routes.dashboard} />
    )
}

export default GuestLayout