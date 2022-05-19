import React, {useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
//import { PrivateRoute } from './auth/PrivateRoute'

import Login from "./features/login/Login"
import Messages  from "./features/messages/Messages"
import Users from "./features/users/Users"
import Signin from './features/signin/Signin'
import "./css/customBS.min.css"

function App() {
  const [ logedUser, setlogedUser ] = useState(null);
  const [ admin, setAdmin ] = useState(false);

  function respLogin(resp) {
    if (resp === 'admin') {
      setAdmin(true)
    }
    if (resp === 'user') {
      setlogedUser(true)
      localStorage.setItem("userActive", logedUser)
    }
  }

  useEffect(() => {
    let user = localStorage.getItem("userActive");
    user && JSON.parse(user) ? setlogedUser(true) : setlogedUser(false);
  }, []);

  useEffect(()=> {
    localStorage.setItem("userActive", logedUser)
  }, [logedUser])

  return (
      <Router>
        <Routes>
          < Route path="Signin" element={ <Signin /> } />

          {admin && (
            < Route path="Users" element={ <Users logout={() => setAdmin(false)} /> } />
          )}
          
          {logedUser && (
            < Route path="Messages" element={ <Messages logout={() => setlogedUser(false)}/> } />
          )}          

          < Route path="/" element={ <Login respLogin={respLogin}/> } />
          
          <Route path="*" element={<Navigate to={logedUser ? "Messages" : "/"}/>} />

        </Routes>
      </Router>
  );
}

export default App;
