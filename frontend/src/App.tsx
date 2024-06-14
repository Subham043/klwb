import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginPage from "./pages/Auth/LoginPage"
import { page_routes } from "./utils/page_routes"
import AuthLayout from "./layouts/Auth"
import RegisterPage from "./pages/Auth/Register"
import ForgotPasswordPage from "./pages/Auth/ForgotPassword"
import DashboardPage from "./pages/Dashboard"
import DashboardLayout from "./layouts/Dashboard"

function App() {

  return (
    <>
      <BrowserRouter basename={page_routes.main}>
        <Routes>
          <Route element={<DashboardLayout />}>
            <Route path={page_routes.dashboard} element={<DashboardPage />} />
          </Route>
          <Route element={<AuthLayout />}>
            <Route path={page_routes.auth.login} element={<LoginPage />} />
            <Route path={page_routes.auth.register.student} element={<RegisterPage />} />
            <Route path={page_routes.auth.forgot_password} element={<ForgotPasswordPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
