/*
 * Base API routes list
 */

import { admin_api_routes } from "./admin_api_routes";
import { industry_api_routes } from "./industry_api_routes";
import { institute_api_routes } from "./institute_api_routes";
import { user_api_routes } from "./user_api_routes";

export const api_routes = {
  user: {
    ...user_api_routes,
  },
  institute: {
    ...institute_api_routes,
  },
  industry: {
    ...industry_api_routes,
  },
  admin: {
    ...admin_api_routes,
  },
} as const;