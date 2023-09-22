import { Route, Routes } from "react-router-dom"
import SmoothSlide from "./components/SmoothSlide"
import LayoutClient from "./layouts/Client"
import AboutPage from "./pages/AboutPage/about"
import ForgotPassword from "./pages/Auth/forgot_password"
import Login from "./pages/Auth/login"
import Profile from "./pages/Auth/profile"
import Register from "./pages/Auth/register"
import Checkout from "./pages/Checkout"
import Home from "./pages/Home"
import Detial from "./pages/Room/Detial"
import Rooms from "./pages/Rooms"
import Contact from "./pages/contact"


import RoomBooked from "./pages/RoomBooked"


function App() {


  return (
    <>
      <Routes>

        <Route path='/' element={<LayoutClient />}>
          <Route index element={<Home />} />
          <Route path='rooms' element={<Rooms />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="detail" element={<Detial />} />
          <Route path="contact" element={<Contact />} />
          <Route path="profile" element={<Profile />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path='user'>
            <Route path='roomBooked' element={<RoomBooked />} />
          </Route>
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
