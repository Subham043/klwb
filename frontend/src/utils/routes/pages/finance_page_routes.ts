import { official_auth_page_routes } from "./official_auth_pages_routes";

const year = new Date().getFullYear();

export const finance_page_routes = {
  auth: {
    ...official_auth_page_routes,
  },
  dashboard: "/finance/dashboard",
  scholarship: {
    payment_processed_list: "/finance/scholarship/payment-processed-list",
    payment_processed_list_main: "/finance/scholarship/payment-processed-list?payment_status=processed&year=" + year,
    payment_pending_list: "/finance/scholarship/payment-pending-list",
    payment_pending_list_main: "/finance/scholarship/payment-pending-list?payment_status=pending&year=" + year,
    payment_failed_list: "/finance/scholarship/payment-failed-list",
    payment_failed_list_main: "/finance/scholarship/payment-failed-list?payment_status=failed&year=" + year,
    view: (id: number | string) =>
      "/finance/scholarship/view/" + id,
  }
} as const;
