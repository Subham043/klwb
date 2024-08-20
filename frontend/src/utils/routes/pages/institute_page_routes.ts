export const institute_page_routes = {
  auth: {
    login: "/auth/institute/login",
    forgot_password: "/auth/institute/forgot-password",
    register: "/auth/institute/register",
    request: "/auth/institute/request",
    reset_password: "/auth/institute/reset-password/:token",
  },
  dashboard: "/institute/dashboard",
  scholarship: {
    list: "/institute/scholarship/list",
    view: (id: number | string) =>
      "/institute/scholarship/view/" + id,
  }
} as const;
