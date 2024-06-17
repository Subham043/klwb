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
    role: "/api/admin/v1/roles/all",
    graduation: {
      excel: "/api/admin/v1/graduations/excel",
      all: "/api/admin/v1/graduations/all",
      paginate: "/api/admin/v1/graduations/paginate",
      create: "/api/admin/v1/graduations/create",
      update: (id: string | number) => `/api/admin/v1/graduations/update/${id}`,
      delete: (id: string | number) => `/api/admin/v1/graduations/delete/${id}`,
      view: (id: string | number) => `/api/admin/v1/graduations/view/${id}`,
    },
    course: {
      excel: "/api/admin/v1/courses/excel",
      all: "/api/admin/v1/courses/all",
      paginate: "/api/admin/v1/courses/paginate",
      create: "/api/admin/v1/courses/create",
      update: (id: string | number) => `/api/admin/v1/courses/update/${id}`,
      delete: (id: string | number) => `/api/admin/v1/courses/delete/${id}`,
      view: (id: string | number) => `/api/admin/v1/courses/view/${id}`,
    },
    class: {
      excel: "/api/admin/v1/classes/excel",
      all: "/api/admin/v1/classes/all",
      paginate: "/api/admin/v1/classes/paginate",
      create: "/api/admin/v1/classes/create",
      update: (id: string | number) => `/api/admin/v1/classes/update/${id}`,
      delete: (id: string | number) => `/api/admin/v1/classes/delete/${id}`,
      view: (id: string | number) => `/api/admin/v1/classes/view/${id}`,
    },
    employee: {
      excel: "/api/admin/v1/employees/excel",
      all: "/api/admin/v1/employees/all",
      paginate: "/api/admin/v1/employees/paginate",
      create: "/api/admin/v1/employees/create",
      update: (id: string | number) => `/api/admin/v1/employees/update/${id}`,
      delete: (id: string | number) => `/api/admin/v1/employees/delete/${id}`,
      view: (id: string | number) => `/api/admin/v1/employees/view/${id}`,
    },
  },
} as const;
