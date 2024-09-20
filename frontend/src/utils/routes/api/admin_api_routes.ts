/*
	* Admin API routes list
	*/

import { official_api_routes } from "./official_api_routes";

export const admin_api_routes = {
  ...official_api_routes,
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
    view: (id: string | number) => `/api/admin/v1/application-dates/view/${id}`,
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
  institute: {
    excel: "/api/admin/v1/institutes/excel",
    all: "/api/admin/v1/institutes/all",
    paginate: "/api/admin/v1/institutes/paginate",
    create: "/api/admin/v1/institutes/create",
    update: (id: string | number) =>
      `/api/admin/v1/institutes/update/${id}`,
    delete: (id: string | number) =>
      `/api/admin/v1/institutes/delete/${id}`,
    view: (id: string | number) =>
      `/api/admin/v1/institutes/view/${id}`,
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
  registered_institute: {
    excel: "/api/admin/v1/registered-institutes/excel",
    paginate: "/api/admin/v1/registered-institutes/paginate",
    view: (id: string | number) =>
      `/api/admin/v1/registered-institutes/view/${id}`,
    update: (id: string | number) =>
      `/api/admin/v1/registered-institutes/update/${id}`,
    update_auth: (id: string | number) =>
      `/api/admin/v1/registered-institutes/update-auth/${id}`,
    toggle: (id: string | number) =>
      `/api/admin/v1/registered-institutes/toggle-status/${id}`,
    staff: {
      excel: (id: string | number) =>
        `/api/admin/v1/registered-institutes/staff/${id}/excel`,
      paginate: (id: string | number) =>
        `/api/admin/v1/registered-institutes/staff/${id}/paginate`,
      status: (id: string | number, staff_id: string | number) =>
        `/api/admin/v1/registered-institutes/staff/${id}/status/${staff_id}`,
    },
    scholarship: {
      excel: (id: string | number) =>
        `/api/admin/v1/registered-institutes/scholarship/${id}/excel`,
      paginate: (id: string | number) =>
        `/api/admin/v1/registered-institutes/scholarship/${id}/paginate`,
    },
  },
  non_registered_institute: {
    excel: "/api/admin/v1/non-registered-institutes/excel",
    paginate: "/api/admin/v1/non-registered-institutes/paginate",
    view: (id: string | number) =>
      `/api/admin/v1/non-registered-institutes/view/${id}`,
  },
  industry: {
    excel: "/api/admin/v1/industries/excel",
    all: "/api/admin/v1/industries/all",
    paginate: "/api/admin/v1/industries/paginate",
    create: "/api/admin/v1/industries/create",
    update: (id: string | number) =>
      `/api/admin/v1/industries/update/${id}`,
    delete: (id: string | number) =>
      `/api/admin/v1/industries/delete/${id}`,
    view: (id: string | number) =>
      `/api/admin/v1/industries/view/${id}`,
  },
  request_industry: {
    excel: "/api/admin/v1/request-industries/excel",
    all: "/api/admin/v1/request-industries/all",
    paginate: "/api/admin/v1/request-industries/paginate",
    update: (id: string | number) =>
      `/api/admin/v1/request-industries/update/${id}`,
    approve: (id: string | number) =>
      `/api/admin/v1/request-industries/approve/${id}`,
    delete: (id: string | number) =>
      `/api/admin/v1/request-industries/delete/${id}`,
    view: (id: string | number) =>
      `/api/admin/v1/request-industries/view/${id}`,
  },
  registered_industry: {
    excel: "/api/admin/v1/registered-industries/excel",
    paginate: "/api/admin/v1/registered-industries/paginate",
    view: (id: string | number) =>
      `/api/admin/v1/registered-industries/view/${id}`,
    update: (id: string | number) =>
      `/api/admin/v1/registered-industries/update/${id}`,
    update_auth: (id: string | number) =>
      `/api/admin/v1/registered-industries/update-auth/${id}`,
    toggle: (id: string | number) =>
      `/api/admin/v1/registered-industries/toggle-status/${id}`,
    staff: {
      excel: (id: string | number) =>
        `/api/admin/v1/registered-industries/staff/${id}/excel`,
      paginate: (id: string | number) =>
        `/api/admin/v1/registered-industries/staff/${id}/paginate`,
      status: (id: string | number, staff_id: string | number) =>
        `/api/admin/v1/registered-industries/staff/${id}/status/${staff_id}`,
    },
    scholarship: {
      excel: (id: string | number) =>
        `/api/admin/v1/registered-industries/scholarship/${id}/excel`,
      paginate: (id: string | number) =>
        `/api/admin/v1/registered-industries/scholarship/${id}/paginate`,
    },
  },
  non_registered_industry: {
    excel: "/api/admin/v1/non-registered-industries/excel",
    paginate: "/api/admin/v1/non-registered-industries/paginate",
    view: (id: string | number) =>
      `/api/admin/v1/non-registered-industries/view/${id}`,
  },
} as const;
