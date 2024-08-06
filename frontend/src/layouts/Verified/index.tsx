import {FC} from "react";
import { useUser } from "../../hooks/useUser";
import SuspenseOutlet from "../../components/SuspenseOutlet";
import AccountVerify from "../../pages/AccountVerify";

type VerifiedLayoutProps = {
    profile_verify_api_link?: string;
    logout_api_link?: string;
    resend_otp_api_link?: string;
}

/*
 * Layout to redirect the user to auth screen if not logged in else display dashboard or protected screen
 */
const VerifiedLayout: FC<VerifiedLayoutProps> = (props) => {
  const {isAuthenticated, user} = useUser();

  return (isAuthenticated && user && user.verified==="VERIFIED") ? <SuspenseOutlet /> : 
  <AccountVerify {...props} />;
};

export default VerifiedLayout;
