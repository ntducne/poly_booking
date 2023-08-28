import { Route, Routes } from "react-router-dom"
import LayoutClient from "./layouts/Client"
import Home from "./pages/Home"


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
