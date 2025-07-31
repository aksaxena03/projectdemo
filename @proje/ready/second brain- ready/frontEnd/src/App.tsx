import BrainDash from './componet/pages/BrainDash';
import SignIn from './componet/pages/SignIn';
import SignUp from './componet/pages/SignUp';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import SharedBrain from './componet/SharedBrain';

function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Routes>
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/Dash' element={<BrainDash />} />
          <Route path='/' element={<SignIn />} />
          <Route path='/api/v1/content/:sharedlink' element={<SharedBrain />} />

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
