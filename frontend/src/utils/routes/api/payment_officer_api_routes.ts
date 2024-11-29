/*
	* Govt API routes list
	*/

import { official_api_routes } from "./official_api_routes";

export const payment_officer_api_routes = {
	...official_api_routes,
	contribution: {
		list: "/api/payment-officer/v1/contribution/list",
		excel: "/api/payment-officer/v1/contribution/excel",
		view: (id: string | number) => `/api/payment-officer/v1/contribution/view/${id}`,
		reciept: (id: string | number) => `/api/payment-officer/v1/contribution/reciept/${id}`,
	},
  non_contribution: {
		list: "/api/payment-officer/v1/non-contribution/list",
		excel: "/api/payment-officer/v1/non-contribution/excel",
		view: (id: string | number) => `/api/payment-officer/v1/non-contribution/view/${id}`,
	},
  dashboard: "/api/payment-officer/v1/dashboard",
} as const;
