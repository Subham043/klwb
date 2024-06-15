import { ReactNode } from "react";

export type ChildrenType = {
  children: ReactNode;
};

export type AuthType = {
  id: string;
  name: string;
  phone: string;
  email: string;
  is_blocked: boolean | null;
  role: string | null;
  created_at: string;
  updated_at: string;
  verified: "VERIFICATION PENDING" | "VERIFIED";
  verified_at: string | null;
};

export type AxiosErrorResponseType = {
  message: string;
  errors?: Record<string, string[]>;
};
