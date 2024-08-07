/*
 * API routes list
 */

export const api_routes = {
  dashboard: "/api/v1",
  user: {
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
      institute: {
        request: "/api/v1/auth/request-institutes/create",
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
  },
  admin: {
    auth: {
      login: {
        email: "/api/admin/v1/auth/login-via-email",
        phone: "/api/admin/v1/auth/login-via-phone",
      },
      forgot_password: {
        email: "/api/admin/v1/auth/forgot-password-via-email",
        phone: "/api/admin/v1/auth/forgot-password-via-phone",
      },
      reset_password: {
        index: "/api/admin/v1/auth/reset-password",
        resend_otp: "/api/admin/v1/auth/reset-password-resend-otp",
      },
      logout: "/api/admin/v1/auth/logout",
    },
    account: {
      profile: "/api/admin/v1/account",
      profile_update: "/api/admin/v1/account/update",
      password_update: "/api/admin/v1/account/update-password",
      profile_verify: "/api/admin/v1/account/verify",
      resend_otp: "/api/admin/v1/account/resend-otp",
    },
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
    state: {
      excel: "/api/admin/v1/states/excel",
      all: "/api/admin/v1/states/all",
      paginate: "/api/admin/v1/states/paginate",
      create: "/api/admin/v1/states/create",
      update: (id: string | number) => `/api/admin/v1/states/update/${id}`,
      delete: (id: string | number) => `/api/admin/v1/states/delete/${id}`,
      view: (id: string | number) => `/api/admin/v1/states/view/${id}`,
    },
    city: {
      excel: "/api/admin/v1/cities/excel",
      all: "/api/admin/v1/cities/all",
      paginate: "/api/admin/v1/cities/paginate",
      create: "/api/admin/v1/cities/create",
      update: (id: string | number) => `/api/admin/v1/cities/update/${id}`,
      delete: (id: string | number) => `/api/admin/v1/cities/delete/${id}`,
      view: (id: string | number) => `/api/admin/v1/cities/view/${id}`,
    },
    taluq: {
      excel: "/api/admin/v1/taluqs/excel",
      all: "/api/admin/v1/taluqs/all",
      paginate: "/api/admin/v1/taluqs/paginate",
      create: "/api/admin/v1/taluqs/create",
      update: (id: string | number) => `/api/admin/v1/taluqs/update/${id}`,
      delete: (id: string | number) => `/api/admin/v1/taluqs/delete/${id}`,
      view: (id: string | number) => `/api/admin/v1/taluqs/view/${id}`,
    },
    security_question: {
      excel: "/api/admin/v1/security-questions/excel",
      all: "/api/admin/v1/security-questions/all",
      paginate: "/api/admin/v1/security-questions/paginate",
      create: "/api/admin/v1/security-questions/create",
      update: (id: string | number) =>
        `/api/admin/v1/security-questions/update/${id}`,
      delete: (id: string | number) =>
        `/api/admin/v1/security-questions/delete/${id}`,
      view: (id: string | number) =>
        `/api/admin/v1/security-questions/view/${id}`,
    },
    application_date: {
      excel: "/api/admin/v1/application-dates/excel",
      all: "/api/admin/v1/application-dates/all",
      paginate: "/api/admin/v1/application-dates/paginate",
      create: "/api/admin/v1/application-dates/create",
      update: (id: string | number) =>
        `/api/admin/v1/application-dates/update/${id}`,
      delete: (id: string | number) =>
        `/api/admin/v1/application-dates/delete/${id}`,
      view: (id: string | number) =>
        `/api/admin/v1/application-dates/view/${id}`,
    },
    application_fee: {
      excel: "/api/admin/v1/fees/excel",
      all: "/api/admin/v1/fees/all",
      paginate: "/api/admin/v1/fees/paginate",
      create: "/api/admin/v1/fees/create",
      update: (id: string | number) => `/api/admin/v1/fees/update/${id}`,
      delete: (id: string | number) => `/api/admin/v1/fees/delete/${id}`,
      view: (id: string | number) => `/api/admin/v1/fees/view/${id}`,
    },
    registered_institute: {
      excel: "/api/admin/v1/registered-institutes/excel",
      all: "/api/admin/v1/registered-institutes/all",
      paginate: "/api/admin/v1/registered-institutes/paginate",
      create: "/api/admin/v1/registered-institutes/create",
      update: (id: string | number) =>
        `/api/admin/v1/registered-institutes/update/${id}`,
      delete: (id: string | number) =>
        `/api/admin/v1/registered-institutes/delete/${id}`,
      view: (id: string | number) =>
        `/api/admin/v1/registered-institutes/view/${id}`,
    },
    request_institute: {
      excel: "/api/admin/v1/request-institutes/excel",
      all: "/api/admin/v1/request-institutes/all",
      paginate: "/api/admin/v1/request-institutes/paginate",
      update: (id: string | number) =>
        `/api/admin/v1/request-institutes/update/${id}`,
      approve: (id: string | number) =>
        `/api/admin/v1/request-institutes/approve/${id}`,
      delete: (id: string | number) =>
        `/api/admin/v1/request-institutes/delete/${id}`,
      view: (id: string | number) =>
        `/api/admin/v1/request-institutes/view/${id}`,
    },
  },
} as const;
