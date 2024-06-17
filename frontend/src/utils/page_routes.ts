export const page_routes = {
  main: "/",
  dashboard: "/dashboard",
  graduation: "/graduation",
  course: "/course",
  auth: {
    login: "/auth/login",
    forgot_password: "/auth/forgot-password",
    register: {
      student: "/auth/student/register",
    },
  },
} as const;
