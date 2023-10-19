import { Route, Routes } from "react-router-dom"
import LayoutClient from "./layouts/Client"
import AboutPage from "./pages/AboutPage/about"
import ForgotPassword from "./pages/Auth/forgot_password"
import Login from "./pages/Auth/login"
import Profile from "./pages/Auth/profile"
import Register from "./pages/Auth/register"
import ResetPassword from "./pages/Auth/reset-passwork"
import Checkout from "./pages/Checkout"
import Home from "./pages/Home"
import Detail from "./pages/Room/Detail"
import RoomBooked from "./pages/RoomBooked"
import Rooms from "./pages/Rooms"
import Contact from "./pages/contact"
import Demo from "./pages/demo"
import ConfirmCheckout from "./pages/Confirmchechout"


function App() {

  return (
    <>
      <Routes>
      
        <Route path='/' element={<LayoutClient />}>
          <Route index element={<Home />} />
          <Route path='rooms' element={<Rooms />} />
          <Route path="detail/:id" element={<Detail />} />
          <Route path="contact" element={<Contact />} />
          <Route path="profile" element={<Profile />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="confirmcheckout" element={<ConfirmCheckout />} />
          <Route path='user'>
            <Route path='roomBooked' element={<RoomBooked />} />
          </Route>
        </Route>
        <Route path='/auth'>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forGotPassword" element={<ForgotPassword />} />
          <Route path="reset/:token" element={<ResetPassword />} />
          {/* <Route path="resetpassword" element={<ResetPassword />} /> */}
        </Route>

        <Route path="demo" element={<Demo />} />

      </Routes>
    </>
  )
}

export default App
