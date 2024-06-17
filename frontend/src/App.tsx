import { Suspense, lazy } from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom"
import { page_routes } from "./utils/page_routes"
import UserProvider from "./contexts/userProvider"
import PersistLayout from "./layouts/Persist"
import AccountProvider from "./contexts/accountProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { QueryClientOptions } from "./utils/constants";
import PageLoader from "./components/PageLoader";
import PageNotFound from "./pages/PageNotFound";
const AuthLayout = lazy(()=>import("./layouts/Auth"));
const VerifiedLayout = lazy(()=>import("./layouts/Verified"));
const AuthorisedLayout = lazy(()=>import("./layouts/Authorised"));
const ProtectedLayout = lazy(()=>import("./layouts/Protected"));
const GuestLayout = lazy(()=>import("./layouts/Guest"));
const DashboardLayout = lazy(()=>import("./layouts/Dashboard"));
const LoginPage = lazy(()=>import("./pages/Auth/LoginPage"));
const RegisterPage = lazy(()=>import("./pages/Auth/Register"));
const ForgotPasswordPage = lazy(()=>import("./pages/Auth/ForgotPassword"));
const DashboardPage = lazy(()=>import("./pages/Dashboard"));
const GraduationPage = lazy(()=>import("./pages/Graduation"));
const CoursePage = lazy(()=>import("./pages/Course"));
const ClassPage = lazy(()=>import("./pages/Class"));
const EmployeePage = lazy(()=>import("./pages/Employee"));
const StatePage = lazy(()=>import("./pages/State"));
const CityPage = lazy(()=>import("./pages/City"));
const TaluqPage = lazy(()=>import("./pages/Taluq"));

const queryClient = new QueryClient(QueryClientOptions);

function App() {

  return (
    <>
      <UserProvider>
        <QueryClientProvider client={queryClient}>
          <AccountProvider>
            <BrowserRouter basename={page_routes.main}>
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
                        </Route>
                    </Route>
                    </Route>
                  </Route>
                  <Route element={<GuestLayout />}>
                    <Route element={<AuthLayout />}>
                      <Route path={page_routes.auth.login} element={<LoginPage />} />
                      <Route path={page_routes.auth.register.student} element={<RegisterPage />} />
                      <Route path={page_routes.auth.forgot_password} element={<ForgotPasswordPage />} />
                    </Route>
                  </Route>
                </Route>
                <Route element={<Suspense fallback={<PageLoader display />}>
                    <Outlet />  
                  </Suspense>}>
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
