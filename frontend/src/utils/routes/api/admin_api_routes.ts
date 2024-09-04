/*
	* Admin API routes list
	*/

export const admin_api_routes = {
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
  role: "/api/official/v1/roles/all",
  graduation: {
    excel: "/api/official/v1/graduations/excel",
    all: "/api/official/v1/graduations/all",
    paginate: "/api/official/v1/graduations/paginate",
    create: "/api/official/v1/graduations/create",
    update: (id: string | number) => `/api/official/v1/graduations/update/${id}`,
    delete: (id: string | number) => `/api/official/v1/graduations/delete/${id}`,
    view: (id: string | number) => `/api/official/v1/graduations/view/${id}`,
  },
  course: {
    excel: "/api/official/v1/courses/excel",
    all: "/api/official/v1/courses/all",
    paginate: "/api/official/v1/courses/paginate",
    create: "/api/official/v1/courses/create",
    update: (id: string | number) => `/api/official/v1/courses/update/${id}`,
    delete: (id: string | number) => `/api/official/v1/courses/delete/${id}`,
    view: (id: string | number) => `/api/official/v1/courses/view/${id}`,
  },
  class: {
    excel: "/api/official/v1/classes/excel",
    all: "/api/official/v1/classes/all",
    paginate: "/api/official/v1/classes/paginate",
    create: "/api/official/v1/classes/create",
    update: (id: string | number) => `/api/official/v1/classes/update/${id}`,
    delete: (id: string | number) => `/api/official/v1/classes/delete/${id}`,
    view: (id: string | number) => `/api/official/v1/classes/view/${id}`,
  },
  employee: {
    excel: "/api/official/v1/employees/excel",
    all: "/api/official/v1/employees/all",
    paginate: "/api/official/v1/employees/paginate",
    create: "/api/official/v1/employees/create",
    update: (id: string | number) => `/api/official/v1/employees/update/${id}`,
    delete: (id: string | number) => `/api/official/v1/employees/delete/${id}`,
    view: (id: string | number) => `/api/official/v1/employees/view/${id}`,
  },
  state: {
    excel: "/api/official/v1/states/excel",
    all: "/api/official/v1/states/all",
    paginate: "/api/official/v1/states/paginate",
    create: "/api/official/v1/states/create",
    update: (id: string | number) => `/api/official/v1/states/update/${id}`,
    delete: (id: string | number) => `/api/official/v1/states/delete/${id}`,
    view: (id: string | number) => `/api/official/v1/states/view/${id}`,
  },
  city: {
    excel: "/api/official/v1/cities/excel",
    all: "/api/official/v1/cities/all",
    paginate: "/api/official/v1/cities/paginate",
    create: "/api/official/v1/cities/create",
    update: (id: string | number) => `/api/official/v1/cities/update/${id}`,
    delete: (id: string | number) => `/api/official/v1/cities/delete/${id}`,
    view: (id: string | number) => `/api/official/v1/cities/view/${id}`,
  },
  taluq: {
    excel: "/api/official/v1/taluqs/excel",
    all: "/api/official/v1/taluqs/all",
    paginate: "/api/official/v1/taluqs/paginate",
    create: "/api/official/v1/taluqs/create",
    update: (id: string | number) => `/api/official/v1/taluqs/update/${id}`,
    delete: (id: string | number) => `/api/official/v1/taluqs/delete/${id}`,
    view: (id: string | number) => `/api/official/v1/taluqs/view/${id}`,
  },
  security_question: {
    excel: "/api/official/v1/security-questions/excel",
    all: "/api/official/v1/security-questions/all",
    paginate: "/api/official/v1/security-questions/paginate",
    create: "/api/official/v1/security-questions/create",
    update: (id: string | number) =>
      `/api/official/v1/security-questions/update/${id}`,
    delete: (id: string | number) =>
      `/api/official/v1/security-questions/delete/${id}`,
    view: (id: string | number) =>
      `/api/official/v1/security-questions/view/${id}`,
  },
  application_date: {
    excel: "/api/official/v1/application-dates/excel",
    all: "/api/official/v1/application-dates/all",
    paginate: "/api/official/v1/application-dates/paginate",
    create: "/api/official/v1/application-dates/create",
    update: (id: string | number) =>
      `/api/official/v1/application-dates/update/${id}`,
    delete: (id: string | number) =>
      `/api/official/v1/application-dates/delete/${id}`,
    view: (id: string | number) => `/api/official/v1/application-dates/view/${id}`,
  },
  application_fee: {
    excel: "/api/official/v1/fees/excel",
    all: "/api/official/v1/fees/all",
    paginate: "/api/official/v1/fees/paginate",
    create: "/api/official/v1/fees/create",
    update: (id: string | number) => `/api/official/v1/fees/update/${id}`,
    delete: (id: string | number) => `/api/official/v1/fees/delete/${id}`,
    view: (id: string | number) => `/api/official/v1/fees/view/${id}`,
  },
  registered_institute: {
    excel: "/api/official/v1/registered-institutes/excel",
    all: "/api/official/v1/registered-institutes/all",
    paginate: "/api/official/v1/registered-institutes/paginate",
    create: "/api/official/v1/registered-institutes/create",
    update: (id: string | number) =>
      `/api/official/v1/registered-institutes/update/${id}`,
    delete: (id: string | number) =>
      `/api/official/v1/registered-institutes/delete/${id}`,
    view: (id: string | number) =>
      `/api/official/v1/registered-institutes/view/${id}`,
  },
  request_institute: {
    excel: "/api/official/v1/request-institutes/excel",
    all: "/api/official/v1/request-institutes/all",
    paginate: "/api/official/v1/request-institutes/paginate",
    update: (id: string | number) =>
      `/api/official/v1/request-institutes/update/${id}`,
    approve: (id: string | number) =>
      `/api/official/v1/request-institutes/approve/${id}`,
    delete: (id: string | number) =>
      `/api/official/v1/request-institutes/delete/${id}`,
    view: (id: string | number) =>
      `/api/official/v1/request-institutes/view/${id}`,
  },
  institute: {
    registered: {
      excel: "/api/official/v1/institutes/registered/excel",
      paginate: "/api/official/v1/institutes/registered/paginate",
      view: (id: string | number) =>
        `/api/official/v1/institutes/registered/view/${id}`,
      update: (id: string | number) =>
        `/api/official/v1/institutes/registered/update/${id}`,
      update_auth: (id: string | number) =>
        `/api/official/v1/institutes/registered/update-auth/${id}`,
      toggle: (id: string | number) =>
        `/api/official/v1/institutes/registered/toggle-status/${id}`,
      staff: {
        excel: (id: string | number) =>
          `/api/official/v1/institutes/registered/staff/${id}/excel`,
        paginate: (id: string | number) =>
          `/api/official/v1/institutes/registered/staff/${id}/paginate`,
      },
    },
    non_registered: {
      excel: "/api/official/v1/institutes/non-registered/excel",
      paginate: "/api/official/v1/institutes/non-registered/paginate",
      view: (id: string | number) =>
        `/api/official/v1/institutes/non-registered/view/${id}`,
    },
  },
  registered_industry: {
    excel: "/api/official/v1/registered-industries/excel",
    all: "/api/official/v1/registered-industries/all",
    paginate: "/api/official/v1/registered-industries/paginate",
    create: "/api/official/v1/registered-industries/create",
    update: (id: string | number) =>
      `/api/official/v1/registered-industries/update/${id}`,
    delete: (id: string | number) =>
      `/api/official/v1/registered-industries/delete/${id}`,
    view: (id: string | number) =>
      `/api/official/v1/registered-industries/view/${id}`,
  },
  request_industry: {
    excel: "/api/official/v1/request-industries/excel",
    all: "/api/official/v1/request-industries/all",
    paginate: "/api/official/v1/request-industries/paginate",
    update: (id: string | number) =>
      `/api/official/v1/request-industries/update/${id}`,
    approve: (id: string | number) =>
      `/api/official/v1/request-industries/approve/${id}`,
    delete: (id: string | number) =>
      `/api/official/v1/request-industries/delete/${id}`,
    view: (id: string | number) =>
      `/api/official/v1/request-industries/view/${id}`,
  },
  industry: {
    registered: {
      excel: "/api/official/v1/industries/registered/excel",
      paginate: "/api/official/v1/industries/registered/paginate",
      view: (id: string | number) =>
        `/api/official/v1/industries/registered/view/${id}`,
      update: (id: string | number) =>
        `/api/official/v1/industries/registered/update/${id}`,
      update_auth: (id: string | number) =>
        `/api/official/v1/industries/registered/update-auth/${id}`,
      toggle: (id: string | number) =>
        `/api/official/v1/industries/registered/toggle-status/${id}`,
      staff: {
        excel: (id: string | number) =>
          `/api/official/v1/industries/registered/staff/${id}/excel`,
        paginate: (id: string | number) =>
          `/api/official/v1/industries/registered/staff/${id}/paginate`,
      },
    },
    non_registered: {
      excel: "/api/official/v1/industries/non-registered/excel",
      paginate: "/api/official/v1/industries/non-registered/paginate",
      view: (id: string | number) =>
        `/api/official/v1/industries/non-registered/view/${id}`,
    },
  },
} as const;
