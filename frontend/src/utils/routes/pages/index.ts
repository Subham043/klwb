import { admin_page_routes } from "./admin_page_routes";
import { industry_page_routes } from "./industry_page_routes";
import { institute_page_routes } from "./institute_page_routes";
import { student_page_routes } from "./student_page_routes";

export const page_routes = {
	main: '/',
	student: {
		...student_page_routes,
	},
	institute: {
		...institute_page_routes,
	},
	industry: {
		...industry_page_routes,
	},
	admin: {
		...admin_page_routes,
	},
} as const;