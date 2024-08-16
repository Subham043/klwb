/*
	* Student API routes list
	*/

export const user_api_routes = {
	graduation: {
		all: "/api/v1/graduations/all",
	},
	course: {
		all: "/api/v1/courses/all",
	},
	class: {
		all: "/api/v1/classes/all",
	},
	state: {
		all: "/api/v1/states/all",
	},
	city: {
		all: "/api/v1/cities/all",
	},
	taluq: {
		all: "/api/v1/taluqs/all",
	},
	security_question: {
		all: "/api/v1/security-questions/all",
	},
	registered_institute: {
		all: "/api/v1/registered-institutes/all",
	},
	registered_industry: {
		all: "/api/v1/registered-industries/all",
	},
	auth: {
		login: {
			email: "/api/v1/auth/login-via-email",
			phone: "/api/v1/auth/login-via-phone",
		},
		forgot_password: {
			email: "/api/v1/auth/forgot-password-via-email",
			phone: "/api/v1/auth/forgot-password-via-phone",
		},
		reset_password: {
			index: "/api/v1/auth/reset-password",
			resend_otp: "/api/v1/auth/reset-password-resend-otp",
		},
		register: {
			student: "/api/v1/auth/register/student",
		},
		logout: "/api/v1/auth/logout",
	},
	account: {
		profile: "/api/v1/account",
		profile_update: "/api/v1/account/update",
		password_update: "/api/v1/account/update-password",
		profile_verify: "/api/v1/account/verify",
		resend_otp: "/api/v1/account/resend-otp",
	},
	scholarship: {
		apply: "/api/v1/scholarship/apply",
		status: "/api/v1/scholarship/status",
	}
} as const;
