import { official_auth_page_routes } from "./official_auth_pages_routes";

export const govt_page_routes = {
  auth: {
    ...official_auth_page_routes,
  },
  dashboard: "/govt/dashboard",
  scholarship: {
    list: "/govt/scholarship/list",
    view: (id: number | string) =>
      "/govt/scholarship/view/" + id,
  }
} as const;
