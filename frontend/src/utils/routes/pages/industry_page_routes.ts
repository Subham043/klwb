export const industry_page_routes = {
  auth: {
    login: "/auth/industry/login",
    forgot_password: "/auth/industry/forgot-password",
    register: "/auth/industry/register",
    request: "/auth/industry/request",
    reset_password: "/auth/industry/reset-password/:token",
  },
  dashboard: "/industry/dashboard",
  employee: "/industry/employee",
  scholarship: {
    list: "/industry/scholarship/list",
    view: (id: number | string) =>
      "/industry/scholarship/view/" + id,
  },
  payment: {
    list: "/industry/payment/list",
    pay: "/industry/payment/pay",
    view: (id: number | string) =>
      "/industry/payment/view/" + id,
  }
} as const;
