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
  can_resubmit: boolean;
  can_approve: boolean;
  can_verify: boolean;
  is_active: boolean;
  has_expired: boolean;
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

export type InstituteType = {
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

export type RegisteredInstituteType = {
  id: number;
  reg_no: string;
  principal: string;
  email: string;
  phone: string;
  reg_certification: string;
  principal_signature: string;
  seal: string;
  institute: {
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

export type RegisteredInstituteStaffType = InstituteAuthType;

export type NonRegisteredInstituteType = {
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


export type IndustryType = {
  id: number;
  reg_id: string;
  name: string;
  act: number;
  act_label: string;
  pincode: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type RequestIndustryType = {
  id: number;
  company: string;
  email: string;
  mobile: string;
  gst_no: string;
  pan_no: string;
  act: number;
  act_label: string;
  address: string;
  register_doc: string;
  taluq_id: number;
  taluq: {
    id: number;
    name: string;
  };
  city_id: number;
  city: {
    id: number;
    name: string;
  };
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type RegisteredIndustryStaffType = AuthType & {
  reg_industry_id: number;
  created_by: number;
};

export type RegisteredIndustryType = RegisteredIndustryStaffType & {
  id: number;
  gst_no: string;
  pan_no: string;
  reg_doc: string;
  sign: string;
  seal: string;
  gst: string;
  pan: string;
  industry: IndustryType;
  address: string;
  city: {
    id: number;
    name: string;
  };
  taluq: {
    id: number;
    name: string;
  };
};

export type NonRegisteredIndustryType = {
  id: number;
  reg_id: string;
  name: string;
  act: number;
  act_label: string;
  pincode: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type StudentApplicationAccountType = {
  bank_name: string;
  branch: string;
  ifsc: string;
  acc_no: number;
  holder: string;
  type: string;
  passbook: string|null;
}

export type StudentApplicationMarkType = {
  graduation_id: number;
  graduation: {
    id: number;
    name: string
  }|null;
  course_id?: number;
  course: {
    id: number;
    name: string
  }|null;
  class_id?: number;
  class: {
    id: number;
    name: string
  }|null;
  ins_pin: number;
  ins_district_id: number;
  district: {
    id: number;
    name: string
  }|null;
  ins_taluq_id: number;
  taluq: {
    id: number;
    name: string
  }|null;
  prv_class: string;
  prv_marks: number;
  prv_markcard: string|null;
  prv_markcard2: string|null;
}

export type StudentApplicationCompanyType = {
  who_working: string;
  parent_guardian_name: string;
  relationship: string;
  msalary: number;
  pincode: string;
  district_id: number;
  district: {
    id: number;
    name: string
  }|null;
  taluq_id: number;
  taluq: {
    id: number;
    name: string
  }|null;
  salaryslip: string|null;
}

export type StudentApplicationBasicDetailType = {
  name: string;
  father_name: string;
  mother_name: string;
  address: string;
  parent_phone: number;
  is_scst: string;
  category: string;
  cast_no?: string;
  gender: string;
  not_applicable?: string;
  adharcard_no: number;
  f_adhar: number;
  m_adhar: number;
  cast_certificate: string|null;
  adharcard_file: string|null;
  f_adharfile: string|null;
  m_adharfile: string|null;
  deathcertificate: string|null;
}

export type StudentApplicationType = {
  id: number;
  application_year: number;
  school_id: number;
  present_institute_name: string|null;
  present_institute_address: string|null;
  company_id: number;
  industry_name: string|null;
  uniq?: string;
  status: number;
  application_state: number;
  reject_reason?: string;
  date: string;
  school_approve?: string;
  company_approve?: string;
  govt_approve?: string;
  admin_approve?: string;
  account: StudentApplicationAccountType;
  mark: StudentApplicationMarkType;
  company: StudentApplicationCompanyType;
  basic_detail: StudentApplicationBasicDetailType;
  scholarship_fee: {
    id: number;
    amount: number;
    graduation_id: number;
    year: number;
  } | null;
  created_at: string;
  updated_at: string;
  pay_status: number;
  payf_reason: string|null;
  govt_note: string|null;
  admin_note: string|null;
  resubmitted_status: boolean;
  hold: boolean;
  deleted: boolean;
  delete_reason: string|null;
  inactive: boolean;
  approved_by: AuthType|null;
  industryPayment: {
    id: number;
    comp_regd_id: number;
    year: number;
    pay_id: string;
    price_word: string;
    price: number;
    male: number;
    female: number;
    total_employees: number;
    interest: number;
    status: number;
    status_text: string;
    employee_excel: string|null;
    payed_on: string;
    created_at: string;
    updated_at: string;
  }|null;
}

export type PaymentType = {
  id: number;
  comp_regd_id: number;
  year: number;
  pay_id: string;
  price_word: string;
  price: number;
  male: number;
  female: number;
  total_employees: number;
  interest: number;
  status: number;
  status_text: string;
  employee_excel: string|null;
  payed_on: string;
  created_at: string;
  updated_at: string;
  industry: IndustryType|null;
}

export type ContributionType = {
  id: number;
  comp_regd_id: number;
  year: number;
  pay_id: string;
  price_word: string;
  price: number;
  male: number;
  female: number;
  total_employees: number;
  interest: number;
  status: number;
  status_text: string;
  employee_excel: string|null;
  payed_on: string;
  created_at: string;
  updated_at: string;
  industry: {
    id: number;
    reg_id: string;
    name: string;
    act: number;
    act_label: string;
    pincode: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    city: {
      id: number;
      name: string
    }|null;
    taluq: {
      id: number;
      name: string
    }|null;
  }|null;
}

export type NonContributionType = {
  id: number;
  reg_id: string;
  name: string;
  act: number;
  act_label: string;
  pincode: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type ContributionReportType = {
  year: number;
  male_count: number;
  female_count: number;
  total_countributions: number;
  total_countribution_amount: number;
};

export type ScholarshipReportType = {
  application_year: number;
  sc_count: number;
  st_count: number;
  obc_count: number;
  general_count: number;
  male_count: number;
  female_count: number;
  pending_count: number;
  rejected_count: number;
  approved_count: number;
  total_count: number;
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
