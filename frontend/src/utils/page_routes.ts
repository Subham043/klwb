export const page_routes = {
  main: "/",
  dashboard: "/dashboard",
  graduation: "/graduation",
  class: "/class",
  employee: "/employee",
  state: "/state",
  city: "/city",
  taluq: "/taluq",
  course: "/course",
  security_question: "/security-question",
  auth: {
    login: "/auth/login",
    forgot_password: "/auth/forgot-password",
    register: {
      student: "/auth/student/register",
    },
  },
} as const;
