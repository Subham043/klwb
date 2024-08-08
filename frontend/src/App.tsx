import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { page_routes } from "./utils/page_routes"
import UserProvider from "./contexts/userProvider"
import PersistLayout from "./layouts/Persist"
import AccountProvider from "./contexts/accountProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { QueryClientOptions } from "./utils/constants";
import PageNotFound from "./pages/PageNotFound";
import studentBg from '../public/rg-bg.jpg';
import instituteBg from '../public/inst-bg.jpg';
import industryBg from '../public/ind-bg.jpg';
import SuspenseOutlet from "./components/SuspenseOutlet";
import { api_routes } from "./utils/api_routes";
const AuthLayout = lazy(()=>import("./layouts/Auth"));
const VerifiedLayout = lazy(()=>import("./layouts/Verified"));
const AuthorisedLayout = lazy(()=>import("./layouts/Authorised"));
const ProtectedLayout = lazy(()=>import("./layouts/Protected"));
const GuestLayout = lazy(()=>import("./layouts/Guest"));
const DashboardLayout = lazy(()=>import("./layouts/Dashboard"));
const StudentLoginPage = lazy(()=>import("./pages/Auth/LoginPage/StudentLoginPage"));
const ContributionLoginPage = lazy(()=>import("./pages/Auth/LoginPage/ContributionLoginPage"));
const AdminLoginPage = lazy(()=>import("./pages/Auth/LoginPage/AdminLoginPage"));
const GovtLoginPage = lazy(()=>import("./pages/Auth/LoginPage/GovtLoginPage"));
const IndustryLoginPage = lazy(()=>import("./pages/Auth/LoginPage/IndustryLoginPage"));
const InstituteLoginPage = lazy(()=>import("./pages/Auth/LoginPage/InstituteLoginPage"));
const StudentRegisterPage = lazy(()=>import("./pages/Auth/Register/StudentRegisterPage"));
const InstituteRegisterPage = lazy(()=>import("./pages/Auth/Register/InstituteRegisterPage"));
const ForgotPasswordPage = lazy(()=>import("./pages/Auth/ForgotPasswordPage"));
const ResetPasswordPage = lazy(()=>import("./pages/Auth/ResetPassword"));
const DashboardPage = lazy(()=>import("./pages/Dashboard"));
const GraduationPage = lazy(()=>import("./pages/Graduation"));
const CoursePage = lazy(()=>import("./pages/Course"));
const ClassPage = lazy(()=>import("./pages/Class"));
const EmployeePage = lazy(()=>import("./pages/Employee"));
const StatePage = lazy(()=>import("./pages/State"));
const CityPage = lazy(()=>import("./pages/City"));
const TaluqPage = lazy(()=>import("./pages/Taluq"));
const RegisteredInstitutePage = lazy(()=>import("./pages/RegisteredInstitute"));
const RequestInstitutePage = lazy(()=>import("./pages/RequestInstitute"));
const SecurityQuestionPage = lazy(()=>import("./pages/SecurityQuestion"));
const ApplicationDatePage = lazy(()=>import("./pages/ApplicationDate"));
const ApplicationFeePage = lazy(()=>import("./pages/ApplicationFee"));
const HomePage = lazy(()=>import("./pages/Home"));
const InstituteRequestPage = lazy(()=>import("./pages/Auth/InstituteRequestPage"));

const queryClient = new QueryClient(QueryClientOptions);

function App() {

  return (
    <>
      <UserProvider>
        <QueryClientProvider client={queryClient}>
          <AccountProvider>
            <BrowserRouter>
              <Routes>
                {/* Admin Routes Starts */}
                <Route element={<PersistLayout profile_api_link={api_routes.admin.account.profile} />}>
                  <Route element={<ProtectedLayout navigation_link={page_routes.auth.admin.login} />}>
                    <Route element={<VerifiedLayout profile_verify_api_link={api_routes.admin.account.profile_verify} logout_api_link={api_routes.admin.auth.logout} resend_otp_api_link={api_routes.admin.account.resend_otp} />} >
                      <Route element={<AuthorisedLayout roles={["Super-Admin", "Admin"]} />}>
                          <Route element={<DashboardLayout />}>
                            <Route path={page_routes.dashboard} element={<DashboardPage />} />
                            <Route path={page_routes.admin.graduation} element={<GraduationPage />} />
                            <Route path={page_routes.admin.course} element={<CoursePage />} />
                            <Route path={page_routes.admin.class} element={<ClassPage />} />
                            <Route path={page_routes.admin.employee} element={<EmployeePage />} />
                            <Route path={page_routes.admin.state} element={<StatePage />} />
                            <Route path={page_routes.admin.city} element={<CityPage />} />
                            <Route path={page_routes.admin.taluq} element={<TaluqPage />} />
                            <Route path={page_routes.admin.institute.all} element={<RegisteredInstitutePage />} />
                            <Route path={page_routes.admin.institute.request} element={<RequestInstitutePage />} />
                            <Route path={page_routes.admin.security_question} element={<SecurityQuestionPage />} />
                            <Route path={page_routes.admin.application_date} element={<ApplicationDatePage />} />
                            <Route path={page_routes.admin.application_fee} element={<ApplicationFeePage />} />
                          </Route>
                      </Route>
                    </Route>
                  </Route>
                  <Route element={<GuestLayout navigation_link={page_routes.dashboard} />}>
                    <Route element={<AuthLayout noMenu={false} loginLink={page_routes.auth.industry.login} hasRegister={true} registerLink={page_routes.auth.industry.register} bgImage={industryBg} />}>
                        <Route path={page_routes.auth.industry.login} element={<IndustryLoginPage />} />
                        <Route path={page_routes.auth.industry.register} element={<StudentRegisterPage />} />
                        <Route path={page_routes.auth.industry.forgot_password} element={<ForgotPasswordPage title="Industry" login_link={page_routes.auth.industry.login} reset_password_redirect={page_routes.auth.industry.reset_password} forgot_password_email_api_link={api_routes.admin.auth.forgot_password.email} forgot_password_phone_api_link={api_routes.admin.auth.forgot_password.phone} />} />
                        <Route path={page_routes.auth.industry.reset_password} element={<ResetPasswordPage title="Industry" login_link={page_routes.auth.admin.login} reset_password_api_link={api_routes.admin.auth.reset_password.index} reset_password_resend_otp_api_link={api_routes.admin.auth.reset_password.resend_otp} />} />
                    </Route>
                  </Route>
                  <Route element={<GuestLayout navigation_link={page_routes.dashboard} />}>
                    <Route element={<AuthLayout noMenu={false} loginLink={page_routes.auth.contribution.login} hasRegister={true} registerLink={page_routes.auth.contribution.register} />}>
                        <Route path={page_routes.auth.contribution.login} element={<ContributionLoginPage />} />
                        <Route path={page_routes.auth.contribution.register} element={<StudentRegisterPage />} />
                        <Route path={page_routes.auth.contribution.forgot_password} element={<ForgotPasswordPage title="Contribution" login_link={page_routes.auth.contribution.login} reset_password_redirect={page_routes.auth.contribution.reset_password} forgot_password_email_api_link={api_routes.admin.auth.forgot_password.email} forgot_password_phone_api_link={api_routes.admin.auth.forgot_password.phone} />} />
                        <Route path={page_routes.auth.contribution.reset_password} element={<ResetPasswordPage title="Contribution" login_link={page_routes.auth.admin.login} reset_password_api_link={api_routes.admin.auth.reset_password.index} reset_password_resend_otp_api_link={api_routes.admin.auth.reset_password.resend_otp} />} />
                    </Route>
                  </Route>
                  <Route element={<GuestLayout navigation_link={page_routes.dashboard} />}>
                    <Route element={<AuthLayout noMenu={false} loginLink={page_routes.auth.govt.login} hasRegister={false} />}>
                        <Route path={page_routes.auth.govt.login} element={<GovtLoginPage />} />
                        <Route path={page_routes.auth.govt.forgot_password} element={<ForgotPasswordPage title="Govt" login_link={page_routes.auth.govt.login} reset_password_redirect={page_routes.auth.govt.reset_password} forgot_password_email_api_link={api_routes.admin.auth.forgot_password.email} forgot_password_phone_api_link={api_routes.admin.auth.forgot_password.phone} />} />
                        <Route path={page_routes.auth.govt.reset_password} element={<ResetPasswordPage title="Govt" login_link={page_routes.auth.admin.login} reset_password_api_link={api_routes.admin.auth.reset_password.index} reset_password_resend_otp_api_link={api_routes.admin.auth.reset_password.resend_otp} />} />
                    </Route>
                  </Route>
                  <Route element={<GuestLayout navigation_link={page_routes.dashboard} />}>
                    <Route element={<AuthLayout noMenu={false} loginLink={page_routes.auth.admin.login} hasRegister={false} />}>
                        <Route path={page_routes.auth.admin.login} element={<AdminLoginPage />} />
                        <Route path={page_routes.auth.admin.forgot_password} element={<ForgotPasswordPage title="Admin" login_link={page_routes.auth.admin.login} reset_password_redirect={page_routes.auth.admin.reset_password} forgot_password_email_api_link={api_routes.admin.auth.forgot_password.email} forgot_password_phone_api_link={api_routes.admin.auth.forgot_password.phone} />} />
                        <Route path={page_routes.auth.admin.reset_password} element={<ResetPasswordPage title="Admin" login_link={page_routes.auth.admin.login} reset_password_api_link={api_routes.admin.auth.reset_password.index} reset_password_resend_otp_api_link={api_routes.admin.auth.reset_password.resend_otp} />} />
                    </Route>
                  </Route>
                </Route>
                {/* Admin Routes Ends */}

                {/* Student Routes Starts */}
                <Route element={<PersistLayout profile_api_link={api_routes.user.account.profile} />}>
                  <Route element={<ProtectedLayout navigation_link={page_routes.auth.student.login} />}>
                    <Route element={<VerifiedLayout profile_verify_api_link={api_routes.user.account.profile_verify} logout_api_link={api_routes.user.auth.logout} resend_otp_api_link={api_routes.user.account.resend_otp} />} >
                      <Route element={<AuthorisedLayout roles={["Student"]} />}>
                          <Route element={<DashboardLayout />}>
                          </Route>
                      </Route>
                    </Route>
                  </Route>
                  <Route element={<GuestLayout navigation_link={page_routes.dashboard} />}>
                    <Route element={<AuthLayout noMenu={false} loginLink={page_routes.auth.student.login} hasRegister={true} registerLink={page_routes.auth.student.register} bgImage={studentBg} />}>
                        <Route path={page_routes.auth.student.login} element={<StudentLoginPage />} />
                        <Route path={page_routes.auth.student.register} element={<StudentRegisterPage />} />
                        <Route path={page_routes.auth.student.forgot_password} element={<ForgotPasswordPage title="Student" login_link={page_routes.auth.student.login} reset_password_redirect={page_routes.auth.student.reset_password} forgot_password_email_api_link={api_routes.user.auth.forgot_password.email} forgot_password_phone_api_link={api_routes.user.auth.forgot_password.phone}  />} />
                        <Route path={page_routes.auth.student.reset_password} element={<ResetPasswordPage title="Student" login_link={page_routes.auth.student.login} reset_password_api_link={api_routes.user.auth.reset_password.index} reset_password_resend_otp_api_link={api_routes.user.auth.reset_password.resend_otp} />} />
                    </Route>
                  </Route>
                </Route>
                {/* Student Routes Ends */}

                {/* Institute Routes Starts */}
                <Route element={<PersistLayout profile_api_link={api_routes.institute.account.profile} />}>
                  <Route element={<ProtectedLayout navigation_link={page_routes.auth.institute.login} />}>
                    <Route element={<VerifiedLayout profile_verify_api_link={api_routes.institute.account.profile_verify} logout_api_link={api_routes.institute.auth.logout} resend_otp_api_link={api_routes.institute.account.resend_otp} />} >
                      <Route element={<AuthorisedLayout roles={["Institute", "Institute-Staff"]} />}>
                          <Route element={<DashboardLayout />}>
                          </Route>
                      </Route>
                    </Route>
                  </Route>
                  <Route element={<GuestLayout navigation_link={page_routes.dashboard} />}>
                    <Route element={<AuthLayout noMenu={false} loginLink={page_routes.auth.institute.login} hasRegister={true} registerLink={page_routes.auth.institute.register} bgImage={instituteBg} />}>
                        <Route path={page_routes.auth.institute.login} element={<InstituteLoginPage />} />
                        <Route path={page_routes.auth.institute.register} element={<InstituteRegisterPage />} />
                        <Route path={page_routes.auth.institute.forgot_password} element={<ForgotPasswordPage title="Institute" login_link={page_routes.auth.institute.login} reset_password_redirect={page_routes.auth.institute.reset_password} forgot_password_email_api_link={api_routes.institute.auth.forgot_password.email} forgot_password_phone_api_link={api_routes.institute.auth.forgot_password.phone}  />} />
                        <Route path={page_routes.auth.institute.reset_password} element={<ResetPasswordPage title="Institute" login_link={page_routes.auth.institute.login} reset_password_api_link={api_routes.institute.auth.reset_password.index} reset_password_resend_otp_api_link={api_routes.institute.auth.reset_password.resend_otp} />} />
                        <Route path={page_routes.auth.institute.request} element={<InstituteRequestPage />} />
                    </Route>
                  </Route>
                </Route>
                {/* Institute Routes Ends */}
                <Route element={<SuspenseOutlet />}>
                  <Route path={page_routes.main} element={<HomePage />} />
                  <Route path="*" element={<PageNotFound />} /> {/* 👈 Renders Page Not Found Screen */}
                </Route>
              </Routes>
            </BrowserRouter>
          </AccountProvider>
        </QueryClientProvider>
      </UserProvider>
    </>
  )
}

export default App
