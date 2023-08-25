import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import LayoutClient from "./layouts/Client"


function App() {
 

  return (
    <>
      <Routes>
        <Route path ='/' element={<LayoutClient/>}> 
          <Route index element = {<Home/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
