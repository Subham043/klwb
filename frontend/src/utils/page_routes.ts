export const page_routes = {
  main: "/",
  dashboard: "/dashboard",
  admin: {
    graduation: "/admin/graduation",
    class: "/admin/class",
    employee: "/admin/employee",
    state: "/admin/state",
    city: "/admin/city",
    taluq: "/admin/taluq",
    course: "/admin/course",
    security_question: "/admin/security-question",
    application_date: "/admin/application-date",
    application_fee: "/admin/scholarship-fee",
    institute: {
      all: "/admin/institutes",
      request: "/admin/institute-request",
    },
  },
  auth: {
    student: {
      login: "/auth/student/login",
      forgot_password: "/auth/student/forgot-password",
      register: "/auth/student/register",
      reset_password: "/auth/student/reset-password/:token",
    },
    institute: {
      login: "/auth/institute/login",
      forgot_password: "/auth/institute/forgot-password",
      register: "/auth/institute/register",
      request: "/auth/institute/request",
      reset_password: "/auth/institute/reset-password/:token",
    },
    industry: {
      login: "/auth/industry/login",
      forgot_password: "/auth/industry/forgot-password",
      register: "/auth/industry/register",
      reset_password: "/auth/industry/reset-password/:token",
    },
    contribution: {
      login: "/auth/contribution/login",
      forgot_password: "/auth/contribution/forgot-password",
      register: "/auth/contribution/register",
      reset_password: "/auth/contribution/reset-password/:token",
    },
    govt: {
      login: "/auth/govt/login",
      forgot_password: "/auth/govt/forgot-password",
      reset_password: "/auth/govt/reset-password/:token",
    },
    admin: {
      login: "/auth/admin/login",
      forgot_password: "/auth/admin/forgot-password",
      reset_password: "/auth/admin/reset-password/:token",
    },
  },
} as const;
