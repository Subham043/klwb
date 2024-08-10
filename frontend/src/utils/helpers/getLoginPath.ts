import { RolesEnum } from "../constants/role";
import { page_routes } from "../routes/pages";

export const getLoginPath = (role: RolesEnum) => {
  switch (role.toLowerCase()) {
    case RolesEnum.STUDENT:
      return page_routes.student.auth.login;
    case RolesEnum.INSTITUTE:
    case RolesEnum.INSTITUTE_STAFF:
      return page_routes.institute.auth.login;
    case RolesEnum.INDUSTRY:
    case RolesEnum.INDUSTRY_STAFF:
      return page_routes.industry.auth.login;
    case RolesEnum.FINANCIAL_OFFICER:
    case RolesEnum.PAYMENT_OFFICER:
    case RolesEnum.VERIFICATION_OFFICER:
    case RolesEnum.ADMIN:
    case RolesEnum.SUPER_ADMIN:
      return page_routes.admin.auth.login;
    default:
      return page_routes.student.auth.login;
  }
};
