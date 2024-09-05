/*
	* Official API routes list
	*/

export const official_api_routes = {
  auth: {
    login: {
      email: "/api/official/v1/auth/login-via-email",
      phone: "/api/official/v1/auth/login-via-phone",
    },
    forgot_password: {
      email: "/api/official/v1/auth/forgot-password-via-email",
      phone: "/api/official/v1/auth/forgot-password-via-phone",
    },
    reset_password: {
      index: "/api/official/v1/auth/reset-password",
      resend_otp: "/api/official/v1/auth/reset-password-resend-otp",
    },
    logout: "/api/official/v1/auth/logout",
  },
  account: {
    profile: "/api/official/v1/account",
    profile_update: "/api/official/v1/account/update",
    password_update: "/api/official/v1/account/update-password",
    profile_verify: "/api/official/v1/account/verify",
    resend_otp: "/api/official/v1/account/resend-otp",
  },
} as const;
