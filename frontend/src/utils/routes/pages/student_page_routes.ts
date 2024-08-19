export const student_page_routes = {
  auth: {
    login: "/auth/student/login",
    forgot_password: "/auth/student/forgot-password",
    register: "/auth/student/register",
    reset_password: "/auth/student/reset-password/:token",
  },
  dashboard: "/student/dashboard",
  scholarship: {
    apply: "/student/scholarship/apply",
    resubmit: "/student/scholarship/re-submit",
    status: "/student/scholarship/status",
    list: "/student/scholarship/list",
    view: (id: number | string) =>
      "/student/scholarship/view/" + id,
  }
} as const;
