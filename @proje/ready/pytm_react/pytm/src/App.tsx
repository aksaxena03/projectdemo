
import './App.css'
import { Route,BrowserRouter, Routes } from 'react-router-dom'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Transfer from './pages/Transfer'
import Dashboard from './pages/Dashboard'


function App() {

  return (
  
    <BrowserRouter>
    <Routes>
    <Route element={<Signin/>} path='/Signin'></Route>
    <Route element={<Signup/>} path='/Signup'></Route>
    <Route element={<Transfer/>} path='/Transfer'></Route>
    <Route path='/Dashboard' element={<Dashboard/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
