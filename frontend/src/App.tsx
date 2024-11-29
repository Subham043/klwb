import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AdminPersistLayout, InstitutePersistLayout, StudentPersistLayout, IndustryPersistLayout } from "./layouts/Persist"
import PageNotFound from "./pages/PageNotFound";
import SuspenseOutlet from "./components/SuspenseOutlet";
import { page_routes } from "./utils/routes/pages";
import { RolesEnum } from "./utils/constants/role";
const AdminAuthLayout = lazy(()=>import("./layouts/Auth").then(module => ({ default: module.AdminAuthLayout })));
const IndustryAuthLayout = lazy(()=>import("./layouts/Auth").then(module => ({ default: module.IndustryAuthLayout })));
const InstituteAuthLayout = lazy(()=>import("./layouts/Auth").then(module => ({ default: module.InstituteAuthLayout })));
const StudentAuthLayout = lazy(()=>import("./layouts/Auth").then(module => ({ default: module.StudentAuthLayout })));
const AdminVerifiedLayout = lazy(()=>import("./layouts/Verified").then(module => ({ default: module.AdminVerifiedLayout })));
const StudentVerifiedLayout = lazy(()=>import("./layouts/Verified").then(module => ({ default: module.StudentVerifiedLayout })));
const InstituteVerifiedLayout = lazy(()=>import("./layouts/Verified").then(module => ({ default: module.InstituteVerifiedLayout })));
const IndustryVerifiedLayout = lazy(()=>import("./layouts/Verified").then(module => ({ default: module.IndustryVerifiedLayout })));
const AdminAuthorisedLayout = lazy(()=>import("./layouts/Authorised").then(module => ({ default: module.AdminAuthorisedLayout })));
const GovtAuthorisedLayout = lazy(()=>import("./layouts/Authorised").then(module => ({ default: module.GovtAuthorisedLayout })));
const FinanceAuthorisedLayout = lazy(()=>import("./layouts/Authorised").then(module => ({ default: module.FinanceAuthorisedLayout })));
const PaymentOfficerAuthorisedLayout = lazy(()=>import("./layouts/Authorised").then(module => ({ default: module.PaymentOfficerAuthorisedLayout })));
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
const DashboardPage = lazy(()=>import("./pages/Admin/Dashboard"));
const InstituteDashboardPage = lazy(()=>import("./pages/Institute/Dashboard"));
const InstituteScholarshipListPage = lazy(()=>import("./pages/Institute/ScholarshipList"));
const InstituteScholarshipViewPage = lazy(()=>import("./pages/Institute/ScholarshipView"));
const InstituteEmployeePage = lazy(()=>import("./pages/Institute/Employee"));
const IndustryDashboardPage = lazy(()=>import("./pages/Industry/Dashboard"));
const IndustryPaymentListPage = lazy(()=>import("./pages/Industry/PaymentList"));
const IndustryPaymentViewPage = lazy(()=>import("./pages/Industry/PaymentView"));
const IndustryMakePaymentPage = lazy(()=>import("./pages/Industry/MakePayment"));
const IndustryScholarshipListPage = lazy(()=>import("./pages/Industry/ScholarshipList"));
const IndustryScholarshipViewPage = lazy(()=>import("./pages/Industry/ScholarshipView"));
const IndustryEmployeePage = lazy(()=>import("./pages/Industry/Employee"));
const StudentDashboardPage = lazy(()=>import("./pages/Student/Dashboard"));
const StudentApplyScholarshipPage = lazy(()=>import("./pages/Student/ApplyScholarship"));
const StudentResubmitScholarshipPage = lazy(()=>import("./pages/Student/ResubmitScholarship"));
const StudentScholarshipStatusPage = lazy(()=>import("./pages/Student/ScholarshipStatus"));
const StudentScholarshipListPage = lazy(()=>import("./pages/Student/ScholarshipList"));
const StudentScholarshipViewPage = lazy(()=>import("./pages/Student/ScholarshipView"));
const GraduationPage = lazy(()=>import("./pages/Admin/Graduation"));
const CoursePage = lazy(()=>import("./pages/Admin/Course"));
const ClassPage = lazy(()=>import("./pages/Admin/Class"));
const EmployeePage = lazy(()=>import("./pages/Admin/Employee"));
const StudentPage = lazy(()=>import("./pages/Admin/Student"));
const StatePage = lazy(()=>import("./pages/Admin/State"));
const CityPage = lazy(()=>import("./pages/Admin/City"));
const TaluqPage = lazy(()=>import("./pages/Taluq"));
const InstitutePage = lazy(()=>import("./pages/Admin/Institute"));
const RegisteredInstitutePage = lazy(()=>import("./pages/Admin/RegisteredInstitute"));
const RegisteredInstituteInfoPage = lazy(()=>import("./pages/Admin/RegisteredInstituteInfo"));
const NonRegisteredInstitutePage = lazy(()=>import("./pages/Admin/NonRegisteredInstitute"));
const RequestInstitutePage = lazy(()=>import("./pages/Admin/RequestInstitute"));
const SecurityQuestionPage = lazy(()=>import("./pages/Admin/SecurityQuestion"));
const ApplicationDatePage = lazy(()=>import("./pages/Admin/ApplicationDate"));
const ApplicationFeePage = lazy(()=>import("./pages/Admin/ApplicationFee"));
const HomePage = lazy(()=>import("./pages/Home"));
const InstituteRequestPage = lazy(()=>import("./pages/Auth/InstituteRequestPage"));
const RequestIndustryPage = lazy(()=>import("./pages/Admin/RequestIndustry"));
const IndustryRequestPage = lazy(()=>import("./pages/Auth/IndustryRequestPage"));
const IndustryPage = lazy(()=>import("./pages/Admin/Industry"));
const RegisteredIndustryPage = lazy(()=>import("./pages/Admin/RegisteredIndustry"));
const RegisteredIndustryInfoPage = lazy(()=>import("./pages/Admin/RegisteredIndustryInfo"));
const NonRegisteredIndustryPage = lazy(()=>import("./pages/Admin/NonRegisteredIndustry"));
const GovtDashboardPage = lazy(()=>import("./pages/Govt/Dashboard"));
const GovtScholarshipListPage = lazy(()=>import("./pages/Govt/ScholarshipList"));
const GovtScholarshipViewPage = lazy(()=>import("./pages/Govt/ScholarshipView"));
const FinanceDashboardPage = lazy(()=>import("./pages/Finance/Dashboard"));
const FinanceScholarshipListPage = lazy(()=>import("./pages/Finance/ScholarshipList"));
const FinanceScholarshipViewPage = lazy(()=>import("./pages/Finance/ScholarshipView"));
const AdminScholarshipListPage = lazy(()=>import("./pages/Admin/ScholarshipList"));
const AdminScholarshipViewPage = lazy(()=>import("./pages/Admin/ScholarshipView"));
const AdminNonContributionListPage = lazy(()=>import("./pages/Admin/NonContribution"));
const AdminContributionListPage = lazy(()=>import("./pages/Admin/ContributionList"));
const PaymentOfficerDashboardPage = lazy(()=>import("./pages/PaymentOfficer/Dashboard"));
const PaymentOfficerNonContributionListPage = lazy(()=>import("./pages/PaymentOfficer/NonContribution"));
const PaymentOfficerContributionListPage = lazy(()=>import("./pages/PaymentOfficer/ContributionList"));

function App() {

  return (
    <>
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
                      <Route path={page_routes.admin.student} element={<StudentPage />} />
                      <Route path={page_routes.admin.state} element={<StatePage />} />
                      <Route path={page_routes.admin.city} element={<CityPage />} />
                      <Route path={page_routes.admin.taluq} element={<TaluqPage />} />
                      <Route path={page_routes.admin.institute.all} element={<InstitutePage />} />
                      <Route path={page_routes.admin.institute.request} element={<RequestInstitutePage />} />
                      <Route path={page_routes.admin.institute.non_registered} element={<NonRegisteredInstitutePage />} />
                      <Route path={page_routes.admin.institute.registered} element={<RegisteredInstitutePage />} />
                      <Route path={page_routes.admin.institute.registered_info(":id")} element={<RegisteredInstituteInfoPage />} />
                      <Route path={page_routes.admin.industry.all} element={<IndustryPage />} />
                      <Route path={page_routes.admin.industry.request} element={<RequestIndustryPage />} />
                      <Route path={page_routes.admin.industry.non_registered} element={<NonRegisteredIndustryPage />} />
                      <Route path={page_routes.admin.industry.registered} element={<RegisteredIndustryPage />} />
                      <Route path={page_routes.admin.industry.registered_info(":id")} element={<RegisteredIndustryInfoPage />} />
                      <Route path={page_routes.admin.security_question} element={<SecurityQuestionPage />} />
                      <Route path={page_routes.admin.application_date} element={<ApplicationDatePage />} />
                      <Route path={page_routes.admin.application_fee} element={<ApplicationFeePage />} />
                      <Route path={page_routes.admin.scholarship.processing_list} element={<AdminScholarshipListPage />} />
                      <Route path={page_routes.admin.scholarship.approved_list} element={<AdminScholarshipListPage />} />
                      <Route path={page_routes.admin.scholarship.pending_list} element={<AdminScholarshipListPage />} />
                      <Route path={page_routes.admin.scholarship.rejected_list} element={<AdminScholarshipListPage />} />
                      <Route path={page_routes.admin.scholarship.payment_processed_list} element={<AdminScholarshipListPage />} />
                      <Route path={page_routes.admin.scholarship.view(":id")} element={<AdminScholarshipViewPage />} />
                      <Route path={page_routes.admin.contribution.pending_list} element={<AdminNonContributionListPage />} />
                      <Route path={page_routes.admin.contribution.completed_list} element={<AdminContributionListPage />} />
                    </Route>
                </Route>

                {/* Govt Routes Starts */}
                <Route element={<GovtAuthorisedLayout />}>
                    <Route element={<DashboardLayout />}>
                      <Route path={page_routes.govt.dashboard} element={<GovtDashboardPage />} />
                      <Route path={page_routes.govt.scholarship.approved_list} element={<GovtScholarshipListPage />} />
                      <Route path={page_routes.govt.scholarship.pending_list} element={<GovtScholarshipListPage />} />
                      <Route path={page_routes.govt.scholarship.rejected_list} element={<GovtScholarshipListPage />} />
                      <Route path={page_routes.govt.scholarship.view(":id")} element={<GovtScholarshipViewPage />} />
                    </Route>
                </Route>
                {/* Govt Routes Ends */}

                {/* Finance Routes Starts */}
                <Route element={<FinanceAuthorisedLayout />}>
                    <Route element={<DashboardLayout />}>
                      <Route path={page_routes.finance.dashboard} element={<FinanceDashboardPage />} />
                      <Route path={page_routes.finance.scholarship.payment_pending_list} element={<FinanceScholarshipListPage />} />
                      <Route path={page_routes.finance.scholarship.payment_processed_list} element={<FinanceScholarshipListPage />} />
                      <Route path={page_routes.finance.scholarship.payment_failed_list} element={<FinanceScholarshipListPage />} />
                      <Route path={page_routes.finance.scholarship.view(":id")} element={<FinanceScholarshipViewPage />} />
                    </Route>
                </Route>
                {/* Finance Routes Ends */}

                {/* Payment Officer Routes Starts */}
                <Route element={<PaymentOfficerAuthorisedLayout />}>
                    <Route element={<DashboardLayout />}>
                      <Route path={page_routes.payment_officer.dashboard} element={<PaymentOfficerDashboardPage />} />
                      <Route path={page_routes.payment_officer.contribution.pending_list} element={<PaymentOfficerNonContributionListPage />} />
                      <Route path={page_routes.payment_officer.contribution.completed_list} element={<PaymentOfficerContributionListPage />} />
                    </Route>
                </Route>
                {/* Payment Officer Routes Ends */}

                
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
                      <Route path={page_routes.student.dashboard} element={<StudentDashboardPage />} />
                      <Route path={page_routes.student.scholarship.apply} element={<StudentApplyScholarshipPage />} />
                      <Route path={page_routes.student.scholarship.resubmit} element={<StudentResubmitScholarshipPage />} />
                      <Route path={page_routes.student.scholarship.status} element={<StudentScholarshipStatusPage />} />
                      <Route path={page_routes.student.scholarship.list} element={<StudentScholarshipListPage />} />
                      <Route path={page_routes.student.scholarship.view(":id")} element={<StudentScholarshipViewPage />} />
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
                      <Route path={page_routes.institute.dashboard} element={<InstituteDashboardPage />} />
                      <Route path={page_routes.institute.scholarship.list} element={<InstituteScholarshipListPage />} />
                      <Route path={page_routes.institute.scholarship.view(":id")} element={<InstituteScholarshipViewPage />} />
                    </Route>
                </Route>
                <Route element={<InstituteAuthorisedLayout roles={[RolesEnum.INSTITUTE]} />}>
                    <Route element={<DashboardLayout />}>
                      <Route path={page_routes.institute.employee} element={<InstituteEmployeePage />} />
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
                      <Route path={page_routes.industry.dashboard} element={<IndustryDashboardPage />} />
                      <Route path={page_routes.industry.scholarship.list} element={<IndustryScholarshipListPage />} />
                      <Route path={page_routes.industry.scholarship.view(":id")} element={<IndustryScholarshipViewPage />} />
                    </Route>
                </Route>
                <Route element={<IndustryAuthorisedLayout roles={[RolesEnum.INDUSTRY]} />}>
                    <Route element={<DashboardLayout />}>
                      <Route path={page_routes.industry.employee} element={<IndustryEmployeePage />} />
                      <Route path={page_routes.industry.payment.list} element={<IndustryPaymentListPage />} />
                      <Route path={page_routes.industry.payment.view(":id")} element={<IndustryPaymentViewPage />} />
                      <Route path={page_routes.industry.payment.pay} element={<IndustryMakePaymentPage />} />
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
          {/* Industry Routes Ends */}

          <Route element={<SuspenseOutlet />}>
            <Route path={page_routes.main} element={<HomePage />} />
            <Route path="*" element={<PageNotFound />} /> {/* 👈 Renders Page Not Found Screen */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
