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
  application_date: "/application-date",
  application_fee: "/scholarship-fee",
  auth: {
    login: "/auth/login",
    forgot_password: "/auth/forgot-password",
    reset_password: "/auth/reset-password/:token",
    register: {
      student: "/auth/student/register",
    },
  },
} as const;
