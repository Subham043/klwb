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
const SecurityQuestionPage = lazy(()=>import("./pages/SecurityQuestion"));
const ApplicationDatePage = lazy(()=>import("./pages/ApplicationDate"));
const ApplicationFeePage = lazy(()=>import("./pages/ApplicationFee"));
const HomePage = lazy(()=>import("./pages/Home"));

const queryClient = new QueryClient(QueryClientOptions);

function App() {

  return (
    <>
      <UserProvider>
        <QueryClientProvider client={queryClient}>
          <AccountProvider>
            <BrowserRouter>
              <Routes>
                <Route element={<PersistLayout />}>
                  <Route element={<ProtectedLayout />}>
                    <Route element={<VerifiedLayout />}>
                      <Route element={<AuthorisedLayout roles={["Super-Admin", "Admin"]} />}>
                          <Route element={<DashboardLayout />}>
                            <Route path={page_routes.dashboard} element={<DashboardPage />} />
                            <Route path={page_routes.graduation} element={<GraduationPage />} />
                            <Route path={page_routes.course} element={<CoursePage />} />
                            <Route path={page_routes.class} element={<ClassPage />} />
                            <Route path={page_routes.employee} element={<EmployeePage />} />
                            <Route path={page_routes.state} element={<StatePage />} />
                            <Route path={page_routes.city} element={<CityPage />} />
                            <Route path={page_routes.taluq} element={<TaluqPage />} />
                            <Route path={page_routes.security_question} element={<SecurityQuestionPage />} />
                            <Route path={page_routes.application_date} element={<ApplicationDatePage />} />
                            <Route path={page_routes.application_fee} element={<ApplicationFeePage />} />
                          </Route>
                      </Route>
                    </Route>
                  </Route>
                  <Route element={<GuestLayout />}>
                    <Route element={<AuthLayout noMenu={false} loginLink={page_routes.auth.student.login} hasRegister={true} registerLink={page_routes.auth.student.register} bgImage={studentBg} />}>
                        <Route path={page_routes.auth.student.login} element={<StudentLoginPage />} />
                        <Route path={page_routes.auth.student.register} element={<StudentRegisterPage />} />
                        <Route path={page_routes.auth.student.forgot_password} element={<ForgotPasswordPage title="Student" login_link={page_routes.auth.student.login} />} />
                    </Route>
                    <Route element={<AuthLayout noMenu={false} loginLink={page_routes.auth.institute.login} hasRegister={true} registerLink={page_routes.auth.institute.register} bgImage={instituteBg} />}>
                        <Route path={page_routes.auth.institute.login} element={<InstituteLoginPage />} />
                        <Route path={page_routes.auth.institute.register} element={<StudentRegisterPage />} />
                        <Route path={page_routes.auth.institute.forgot_password} element={<ForgotPasswordPage title="Institute" login_link={page_routes.auth.institute.login} />} />
                    </Route>
                    <Route element={<AuthLayout noMenu={false} loginLink={page_routes.auth.industry.login} hasRegister={true} registerLink={page_routes.auth.industry.register} bgImage={industryBg} />}>
                        <Route path={page_routes.auth.industry.login} element={<IndustryLoginPage />} />
                        <Route path={page_routes.auth.industry.register} element={<StudentRegisterPage />} />
                        <Route path={page_routes.auth.industry.forgot_password} element={<ForgotPasswordPage title="Industry" login_link={page_routes.auth.industry.login} />} />
                    </Route>
                    <Route element={<AuthLayout noMenu={false} loginLink={page_routes.auth.contribution.login} hasRegister={true} registerLink={page_routes.auth.contribution.register} />}>
                        <Route path={page_routes.auth.contribution.login} element={<ContributionLoginPage />} />
                        <Route path={page_routes.auth.contribution.register} element={<StudentRegisterPage />} />
                        <Route path={page_routes.auth.contribution.forgot_password} element={<ForgotPasswordPage title="Contribution" login_link={page_routes.auth.contribution.login} />} />
                    </Route>
                    <Route element={<AuthLayout noMenu={false} loginLink={page_routes.auth.govt.login} hasRegister={false} />}>
                        <Route path={page_routes.auth.govt.login} element={<GovtLoginPage />} />
                        <Route path={page_routes.auth.govt.forgot_password} element={<ForgotPasswordPage title="Govt" login_link={page_routes.auth.govt.login} />} />
                    </Route>
                    <Route element={<AuthLayout noMenu={false} loginLink={page_routes.auth.admin.login} hasRegister={false} />}>
                        <Route path={page_routes.auth.admin.login} element={<AdminLoginPage />} />
                        <Route path={page_routes.auth.admin.forgot_password} element={<ForgotPasswordPage title="Admin" login_link={page_routes.auth.admin.login} />} />
                    </Route>
                    <Route element={<AuthLayout noMenu />}>
                        <Route path={page_routes.auth.reset_password} element={<ResetPasswordPage />} />
                    </Route>
                  </Route>
                </Route>
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
