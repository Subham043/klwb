import React, { createContext, useCallback, useMemo, useState } from "react";
import { ChildrenType, AuthType } from "../utils/types";
import { api_routes } from "../utils/api_routes";
import { page_routes } from "../utils/page_routes";

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
    logoutRedirect: page_routes.auth.student.login,
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
      case "Super-Admin":
      case "Admin":
      case "Financial-Officer":
      case "Payment-Officer":
      case "Verification-Officer":
      case "Industry":
      case "Industry-Staff":
      case "Institute":
      case "Institute-Staff":
        return api_routes.admin.auth.logout;
      case "Student":
        return api_routes.user.auth.logout;
    
      default:
        return api_routes.user.auth.logout;
    }
  }, [user]);
  
  const profileViewApiLink:string = useMemo(() => {
    if(!user) return api_routes.user.account.profile;
    if(!user.role) return api_routes.user.account.profile;
    switch (user.role) {
      case "Super-Admin":
      case "Admin":
      case "Financial-Officer":
      case "Payment-Officer":
      case "Verification-Officer":
      case "Industry":
      case "Industry-Staff":
      case "Institute":
      case "Institute-Staff":
        return api_routes.admin.account.profile;
      case "Student":
        return api_routes.user.account.profile;
    
      default:
        return api_routes.user.account.profile;
    }
  }, [user]);

  const profileUpdateApiLink:string = useMemo(() => {
    if(!user) return api_routes.user.account.profile_update;
    if(!user.role) return api_routes.user.account.profile_update;
    switch (user.role) {
      case "Super-Admin":
      case "Admin":
      case "Financial-Officer":
      case "Payment-Officer":
      case "Verification-Officer":
      case "Industry":
      case "Industry-Staff":
      case "Institute":
      case "Institute-Staff":
        return api_routes.admin.account.profile_update;
      case "Student":
        return api_routes.user.account.profile_update;
    
      default:
        return api_routes.user.account.profile_update;
    }
  }, [user]);

  const passwordUpdateApiLink:string = useMemo(() => {
    if(!user) return api_routes.user.account.password_update;
    if(!user.role) return api_routes.user.account.password_update;
    switch (user.role) {
      case "Super-Admin":
      case "Admin":
      case "Financial-Officer":
      case "Payment-Officer":
      case "Verification-Officer":
      case "Industry":
      case "Industry-Staff":
      case "Institute":
      case "Institute-Staff":
        return api_routes.admin.account.password_update;
      case "Student":
        return api_routes.user.account.password_update;
    
      default:
        return api_routes.user.account.password_update;
    }
  }, [user]);

  const logoutRedirect:string = useMemo(() => {
    if(!user) return page_routes.auth.student.login;
    if(!user.role) return page_routes.auth.student.login;
    switch (user.role) {
      case "Super-Admin":
        return page_routes.auth.admin.login;
      case "Admin":
        return page_routes.auth.admin.login;
      case "Financial-Officer":
        return page_routes.auth.admin.login;
      case "Payment-Officer":
        return page_routes.auth.admin.login;
      case "Verification-Officer":
        return page_routes.auth.admin.login;
      case "Industry":
        return page_routes.auth.industry.login;
      case "Industry-Staff":
        return page_routes.auth.industry.login;
      case "Institute":
        return page_routes.auth.institute.login;
      case "Institute-Staff":
        return page_routes.auth.institute.login;
      case "Student":
        return page_routes.auth.student.login;
    
      default:
        return page_routes.auth.student.login;
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