import { Route, Routes } from "react-router-dom"
import LayoutClient from "./layouts/Client"
import Home from "./pages/Home"
import Login from "./pages/Auth/login"
import Register from "./pages/Auth/register"
import Rooms from "./pages/Rooms"
import RoomBooked from "./pages/RoomBooked"


function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<LayoutClient />}>
          <Route index element={<Home />} />
          <Route path='rooms' element={<Rooms />} />
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
