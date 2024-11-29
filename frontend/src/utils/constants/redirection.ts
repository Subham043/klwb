import { page_routes } from "../routes/pages";
import { RolesEnum } from "./role";


export const loginRedirect = (role: RolesEnum) => {
	switch (role) {
		case RolesEnum.SUPER_ADMIN:
			case RolesEnum.ADMIN:
			return page_routes.admin.dashboard;
		case RolesEnum.FINANCIAL_OFFICER:
			return page_routes.finance.dashboard;
		case RolesEnum.PAYMENT_OFFICER:
			return page_routes.payment_officer.dashboard;
		case RolesEnum.VERIFICATION_OFFICER:
			return page_routes.govt.dashboard;
		case RolesEnum.INDUSTRY:
		case RolesEnum.INDUSTRY_STAFF:
			return page_routes.industry.dashboard;
		case RolesEnum.INSTITUTE:
		case RolesEnum.INSTITUTE_STAFF:
			return page_routes.institute.dashboard;
		case RolesEnum.STUDENT:
			return page_routes.student.dashboard;

		default:
			return page_routes.student.dashboard;
	}
};