import {FC} from "react";
import { useUser } from "../../hooks/useUser";
import { Role } from "../../utils/types";
import PageNotFound from "../../pages/PageNotFound";
import SuspenseOutlet from "../../components/SuspenseOutlet";

/*
 * Layout to redirect the user to auth screen if not logged in else display dashboard or protected screen
 */
const AuthorisedLayout: FC<{roles: Role[]}> = ({roles}) => {
  const {isAuthenticated, user} = useUser();

  return (isAuthenticated && user && user.verified==="VERIFIED" && roles.includes(user.role ? user.role : 'Student')) ? <SuspenseOutlet /> : 
  <PageNotFound />;
};

export default AuthorisedLayout;
