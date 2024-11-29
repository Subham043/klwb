import { official_auth_page_routes } from "./official_auth_pages_routes";

export const payment_officer_page_routes = {
  auth: {
    ...official_auth_page_routes,
  },
  dashboard: "/payment-officer/dashboard",
  contribution: {
    completed_list: "/payment-officer/contribution/completed-list",
    completed_list_main: "/payment-officer/contribution/completed-list?year=" + new Date().getFullYear(),
    pending_list: "/payment-officer/contribution/pending-list",
    pending_list_main: "/payment-officer/contribution/pending-list?year=" + new Date().getFullYear(),
  }
} as const;
