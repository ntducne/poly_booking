import { Route, Routes } from "react-router-dom"
import LayoutClient from "./layouts/Client"
import Home from "./pages/Home"
import Login from "./pages/Auth/login"
import Register from "./pages/Auth/register"
import AboutPage from "./pages/Home/about"
import ForgotPassword from "./pages/Auth/forgot_password"
// import SmoothSlide from "./components/SmoothSlide/SmoothSlide"


function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<LayoutClient />}>
          <Route index element={<Home />} />
          <Route path="about" element={<AboutPage />} />
          {/* <Route path="abc" element={<SmoothSlide />} /> */}

        </Route>
        <Route path='/auth'>
          <Route path="login" element={<Login />} />
          <Route path="forgot" element={<ForgotPassword />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
