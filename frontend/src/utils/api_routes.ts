/*
 * API routes list
 */

export const api_routes = {
  dashboard: "/api/v1",
  auth: {
    login: {
      email: "/api/v1/auth/login-via-email",
      phone: "/api/v1/auth/login-via-phone",
    },
    forgot_password: {
      email: "/api/v1/auth/forgot-password-via-email",
      phone: "/api/v1/auth/forgot-password-via-phone",
    },
    register: {
      student: "/api/v1/auth/register/student",
    },
    reset_password: "/api/v1/auth/reset-password",
    logout: "/api/v1/auth/logout",
  },
  account: {
    profile: "/api/v1/account",
    profile_update: "/api/v1/account/update",
    password_update: "/api/v1/account/update-password",
  },
} as const;
