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
		profile_update: "/api/institute/v1/account/update",
		password_update: "/api/institute/v1/account/update-password",
		profile_verify: "/api/institute/v1/account/verify",
		resend_otp: "/api/institute/v1/account/resend-otp",
	},
} as const;
