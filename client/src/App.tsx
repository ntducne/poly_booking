import { Route, Routes } from "react-router-dom"
import Detail from "./pages/Room/Detail"
import Contact from "./pages/contact"
import LayoutClient from "./layouts/Client"
import Home from "./pages/Home"
import Login from "./pages/Auth/login"
import Register from "./pages/Auth/register"
import Rooms from "./pages/Rooms"
import { Profiler } from "react"
import Profile from "./pages/Auth/profile"
import Checkout from "./pages/Checkout"


function App() {


  return (
    <>
      <Routes>

        <Route path='/' element={<LayoutClient />}>
          <Route index element={<Home />} />
          <Route path='rooms' element={<Rooms />} />
          <Route path="detail" element={<Detail />} />
          <Route path="contact" element={<Contact />} />
          <Route path="profile" element={<Profile />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
        <Route path='/auth'>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
         
          
        </Route>
      </Routes>
    </>
  )
}

export default App
