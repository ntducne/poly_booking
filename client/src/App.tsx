import { Route, Routes } from "react-router-dom"
import Detial from "./pages/Room/Detial"
import Contact from "./pages/contact"
import LayoutClient from "./layouts/Client"
import Home from "./pages/Home"
import Login from "./pages/Auth/login"
import Register from "./pages/Auth/register"
import Rooms from "./pages/Rooms"
import Profile from "./pages/Auth/profile"
import Checkout from "./pages/Checkout"
import RoomBooked from "./pages/RoomBooked"


function App() {


  return (
    <>
      <Routes>

        <Route path='/' element={<LayoutClient />}>
          <Route index element={<Home />} />
          <Route path='rooms' element={<Rooms />} />
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
          <Route path="register" element={<Register />} />
         
          
        </Route>
      </Routes>
    </>
  )
}

export default App
