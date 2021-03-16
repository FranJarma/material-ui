import Footer from './componentes/diseño/Footer.js';
import Navbar from './componentes/diseño/Navbar.js';
import Login from './componentes/auth/Login.js';
import Registrar from './componentes/auth/Registrar.js';
import RecuperarContraseña from './componentes/auth/RecuperarContraseña.js';
import Spinner from './componentes/diseño/Spinner.js';

import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
function App() {
  return (
    <>
    <Router>
      <Route path="/home">
        <Navbar/>
        <Footer/>
      </Route>
      <Route path="/iniciar-sesion">
        <Login/>
      </Route>
      <Route path="/nueva-cuenta">
        <Registrar/>
      </Route>
      <Route path="/recuperar-contraseña">
        <RecuperarContraseña/>
      </Route>
      <Route path="/spinner">
        <Spinner/>
      </Route>
    </Router>
    </>
  );
}

export default App;
