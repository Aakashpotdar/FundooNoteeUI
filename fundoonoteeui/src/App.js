import * as React from 'react';
import './App.css';
import Signup from './pages/signup/Signup';
import Signin from './pages/Signin/Signin';
import {BrowserRouter as Router , Link ,Routes, Route } from "react-router-dom"
import Resetpassword from './pages/Resetpassword/Resetpassword';
import Forgetpassword from './pages/Forgetpassword/Forgetpassword';
import Dashboard from './pages/Dashboard/Dashboard';
import Trash from './pages/Trash/Trash';
import Archive from './pages/Archive/Archive';

function App() {
  return (
    <div className="App">
      {/* <Signup/> */}
      {/* <Dashboard/> */} 
      {/* <Router> */}
          <Routes>
            <Route path='/Signup' element={ <Signup/> } />
            <Route path='/' element={ <Signin/> } />
            <Route path='/Resetpassword' element={ <Resetpassword/> } />
            <Route path='/Forgetpassword/id' element={ <Forgetpassword/> } />
            <Route path='/Dashboard/*' element={ <Dashboard/> } >
              <Route path='Trash' element={ <Trash/> } />
              <Route path='Archive' element={ <Archive/> } />
            </Route>
          </Routes>
        {/* </Router>  */}
    </div>
  );
}

export default App;