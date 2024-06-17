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
    profile_verify: "/api/v1/account/verify",
    password_update: "/api/v1/account/update-password",
  },
  admin: {
    graduation: {
      excel: "/api/admin/v1/graduations/excel",
      all: "/api/admin/v1/graduations/all",
      paginate: "/api/admin/v1/graduations/paginate",
      create: "/api/admin/v1/graduations/create",
      update: (id: string | number) => `/api/admin/v1/graduations/update/${id}`,
      delete: (id: string | number) => `/api/admin/v1/graduations/delete/${id}`,
      view: (id: string | number) => `/api/admin/v1/graduations/view/${id}`,
    },
  },
} as const;
