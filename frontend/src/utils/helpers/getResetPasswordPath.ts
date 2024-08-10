import { RolesEnum } from "../constants/role";
import { page_routes } from "../routes/pages";

export const getResetPasswordPath = (role: RolesEnum, token: string) => {
  switch (role.toLowerCase()) {
    case RolesEnum.STUDENT:
      return (
        page_routes.student.auth.reset_password.replace(":token", token) +
        "?type=student"
      );
    case RolesEnum.INSTITUTE:
    case RolesEnum.INSTITUTE_STAFF:
      return (
        page_routes.institute.auth.reset_password.replace(":token", token) +
        "?type=institute"
      );
    case RolesEnum.INDUSTRY:
    case RolesEnum.INDUSTRY_STAFF:
      return (
        page_routes.industry.auth.reset_password.replace(":token", token) +
        "?type=industry"
      );
    case RolesEnum.FINANCIAL_OFFICER:
    case RolesEnum.PAYMENT_OFFICER:
    case RolesEnum.VERIFICATION_OFFICER:
    case RolesEnum.ADMIN:
    case RolesEnum.SUPER_ADMIN:
    case "admin":
      return (
        page_routes.admin.auth.reset_password.replace(":token", token) +
        "?type=admin"
      );
    default:
      return (
        page_routes.student.auth.reset_password.replace(":token", token) +
        "?type=student"
      );
  }
};
