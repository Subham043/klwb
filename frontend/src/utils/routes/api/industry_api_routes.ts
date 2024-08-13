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
		profile_update: "/api/industry/v1/account/update",
		password_update: "/api/industry/v1/account/update-password",
		profile_verify: "/api/industry/v1/account/verify",
		resend_otp: "/api/industry/v1/account/resend-otp",
	},
} as const;