import { Route, Routes } from "react-router-dom"
import LayoutClient from "./layouts/Client"
import Home from "./pages/Home"
import Login from "./pages/Auth/login"
import Register from "./pages/Auth/register"
import Rooms from "./pages/Rooms"
import AboutPage from "./pages/AboutPage/about"
import ForgotPassword from "./pages/Auth/forgot_password"
import SmoothSlide from "./components/SmoothSlide"


function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<LayoutClient />}>
          <Route index element={<Home />} />
          <Route path='rooms' element={<Rooms />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="abc" element={<SmoothSlide />} />

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
