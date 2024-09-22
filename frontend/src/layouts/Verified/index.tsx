import {FC} from "react";
import { useUser } from "../../hooks/useUser";
import SuspenseOutlet from "../../components/SuspenseOutlet";
import AccountVerify from "../../pages/AccountVerify";
import { api_routes } from "../../utils/routes/api";
import { VerificationEnum } from "../../utils/constants/verified";

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

  return (isAuthenticated && user && user.verified===VerificationEnum.VERIFIED) ? <SuspenseOutlet /> : 
  <AccountVerify {...props} />;
};

export const AdminVerifiedLayout = () => <VerifiedLayout profile_verify_api_link={api_routes.admin.account.profile_verify} logout_api_link={api_routes.admin.auth.logout} resend_otp_api_link={api_routes.admin.account.resend_otp} />
export const StudentVerifiedLayout = () => <VerifiedLayout profile_verify_api_link={api_routes.user.account.profile_verify} logout_api_link={api_routes.user.auth.logout} resend_otp_api_link={api_routes.user.account.resend_otp} />
export const InstituteVerifiedLayout = () => <VerifiedLayout profile_verify_api_link={api_routes.institute.account.profile_verify} logout_api_link={api_routes.institute.auth.logout} resend_otp_api_link={api_routes.institute.account.resend_otp} />
export const IndustryVerifiedLayout = () => <VerifiedLayout profile_verify_api_link={api_routes.industry.account.profile_verify} logout_api_link={api_routes.industry.auth.logout} resend_otp_api_link={api_routes.industry.account.resend_otp} />
export const GovtVerifiedLayout = () => <VerifiedLayout profile_verify_api_link={api_routes.govt.account.profile_verify} logout_api_link={api_routes.govt.auth.logout} resend_otp_api_link={api_routes.govt.account.resend_otp} />