import { Route, Routes } from "react-router-dom"
import LayoutClient from "./layouts/Client"
import Home from "./pages/Home"
import Rooms from "./pages/Rooms"


function App() {
 

  return (
    <>
      <Routes>
        <Route path ='/' element={<LayoutClient/>}> 
          <Route index element = {<Home/>}/>
          <Route path='rooms' element = {<Rooms/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
