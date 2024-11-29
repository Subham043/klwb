import { official_auth_page_routes } from "./official_auth_pages_routes";

export const admin_page_routes = {
  auth: {
    ...official_auth_page_routes,
  },
  dashboard: "/admin/dashboard",
  graduation: "/admin/graduation",
  class: "/admin/class",
  employee: "/admin/employee",
  student: "/admin/student",
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
  industry: {
    all: "/admin/industries",
    request: "/admin/industry-request",
    registered: "/admin/industry-registered",
    registered_info: (id: number | string) =>
      "/admin/industry-registered/" + id,
    non_registered: "/admin/industry-non-registered",
  },
  scholarship: {
    all_list: "/admin/scholarship/list",
    all_list_main: "/admin/scholarship/list?year=" + new Date().getFullYear(),
    approved_list: "/admin/scholarship/approved-list",
    approved_list_main: "/admin/scholarship/approved-list?status=approved&year=" + new Date().getFullYear(),
    pending_list: "/admin/scholarship/pending-list",
    pending_list_main: "/admin/scholarship/pending-list?status=pending&year=" + new Date().getFullYear(),
    rejected_list: "/admin/scholarship/rejected-list",
    rejected_list_main: "/admin/scholarship/rejected-list?status=rejected&year=" + new Date().getFullYear(),
    processing_list: "/admin/scholarship/processing-list",
    processing_list_main: "/admin/scholarship/processing-list?status=processing&year=" + new Date().getFullYear(),
    payment_processed_list: "/admin/scholarship/payment-processed-list",
    payment_processed_list_main: "/admin/scholarship/payment-processed-list?status=payment_processed&year=" + new Date().getFullYear(),
    view: (id: number | string) =>
      "/admin/scholarship/view/" + id,
  },
  contribution: {
    completed_list: "/admin/contribution/completed-list",
    completed_list_main: "/admin/contribution/completed-list?year=" + new Date().getFullYear(),
    pending_list: "/admin/contribution/pending-list",
    pending_list_main: "/admin/contribution/pending-list?year=" + new Date().getFullYear(),
  },
  report: {
    contribution: "/admin/report/contribution",
    scholarship: "/admin/report/scholarship",
  }
} as const;