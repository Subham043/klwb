export const official_auth_page_routes = {
	login: "/auth/official/login",
	forgot_password: "/auth/official/forgot-password",
	register: "/auth/official/register",
	reset_password: "/auth/official/reset-password/:token",
} as const;
