import { official_auth_page_routes } from "./official_auth_pages_routes";

export const govt_page_routes = {
  auth: {
    ...official_auth_page_routes,
  },
  dashboard: "/govt/dashboard",
  scholarship: {
    approved_list: "/govt/scholarship/approved-list",
    approved_list_main: "/govt/scholarship/approved-list?status=approved&year=" + new Date().getFullYear(),
    pending_list: "/govt/scholarship/pending-list",
    pending_list_main: "/govt/scholarship/pending-list?status=pending&year=" + new Date().getFullYear(),
    rejected_list: "/govt/scholarship/rejected-list",
    rejected_list_main: "/govt/scholarship/rejected-list?status=rejected&year=" + new Date().getFullYear(),
    view: (id: number | string) =>
      "/govt/scholarship/view/" + id,
  }
} as const;
