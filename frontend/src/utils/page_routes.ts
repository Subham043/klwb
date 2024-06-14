export const page_routes = {
  main: "/",
  dashboard: "/",
  auth: {
    login: "/auth/login",
    forgot_password: "/auth/forgot-password",
    register: {
      student: "/auth/student/register",
    },
  },
} as const;
