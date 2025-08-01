import { official_auth_page_routes } from "./official_auth_pages_routes";

const year = new Date().getFullYear();

export const govt_page_routes = {
  auth: {
    ...official_auth_page_routes,
  },
  dashboard: "/govt/dashboard",
  scholarship: {
    approved_list: "/govt/scholarship/approved-list",
    approved_list_main: "/govt/scholarship/approved-list?status=approved&year=" + year,
    pending_list: "/govt/scholarship/pending-list",
    pending_list_main: "/govt/scholarship/pending-list?status=pending&year=" + year,
    rejected_list: "/govt/scholarship/rejected-list",
    rejected_list_main: "/govt/scholarship/rejected-list?status=rejected&year=" + year,
    all_list: "/govt/scholarship/all-list",
    all_list_main: "/govt/scholarship/all-list?status=all&year=" + year,
    view: (id: number | string) =>
      "/govt/scholarship/view/" + id,
  },
  report: {
    scholarship: "/govt/report/scholarship",
  }
} as const;
