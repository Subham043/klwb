export const industry_page_routes = {
  auth: {
    login: "/auth/industry/login",
    forgot_password: "/auth/industry/forgot-password",
    register: "/auth/industry/register",
    reset_password: "/auth/industry/reset-password/:token",
  },
  dashboard: "/industry/dashboard",
} as const;