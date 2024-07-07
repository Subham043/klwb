import {FC} from "react";
import { useUser } from "../../hooks/useUser";
import AccountVerify from "../../pages/AccountVerify";
import SuspenseOutlet from "../../components/SuspenseOutlet";

/*
 * Layout to redirect the user to auth screen if not logged in else display dashboard or protected screen
 */
const VerifiedLayout: FC = () => {
  const {isAuthenticated, user} = useUser();

  return (isAuthenticated && user && user.verified==="VERIFIED") ? <SuspenseOutlet /> : 
  <AccountVerify />;
};

export default VerifiedLayout;
