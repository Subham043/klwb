import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import UserProvider from "./contexts/userProvider"
import { AdminPersistLayout, InstitutePersistLayout, StudentPersistLayout, IndustryPersistLayout } from "./layouts/Persist"
import AccountProvider from "./contexts/accountProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PageNotFound from "./pages/PageNotFound";
import SuspenseOutlet from "./components/SuspenseOutlet";
import { QueryClientOptions } from "./utils/constants/query_client";
import { page_routes } from "./utils/routes/pages";
const AdminAuthLayout = lazy(()=>import("./layouts/Auth").then(module => ({ default: module.AdminAuthLayout })));
const IndustryAuthLayout = lazy(()=>import("./layouts/Auth").then(module => ({ default: module.IndustryAuthLayout })));
const InstituteAuthLayout = lazy(()=>import("./layouts/Auth").then(module => ({ default: module.InstituteAuthLayout })));
const StudentAuthLayout = lazy(()=>import("./layouts/Auth").then(module => ({ default: module.StudentAuthLayout })));
const AdminVerifiedLayout = lazy(()=>import("./layouts/Verified").then(module => ({ default: module.AdminVerifiedLayout })));
const StudentVerifiedLayout = lazy(()=>import("./layouts/Verified").then(module => ({ default: module.StudentVerifiedLayout })));
const InstituteVerifiedLayout = lazy(()=>import("./layouts/Verified").then(module => ({ default: module.InstituteVerifiedLayout })));
const IndustryVerifiedLayout = lazy(()=>import("./layouts/Verified").then(module => ({ default: module.IndustryVerifiedLayout })));
const AdminAuthorisedLayout = lazy(()=>import("./layouts/Authorised").then(module => ({ default: module.AdminAuthorisedLayout })));
const StudentAuthorisedLayout = lazy(()=>import("./layouts/Authorised").then(module => ({ default: module.StudentAuthorisedLayout })));
const InstituteAuthorisedLayout = lazy(()=>import("./layouts/Authorised").then(module => ({ default: module.InstituteAuthorisedLayout })));
const IndustryAuthorisedLayout = lazy(()=>import("./layouts/Authorised").then(module => ({ default: module.IndustryAuthorisedLayout })));
const AdminProtectedLayout = lazy(()=>import("./layouts/Protected").then(module => ({ default: module.AdminProtectedLayout })));
const StudentProtectedLayout = lazy(()=>import("./layouts/Protected").then(module => ({ default: module.StudentProtectedLayout })));
const InstituteProtectedLayout = lazy(()=>import("./layouts/Protected").then(module => ({ default: module.InstituteProtectedLayout })));
const IndustryProtectedLayout = lazy(()=>import("./layouts/Protected").then(module => ({ default: module.IndustryProtectedLayout })));
const AdminGuestLayout = lazy(()=>import("./layouts/Guest").then(module => ({ default: module.AdminGuestLayout })));
const StudentGuestLayout = lazy(()=>import("./layouts/Guest").then(module => ({ default: module.StudentGuestLayout })));
const InstituteGuestLayout = lazy(()=>import("./layouts/Guest").then(module => ({ default: module.InstituteGuestLayout })));
const IndustryGuestLayout = lazy(()=>import("./layouts/Guest").then(module => ({ default: module.IndustryGuestLayout })));
const DashboardLayout = lazy(()=>import("./layouts/Dashboard"));
const StudentLoginPage = lazy(()=>import("./pages/Auth/LoginPage/StudentLoginPage"));
const AdminLoginPage = lazy(()=>import("./pages/Auth/LoginPage/AdminLoginPage"));
const IndustryLoginPage = lazy(()=>import("./pages/Auth/LoginPage/IndustryLoginPage"));
const InstituteLoginPage = lazy(()=>import("./pages/Auth/LoginPage/InstituteLoginPage"));
const StudentRegisterPage = lazy(()=>import("./pages/Auth/Register/StudentRegisterPage"));
const InstituteRegisterPage = lazy(()=>import("./pages/Auth/Register/InstituteRegisterPage"));
const IndustryRegisterPage = lazy(()=>import("./pages/Auth/Register/IndustryRegisterPage"));
const AdminForgotPasswordPage = lazy(()=>import("./pages/Auth/ForgotPasswordPage").then(module => ({ default: module.AdminForgotPasswordPage })));
const IndustryForgotPasswordPage = lazy(()=>import("./pages/Auth/ForgotPasswordPage").then(module => ({ default: module.IndustryForgotPasswordPage })));
const InstituteForgotPasswordPage = lazy(()=>import("./pages/Auth/ForgotPasswordPage").then(module => ({ default: module.InstituteForgotPasswordPage })));
const StudentForgotPasswordPage = lazy(()=>import("./pages/Auth/ForgotPasswordPage").then(module => ({ default: module.StudentForgotPasswordPage })));
const AdminResetPasswordPage = lazy(()=>import("./pages/Auth/ResetPassword").then(module => ({ default: module.AdminResetPasswordPage })));
const StudentResetPasswordPage = lazy(()=>import("./pages/Auth/ResetPassword").then(module => ({ default: module.StudentResetPasswordPage })));
const IndustryResetPasswordPage = lazy(()=>import("./pages/Auth/ResetPassword").then(module => ({ default: module.IndustryResetPasswordPage })));
const InstituteResetPasswordPage = lazy(()=>import("./pages/Auth/ResetPassword").then(module => ({ default: module.InstituteResetPasswordPage })));
const DashboardPage = lazy(()=>import("./pages/Dashboard"));
const GraduationPage = lazy(()=>import("./pages/Graduation"));
const CoursePage = lazy(()=>import("./pages/Course"));
const ClassPage = lazy(()=>import("./pages/Class"));
const EmployeePage = lazy(()=>import("./pages/Employee"));
const StatePage = lazy(()=>import("./pages/State"));
const CityPage = lazy(()=>import("./pages/City"));
const TaluqPage = lazy(()=>import("./pages/Taluq"));
const RegisteredInstitutePage = lazy(()=>import("./pages/RegisteredInstitute"));
const InstituteRegisteredPage = lazy(()=>import("./pages/InstituteRegistered"));
const InstituteRegisteredInfoPage = lazy(()=>import("./pages/InstituteRegisteredInfo"));
const InstituteNonRegisteredPage = lazy(()=>import("./pages/InstituteNonRegistered"));
const RequestInstitutePage = lazy(()=>import("./pages/RequestInstitute"));
const SecurityQuestionPage = lazy(()=>import("./pages/SecurityQuestion"));
const ApplicationDatePage = lazy(()=>import("./pages/ApplicationDate"));
const ApplicationFeePage = lazy(()=>import("./pages/ApplicationFee"));
const HomePage = lazy(()=>import("./pages/Home"));
const InstituteRequestPage = lazy(()=>import("./pages/Auth/InstituteRequestPage"));
const RequestIndustryPage = lazy(()=>import("./pages/RequestIndustry"));
const IndustryRequestPage = lazy(()=>import("./pages/Auth/IndustryRequestPage"));
const RegisteredIndustryPage = lazy(()=>import("./pages/RegisteredIndustry"));
const IndustryRegisteredPage = lazy(()=>import("./pages/IndustryRegistered"));
const IndustryRegisteredInfoPage = lazy(()=>import("./pages/IndustryRegisteredInfo"));
const IndustryNonRegisteredPage = lazy(()=>import("./pages/IndustryNonRegistered"));

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
                <Route element={<AdminPersistLayout />}>
                  <Route element={<AdminProtectedLayout />}>
                    <Route element={<AdminVerifiedLayout />} >
                      <Route element={<AdminAuthorisedLayout />}>
                          <Route element={<DashboardLayout />}>
                            <Route path={page_routes.admin.dashboard} element={<DashboardPage />} />
                            <Route path={page_routes.admin.graduation} element={<GraduationPage />} />
                            <Route path={page_routes.admin.course} element={<CoursePage />} />
                            <Route path={page_routes.admin.class} element={<ClassPage />} />
                            <Route path={page_routes.admin.employee} element={<EmployeePage />} />
                            <Route path={page_routes.admin.state} element={<StatePage />} />
                            <Route path={page_routes.admin.city} element={<CityPage />} />
                            <Route path={page_routes.admin.taluq} element={<TaluqPage />} />
                            <Route path={page_routes.admin.institute.all} element={<RegisteredInstitutePage />} />
                            <Route path={page_routes.admin.institute.request} element={<RequestInstitutePage />} />
                            <Route path={page_routes.admin.institute.non_registered} element={<InstituteNonRegisteredPage />} />
                            <Route path={page_routes.admin.institute.registered} element={<InstituteRegisteredPage />} />
                            <Route path={page_routes.admin.institute.registered_info(":id")} element={<InstituteRegisteredInfoPage />} />
                            <Route path={page_routes.admin.industry.all} element={<RegisteredIndustryPage />} />
                            <Route path={page_routes.admin.industry.request} element={<RequestIndustryPage />} />
                            <Route path={page_routes.admin.industry.non_registered} element={<IndustryNonRegisteredPage />} />
                            <Route path={page_routes.admin.industry.registered} element={<IndustryRegisteredPage />} />
                            <Route path={page_routes.admin.industry.registered_info(":id")} element={<IndustryRegisteredInfoPage />} />
                            <Route path={page_routes.admin.security_question} element={<SecurityQuestionPage />} />
                            <Route path={page_routes.admin.application_date} element={<ApplicationDatePage />} />
                            <Route path={page_routes.admin.application_fee} element={<ApplicationFeePage />} />
                          </Route>
                      </Route>
                    </Route>
                  </Route>
                  <Route element={<AdminGuestLayout />}>
                    <Route element={<AdminAuthLayout />}>
                        <Route path={page_routes.admin.auth.login} element={<AdminLoginPage />} />
                        <Route path={page_routes.admin.auth.forgot_password} element={<AdminForgotPasswordPage />} />
                        <Route path={page_routes.admin.auth.reset_password} element={<AdminResetPasswordPage />} />
                    </Route>
                  </Route>
                </Route>
                {/* Admin Routes Ends */}

                {/* Student Routes Starts */}
                <Route element={<StudentPersistLayout />}>
                  <Route element={<StudentProtectedLayout />}>
                    <Route element={<StudentVerifiedLayout />} >
                      <Route element={<StudentAuthorisedLayout />}>
                          <Route element={<DashboardLayout />}>
                          </Route>
                      </Route>
                    </Route>
                  </Route>
                  <Route element={<StudentGuestLayout />}>
                    <Route element={<StudentAuthLayout />}>
                        <Route path={page_routes.student.auth.login} element={<StudentLoginPage />} />
                        <Route path={page_routes.student.auth.register} element={<StudentRegisterPage />} />
                        <Route path={page_routes.student.auth.forgot_password} element={<StudentForgotPasswordPage />} />
                        <Route path={page_routes.student.auth.reset_password} element={<StudentResetPasswordPage />} />
                    </Route>
                  </Route>
                </Route>
                {/* Student Routes Ends */}

                {/* Institute Routes Starts */}
                <Route element={<InstitutePersistLayout />}>
                  <Route element={<InstituteProtectedLayout />}>
                    <Route element={<InstituteVerifiedLayout />} >
                      <Route element={<InstituteAuthorisedLayout />}>
                          <Route element={<DashboardLayout />}>
                          </Route>
                      </Route>
                    </Route>
                  </Route>
                  <Route element={<InstituteGuestLayout />}>
                    <Route element={<InstituteAuthLayout />}>
                        <Route path={page_routes.institute.auth.login} element={<InstituteLoginPage />} />
                        <Route path={page_routes.institute.auth.register} element={<InstituteRegisterPage />} />
                        <Route path={page_routes.institute.auth.forgot_password} element={<InstituteForgotPasswordPage />} />
                        <Route path={page_routes.institute.auth.reset_password} element={<InstituteResetPasswordPage />} />
                        <Route path={page_routes.institute.auth.request} element={<InstituteRequestPage />} />
                    </Route>
                  </Route>
                </Route>
                {/* Institute Routes Ends */}

                {/* Industry Routes Starts */}
                <Route element={<IndustryPersistLayout />}>
                  <Route element={<IndustryProtectedLayout />}>
                    <Route element={<IndustryVerifiedLayout />} >
                      <Route element={<IndustryAuthorisedLayout />}>
                          <Route element={<DashboardLayout />}>
                          </Route>
                      </Route>
                    </Route>
                  </Route>
                  <Route element={<IndustryGuestLayout />}>
                    <Route element={<IndustryAuthLayout />}>
                        <Route path={page_routes.industry.auth.login} element={<IndustryLoginPage />} />
                        <Route path={page_routes.industry.auth.register} element={<IndustryRegisterPage />} />
                        <Route path={page_routes.industry.auth.forgot_password} element={<IndustryForgotPasswordPage />} />
                        <Route path={page_routes.industry.auth.reset_password} element={<IndustryResetPasswordPage />} />
                        <Route path={page_routes.industry.auth.request} element={<IndustryRequestPage />} />
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
