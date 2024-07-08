import { page_routes } from "./page_routes";

export const getLoginPath = (role: string) => {
  switch (role.toLowerCase()) {
    case "student":
      return page_routes.auth.student.login;
    case "institute":
      return page_routes.auth.institute.login;
    case "industry":
      return page_routes.auth.industry.login;
    case "contribution":
      return page_routes.auth.contribution.login;
    case "govt":
      return page_routes.auth.govt.login;
    case "admin":
      return page_routes.auth.admin.login;
    default:
      return page_routes.auth.student.login;
  }
};

export const getResetPasswordPath = (role: string, token: string) => {
  switch (role.toLowerCase()) {
    case "student":
      return (
        page_routes.auth.reset_password.replace(":token", token) +
        "?type=student"
      );
    case "institute":
      return (
        page_routes.auth.reset_password.replace(":token", token) +
        "?type=institute"
      );
    case "industry":
      return (
        page_routes.auth.reset_password.replace(":token", token) +
        "?type=industry"
      );
    case "contribution":
      return (
        page_routes.auth.reset_password.replace(":token", token) +
        "?type=contribution"
      );
    case "govt":
      return (
        page_routes.auth.reset_password.replace(":token", token) + "?type=govt"
      );
    case "admin":
      return (
        page_routes.auth.reset_password.replace(":token", token) + "?type=admin"
      );
    default:
      return (
        page_routes.auth.reset_password.replace(":token", token) +
        "?type=student"
      );
  }
};

export const getLanguage = (lang: string) => {
  switch (lang.toLowerCase()) {
    case "kannada":
      return "kannada";
    case "english":
      return "english";
    default:
      return "english";
  }
};
