/*
	* Industry API routes list
	*/

export const industry_api_routes = {
	auth: {
		login: {
			email: "/api/industry/v1/auth/login-via-email",
			phone: "/api/industry/v1/auth/login-via-phone",
		},
		forgot_password: {
			email: "/api/industry/v1/auth/forgot-password-via-email",
			phone: "/api/industry/v1/auth/forgot-password-via-phone",
		},
		reset_password: {
			index: "/api/industry/v1/auth/reset-password",
			resend_otp: "/api/industry/v1/auth/reset-password-resend-otp",
		},
		register: {
			industry: "/api/industry/v1/auth/register/industry",
			request: "/api/industry/v1/auth/request-industries/create",
		},
		logout: "/api/industry/v1/auth/logout",
	},
	account: {
		profile: "/api/industry/v1/account",
		info: "/api/industry/v1/account/info",
		info_update: "/api/industry/v1/account/info-update",
		doc_update: "/api/industry/v1/account/doc-update",
		profile_update: "/api/industry/v1/account/update",
		password_update: "/api/industry/v1/account/update-password",
		profile_verify: "/api/industry/v1/account/verify",
		resend_otp: "/api/industry/v1/account/resend-otp",
	},
	scholarship: {
		list: "/api/industry/v1/scholarship/list",
		view: (id: string | number) => `/api/industry/v1/scholarship/view/${id}`,
		approve: (id: string | number) => `/api/industry/v1/scholarship/approve/${id}`,
		reject: (id: string | number) => `/api/industry/v1/scholarship/reject/${id}`,
	},
	employee: {
		excel: "/api/industry/v1/employees/excel",
		all: "/api/industry/v1/employees/all",
		paginate: "/api/industry/v1/employees/paginate",
		create: "/api/industry/v1/employees/create",
		update: (id: string | number) => `/api/industry/v1/employees/update/${id}`,
		delete: (id: string | number) => `/api/industry/v1/employees/delete/${id}`,
		view: (id: string | number) => `/api/industry/v1/employees/view/${id}`,
},
dashboard: "/api/industry/v1/dashboard",
} as const;
