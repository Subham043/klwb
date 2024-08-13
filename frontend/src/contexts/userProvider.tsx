import React, { createContext, useCallback, useMemo, useState } from "react";
import { ChildrenType, AuthType } from "../utils/types";
import { api_routes } from "../utils/routes/api";
import { page_routes } from "../utils/routes/pages";
import { RolesEnum } from "../utils/constants/role";

/*
  * User Context Type
*/
type UserContextType = {
    isAuthenticated: boolean;
    user: AuthType | null;
    logoutApiLink: string;
    profileViewApiLink: string;
    profileUpdateApiLink: string;
    passwordUpdateApiLink: string;
    logoutRedirect: string;
    setUser: (data:AuthType) => void;
    removeUser: () => void
}

/*
  * User Context Default Value
*/
const userDefaultValues: UserContextType = {
    isAuthenticated: false,
    logoutApiLink: api_routes.user.auth.logout,
    profileViewApiLink: api_routes.user.account.profile,
    profileUpdateApiLink: api_routes.user.account.profile_update,
    passwordUpdateApiLink: api_routes.user.account.password_update,
    logoutRedirect: page_routes.student.auth.login,
    user: null,
    setUser: () => {},
    removeUser: () => {}
};

/*
  * User Context
*/
export const UserContext = createContext<UserContextType>(userDefaultValues);

/*
  * User Provider
*/
const UserProvider: React.FC<ChildrenType> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<AuthType | null>(null);

  /*
   * Function for setting user state
   */
  const userHandler = useCallback((data: AuthType) => {
    setUser(data);
    setIsAuthenticated(true);
  }, []);

  const removeUser = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  const logoutApiLink:string = useMemo(() => {
    if(!user) return api_routes.user.auth.logout;
    if(!user.role) return api_routes.user.auth.logout;
    switch (user.role) {
      case RolesEnum.SUPER_ADMIN:
      case RolesEnum.ADMIN:
      case RolesEnum.FINANCIAL_OFFICER:
      case RolesEnum.PAYMENT_OFFICER:
      case RolesEnum.VERIFICATION_OFFICER:
        return api_routes.admin.auth.logout;
      case RolesEnum.INDUSTRY:
      case RolesEnum.INDUSTRY_STAFF:
        return api_routes.industry.auth.logout;
      case RolesEnum.INSTITUTE:
      case RolesEnum.INSTITUTE_STAFF:
        return api_routes.institute.auth.logout;
      case RolesEnum.STUDENT:
        return api_routes.user.auth.logout;
    
      default:
        return api_routes.user.auth.logout;
    }
  }, [user]);
  
  const profileViewApiLink:string = useMemo(() => {
    if(!user) return api_routes.user.account.profile;
    if(!user.role) return api_routes.user.account.profile;
    switch (user.role) {
      case RolesEnum.SUPER_ADMIN:
      case RolesEnum.ADMIN:
      case RolesEnum.FINANCIAL_OFFICER:
      case RolesEnum.PAYMENT_OFFICER:
      case RolesEnum.VERIFICATION_OFFICER:
        return api_routes.admin.account.profile;
      case RolesEnum.INDUSTRY:
      case RolesEnum.INDUSTRY_STAFF:
        return api_routes.industry.account.profile;
      case RolesEnum.INSTITUTE:
      case RolesEnum.INSTITUTE_STAFF:
        return api_routes.institute.account.profile;
      case RolesEnum.STUDENT:
        return api_routes.user.account.profile;
    
      default:
        return api_routes.user.account.profile;
    }
  }, [user]);

  const profileUpdateApiLink:string = useMemo(() => {
    if(!user) return api_routes.user.account.profile_update;
    if(!user.role) return api_routes.user.account.profile_update;
    switch (user.role) {
      case RolesEnum.SUPER_ADMIN:
      case RolesEnum.ADMIN:
      case RolesEnum.FINANCIAL_OFFICER:
      case RolesEnum.PAYMENT_OFFICER:
      case RolesEnum.VERIFICATION_OFFICER:
        return api_routes.admin.account.profile_update;
      case RolesEnum.INDUSTRY:
      case RolesEnum.INDUSTRY_STAFF:
        return api_routes.industry.account.profile_update;
      case RolesEnum.INSTITUTE:
      case RolesEnum.INSTITUTE_STAFF:
        return api_routes.institute.account.profile_update;
      case RolesEnum.STUDENT:
        return api_routes.user.account.profile_update;
    
      default:
        return api_routes.user.account.profile_update;
    }
  }, [user]);

  const passwordUpdateApiLink:string = useMemo(() => {
    if(!user) return api_routes.user.account.password_update;
    if(!user.role) return api_routes.user.account.password_update;
    switch (user.role) {
      case RolesEnum.SUPER_ADMIN:
      case RolesEnum.ADMIN:
      case RolesEnum.FINANCIAL_OFFICER:
      case RolesEnum.PAYMENT_OFFICER:
      case RolesEnum.VERIFICATION_OFFICER:
        return api_routes.admin.account.password_update;
      case RolesEnum.INDUSTRY:
      case RolesEnum.INDUSTRY_STAFF:
        return api_routes.industry.account.password_update;
      case RolesEnum.INSTITUTE:
      case RolesEnum.INSTITUTE_STAFF:
        return api_routes.institute.account.password_update;
      case RolesEnum.STUDENT:
        return api_routes.user.account.password_update;
    
      default:
        return api_routes.user.account.password_update;
    }
  }, [user]);

  const logoutRedirect:string = useMemo(() => {
    if(!user) return page_routes.student.auth.login;
    if(!user.role) return page_routes.student.auth.login;
    switch (user.role) {
      case RolesEnum.SUPER_ADMIN:
        return page_routes.admin.auth.login;
      case RolesEnum.ADMIN:
        return page_routes.admin.auth.login;
      case RolesEnum.FINANCIAL_OFFICER:
        return page_routes.admin.auth.login;
      case RolesEnum.PAYMENT_OFFICER:
        return page_routes.admin.auth.login;
      case RolesEnum.VERIFICATION_OFFICER:
        return page_routes.admin.auth.login;
      case RolesEnum.INDUSTRY:
        return page_routes.industry.auth.login;
      case RolesEnum.INDUSTRY_STAFF:
        return page_routes.industry.auth.login;
      case RolesEnum.INSTITUTE:
        return page_routes.institute.auth.login;
      case RolesEnum.INSTITUTE_STAFF:
        return page_routes.institute.auth.login;
      case RolesEnum.STUDENT:
        return page_routes.student.auth.login;
    
      default:
        return page_routes.student.auth.login;
    }
  }, [user]);

  return (
    <UserContext.Provider
      value={{ 
        user, 
        logoutApiLink,
        logoutRedirect,
        profileViewApiLink,
        profileUpdateApiLink,
        passwordUpdateApiLink,
        setUser:userHandler,
        isAuthenticated, 
        removeUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;