import {FC} from "react";
import { useUser } from "../../hooks/useUser";
import PageNotFound from "../../pages/PageNotFound";
import SuspenseOutlet from "../../components/SuspenseOutlet";
import { RolesEnum } from "../../utils/constants/role";
import { VerificationEnum } from "../../utils/constants/verified";
/*
 * Layout to redirect the user to auth screen if not logged in else display dashboard or protected screen
 */
const AuthorisedLayout: FC<{roles: RolesEnum[]}> = ({roles}) => {
  const {isAuthenticated, user} = useUser();

  return (isAuthenticated && user && user.verified===VerificationEnum.VERIFIED && roles.includes(user.role ? user.role : RolesEnum.STUDENT)) ? <SuspenseOutlet /> : 
  <PageNotFound />;
};

export const AdminAuthorisedLayout = () => <AuthorisedLayout roles={[RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN]} />
export const StudentAuthorisedLayout = () => <AuthorisedLayout roles={[RolesEnum.STUDENT]} />
export const InstituteAuthorisedLayout = ({roles}:{roles?: RolesEnum[]}) => <AuthorisedLayout roles={roles || [RolesEnum.INSTITUTE, RolesEnum.INSTITUTE_STAFF]} />
export const IndustryAuthorisedLayout = ({roles}:{roles?: RolesEnum[]}) => <AuthorisedLayout roles={roles || [RolesEnum.INDUSTRY, RolesEnum.INDUSTRY_STAFF]} />
export const GovtAuthorisedLayout = () => <AuthorisedLayout roles={[RolesEnum.VERIFICATION_OFFICER]} />
export const FinanceAuthorisedLayout = () => <AuthorisedLayout roles={[RolesEnum.FINANCIAL_OFFICER]} />