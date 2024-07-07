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
    student: {
      login: "/auth/student/login",
      forgot_password: "/auth/student/forgot-password",
      register: "/auth/student/register",
    },
    institute: {
      login: "/auth/institute/login",
      forgot_password: "/auth/institute/forgot-password",
      register: "/auth/institute/register",
    },
    industry: {
      login: "/auth/industry/login",
      forgot_password: "/auth/industry/forgot-password",
      register: "/auth/industry/register",
    },
    contribution: {
      login: "/auth/contribution/login",
      forgot_password: "/auth/contribution/forgot-password",
      register: "/auth/contribution/register",
    },
    govt: {
      login: "/auth/govt/login",
      forgot_password: "/auth/govt/forgot-password",
    },
    admin: {
      login: "/auth/admin/login",
      forgot_password: "/auth/admin/forgot-password",
    },
    reset_password: "/auth/reset-password/:token",
  },
} as const;
