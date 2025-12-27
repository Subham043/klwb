import { official_auth_page_routes } from "./official_auth_pages_routes";

const year = new Date().getFullYear();

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
    all_list_main: "/admin/scholarship/list?year=" + year,
    non_registered_list: "/admin/scholarship/non-registered-list",
    non_registered_list_main: "/admin/scholarship/non-registered-list?year=" + year,
    approved_list: "/admin/scholarship/approved-list",
    approved_list_main: "/admin/scholarship/approved-list?status=approved&year=" + year,
    pending_list: "/admin/scholarship/pending-list",
    pending_list_main: "/admin/scholarship/pending-list?status=pending&year=" + year,
    rejected_list: "/admin/scholarship/rejected-list",
    rejected_list_main: "/admin/scholarship/rejected-list?status=rejected&year=" + year,
    processing_list: "/admin/scholarship/processing-list",
    processing_list_main: "/admin/scholarship/processing-list?status=processing&year=" + year,
    payment_processed_list: "/admin/scholarship/payment-processed-list",
    payment_processed_list_main: "/admin/scholarship/payment-processed-list?status=payment_processed&year=" + year,
    view: (id: number | string) =>
      "/admin/scholarship/view/" + id,
  },
  contribution: {
    completed_list: "/admin/contribution/completed-list",
    completed_list_main: "/admin/contribution/completed-list?year=" + (year - 1),
    attempted_list: "/admin/contribution/attempted-list",
    attempted_list_main: "/admin/contribution/attempted-list?year=" + (year - 1),
    pending_list: "/admin/contribution/pending-list",
    pending_list_main: "/admin/contribution/pending-list?year=" + (year - 1),
  },
  report: {
    contribution: "/admin/report/contribution",
    contribution_comparison: "/admin/report/contribution-comparison",
    contribution_comparison_main: "/admin/report/contribution-comparison?year=" + (year - 1),
    scholarship: "/admin/report/scholarship",
  }
} as const;