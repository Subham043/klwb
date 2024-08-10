import { ReactNode } from "react";
import { RolesEnum } from "./constants/role";
import { VerificationEnum } from "./constants/verified";

export type ChildrenType = {
  children?: ReactNode;
};

export type AuthType = {
  id: number;
  name: string;
  phone: string;
  email: string;
  is_blocked: boolean | null;
  role: RolesEnum | null;
  created_at: string;
  updated_at: string;
  verified: VerificationEnum;
  verified_at: string | null;
};

export type EmployeeType = AuthType;

export type InstituteAuthType = AuthType & {
  school_id: number;
};

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
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type SecurityQuestionType = {
  id: number;
  question: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type ApplicationDateType = {
  id: number;
  application_year: number;
  from_date: string;
  to_date: string;
  approval_end_date: string;
  verification_end_date: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type ApplicationFeeType = {
  id: number;
  amount: number;
  year: number;
  user_id: number;
  graduation_id: number;
  graduation: GraduationType;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type RegisteredInstituteType = {
  id: number;
  reg_no: string;
  name: string;
  management_type: string;
  category: string;
  type: string;
  urban_rural: string;
  taluq_id: number;
  taluq: TaluqType;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type RequestInstituteType = {
  id: number;
  name: string;
  email: string;
  mobile: string;
  pincode: string;
  address: string;
  register_doc: string;
  taluq_id: number;
  taluq: TaluqType;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type InstituteRegisteredType = {
  id: number;
  reg_no: string;
  principal: string;
  email: string;
  phone: string;
  reg_certification: string;
  principal_signature: string;
  seal: string;
  registered_institute: {
    id: number;
    reg_no: string;
    name: string;
    management_type: string;
    category: string;
    type: string;
    urban_rural: string;
  };
  address: {
    address: string;
    pincode: string;
    state: {
      id: number;
      name: string;
    };
    city: {
      id: number;
      name: string;
    };
    taluq: {
      id: number;
      name: string;
    };
  };
  profile: InstituteAuthType;
};

export type InstituteRegisteredStaffType = InstituteAuthType;

export type InstituteNonRegisteredType = {
  id: number;
  reg_no: string;
  name: string;
  management_type: string;
  category: string;
  type: string;
  urban_rural: string;
  taluq_id: number;
  taluq: TaluqType;
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
