import {FC} from "react";
import { Outlet } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import AccountVerify from "../../pages/AccountVerify";

/*
 * Layout to redirect the user to auth screen if not logged in else display dashboard or protected screen
 */
const VerifiedLayout: FC = () => {
  const {isAuthenticated, user} = useUser();

  return (isAuthenticated && user && user.verified==="VERIFIED") ? <Outlet /> : 
  <AccountVerify />;
};

export default VerifiedLayout;
