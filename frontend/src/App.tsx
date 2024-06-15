import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { page_routes } from "./utils/page_routes"
import UserProvider from "./contexts/userProvider"
import PersistLayout from "./layouts/Persist"
const AuthLayout = lazy(()=>import("./layouts/Auth"));
const ProtectedLayout = lazy(()=>import("./layouts/Protected"));
const GuestLayout = lazy(()=>import("./layouts/Guest"));
const DashboardLayout = lazy(()=>import("./layouts/Dashboard"));
const LoginPage = lazy(()=>import("./pages/Auth/LoginPage"));
const RegisterPage = lazy(()=>import("./pages/Auth/Register"));
const ForgotPasswordPage = lazy(()=>import("./pages/Auth/ForgotPassword"));
const DashboardPage = lazy(()=>import("./pages/Dashboard"));

function App() {

  return (
    <>
      <UserProvider>
        <BrowserRouter basename={page_routes.main}>
          <Routes>
            <Route element={<PersistLayout />}>
              <Route element={<ProtectedLayout />}>
                <Route element={<DashboardLayout />}>
                  <Route path={page_routes.dashboard} element={<DashboardPage />} />
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
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </>
  )
}

export default App
