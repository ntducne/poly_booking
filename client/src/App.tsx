import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Auth/login"
import Register from "./pages/Auth/register"


function App() {


  return (
    <>
      <Routes>
        <Route path='/'>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

        </Route>
      </Routes>
    </>
  )
}

export default App
