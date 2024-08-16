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
  }
} as const;
