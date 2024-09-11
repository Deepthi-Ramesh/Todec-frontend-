import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Todo from './components/Todo/Todo';
import Home from './components/Home/Home';
function App() {
  
  return (
   
  <div>
    <div className="App">
      
          <BrowserRouter>
            <Routes>
              <Route  exact element={<Home/>} path='/'/>
                <Route  exact element={<Register/>} path='/register'/>
                <Route  exact element={<Login/>} path='/login'/>
                <Route  exact element={<Todo/>} path='/user/:userid'/>
             
            </Routes>
          </BrowserRouter>
      
    </div>
  </div>
  );
}

export default App;
