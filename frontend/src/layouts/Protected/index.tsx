import {FC} from "react";
import {Navigate, useLocation} from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import SuspenseOutlet from "../../components/SuspenseOutlet";
import { page_routes } from "../../utils/routes/pages";

type ProtectedLayoutProps = {
  navigation_link?:string
}

/*
 * Layout to redirect the user to auth screen if not logged in else display dashboard or protected screen
 */
const ProtectedLayout: FC<ProtectedLayoutProps> = ({navigation_link = page_routes.student.auth.login}) => {
  const location = useLocation();
  const {isAuthenticated} = useUser();

  return isAuthenticated ? <SuspenseOutlet /> : 
  <Navigate to={navigation_link} state={{from: location}} replace />;
};

export const AdminProtectedLayout = () => <ProtectedLayout navigation_link={page_routes.admin.auth.login} />
export const StudentProtectedLayout = () => <ProtectedLayout navigation_link={page_routes.student.auth.login} />
export const InstituteProtectedLayout = () => <ProtectedLayout navigation_link={page_routes.institute.auth.login} />