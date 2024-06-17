import { ReactNode } from "react";

export type ChildrenType = {
  children: ReactNode;
};

export type Role =
  | "Super-Admin"
  | "Admin"
  | "Verification-Officer"
  | "Financial-Officer"
  | "Payment-Officer"
  | "Industry"
  | "Institute"
  | "Student";

export type AuthType = {
  id: number;
  name: string;
  phone: string;
  email: string;
  is_blocked: boolean | null;
  role: Role | null;
  created_at: string;
  updated_at: string;
  verified: "VERIFICATION PENDING" | "VERIFIED";
  verified_at: string | null;
};

export type EmployeeType = AuthType;

export type RoleType = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
};

export type GraduationType = {
  id: number;
  name: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type CourseType = {
  id: number;
  name: string;
  graduation_id: number;
  graduation: GraduationType;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type ClassType = {
  id: number;
  name: string;
  course_id: number;
  course: CourseType;
  graduation: GraduationType;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type StateType = {
  id: number;
  name: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type CityType = {
  id: number;
  name: string;
  state_id: number;
  state: StateType;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type TaluqType = {
  id: number;
  name: string;
  city_id: number;
  city: CityType;
  state: StateType;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type AxiosErrorResponseType = {
  message: string;
  errors?: Record<string, string[]>;
};

export type PaginationLinkType = {
  first: string | null;
  next: string | null;
  last: string | null;
  prev: string | null;
};

export type PaginationMetaType = {
  current_page: number;
  from: number;
  last_page: number;
  path: string;
  per_page: number;
  links: {
    active: boolean;
    label: string;
    url: string | null;
  }[];
  to: number;
  total: number;
};

export type PaginationType<T> = {
  data: T[];
  links: PaginationLinkType;
  meta: PaginationMetaType;
};

export type DrawerProps =
  | {
      status: boolean;
      type: "Create";
    }
  | {
      status: boolean;
      type: "Edit";
      id: number;
    };
