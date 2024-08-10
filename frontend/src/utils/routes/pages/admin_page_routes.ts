import { official_auth_page_routes } from "./official_auth_pages_routes";

export const admin_page_routes = {
  auth: {
    ...official_auth_page_routes,
  },
  dashboard: "/admin/dashboard",
  graduation: "/admin/graduation",
  class: "/admin/class",
  employee: "/admin/employee",
  state: "/admin/state",
  city: "/admin/district",
  taluq: "/admin/taluq",
  course: "/admin/course",
  security_question: "/admin/security-question",
  application_date: "/admin/application-date",
  application_fee: "/admin/scholarship-fee",
  institute: {
    all: "/admin/institutes",
    request: "/admin/institute-request",
    registered: "/admin/institute-registered",
    registered_info: (id: number | string) =>
      "/admin/institute-registered/" + id,
    non_registered: "/admin/institute-non-registered",
  },
} as const;