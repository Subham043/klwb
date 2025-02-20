/*
	* Institute API routes list
	*/

export const institute_api_routes = {
	auth: {
		login: {
			email: "/api/institute/v1/auth/login-via-email",
			phone: "/api/institute/v1/auth/login-via-phone",
		},
		forgot_password: {
			email: "/api/institute/v1/auth/forgot-password-via-email",
			phone: "/api/institute/v1/auth/forgot-password-via-phone",
		},
		reset_password: {
			index: "/api/institute/v1/auth/reset-password",
			resend_otp: "/api/institute/v1/auth/reset-password-resend-otp",
		},
		register: {
			institute: "/api/institute/v1/auth/register/institute",
			request: "/api/institute/v1/auth/request-institutes/create",
		},
		logout: "/api/institute/v1/auth/logout",
	},
	account: {
		profile: "/api/institute/v1/account",
		info: "/api/institute/v1/account/info",
		info_update: "/api/institute/v1/account/info-update",
		doc_update: "/api/institute/v1/account/doc-update",
		profile_update: "/api/institute/v1/account/update",
		password_update: "/api/institute/v1/account/update-password",
		profile_verify: "/api/institute/v1/account/verify",
		resend_otp: "/api/institute/v1/account/resend-otp",
	},
	scholarship: {
		list: "/api/institute/v1/scholarship/list",
		excel: "/api/institute/v1/scholarship/excel",
		view: (id: string | number) => `/api/institute/v1/scholarship/view/${id}`,
		pdf: (id: string | number) => `/api/institute/v1/scholarship/pdf/${id}`,
		approve: (id: string | number) => `/api/institute/v1/scholarship/approve/${id}`,
		reject: (id: string | number) => `/api/institute/v1/scholarship/reject/${id}`,
	},
	employee: {
		excel: "/api/institute/v1/employees/excel",
		all: "/api/institute/v1/employees/all",
		paginate: "/api/institute/v1/employees/paginate",
		create: "/api/institute/v1/employees/create",
		update: (id: string | number) => `/api/institute/v1/employees/update/${id}`,
		delete: (id: string | number) => `/api/institute/v1/employees/delete/${id}`,
		view: (id: string | number) => `/api/institute/v1/employees/view/${id}`,
},
dashboard: "/api/institute/v1/dashboard",
} as const;
