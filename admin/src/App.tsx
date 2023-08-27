import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import LoginAdmin from "./pages/Auth/login"


function App() {


  return (
    <>
      <Routes>
        <Route path='/admin'>
          <Route index element={<Home />} />
          <Route path="login" element={<LoginAdmin />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
