import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import LoginAdmin from "./pages/Auth/login"
import RegisterAdmin from "./pages/Auth/register"


function App() {


  return (
    <>
      <Routes>
        <Route path='/admin'>
          <Route index element={<Home />} />
          <Route path="login" element={<LoginAdmin />} />
          <Route path="register" element={<RegisterAdmin />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
