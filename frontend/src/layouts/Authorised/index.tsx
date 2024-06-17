import {FC} from "react";
import { Outlet } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import { Role } from "../../utils/types";
import PageNotFound from "../../pages/PageNotFound";

/*
 * Layout to redirect the user to auth screen if not logged in else display dashboard or protected screen
 */
const AuthorisedLayout: FC<{roles: Role[]}> = ({roles}) => {
  const {isAuthenticated, user} = useUser();

  return (isAuthenticated && user && user.verified==="VERIFIED" && roles.includes(user.role ? user.role : 'Student')) ? <Outlet /> : 
  <PageNotFound />;
};

export default AuthorisedLayout;
