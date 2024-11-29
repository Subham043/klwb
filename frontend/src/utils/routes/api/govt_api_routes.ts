/*
	* Govt API routes list
	*/

import { official_api_routes } from "./official_api_routes";

export const govt_api_routes = {
	...official_api_routes,
	scholarship: {
		list: "/api/govt/v1/scholarship/list",
		excel: "/api/govt/v1/scholarship/excel",
		view: (id: string | number) => `/api/govt/v1/scholarship/view/${id}`,
		pdf: (id: string | number) => `/api/govt/v1/scholarship/pdf/${id}`,
		approve: (id: string | number) => `/api/govt/v1/scholarship/approve/${id}`,
		reject: (id: string | number) => `/api/govt/v1/scholarship/reject/${id}`,
		note: (id: string | number) => `/api/govt/v1/scholarship/note/${id}`,
		institute_confirmation_pdf: (id: string | number) => `/api/govt/v1/scholarship/institute-confirmation-pdf/${id}`,
		industry_confirmation_pdf: (id: string | number) => `/api/govt/v1/scholarship/industry-confirmation-pdf/${id}`,
	},
	report: {
			scholarship: {
					list: "/api/govt/v1/report/scholarship/list",
					excel: "/api/govt/v1/report/scholarship/excel",
			}
},
dashboard: "/api/govt/v1/dashboard",
} as const;
