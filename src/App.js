import Footer from './componentes/diseño/Footer.js';
import Navbar from './componentes/diseño/Navbar.js';
import Login from './componentes/auth/Login.js';
import Registrar from './componentes/auth/Registrar.js';
import RecuperarContraseña from './componentes/auth/RecuperarContraseña.js';
import Spinner from './componentes/diseño/Spinner.js';
import ReservasHoy from './componentes/reservas/ReservasHoy.js';
import ReservasCalendario from './componentes/reservas/ReservasCalendario.js';
import CambiarFechaReserva from './componentes/reservas/CambiarFechaReserva.js';
import NuevoCobro from './componentes/cobros/NuevoCobro.js';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import esLocale from "date-fns/locale/es";
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';



function App() {
  return (
    <>
    <MuiPickersUtilsProvider locale={esLocale} utils={DateFnsUtils}>
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
        <Route path="/reservas-del-dia">
          <ReservasHoy/>
        </Route>
        <Route path="/nuevo-cobro">
          <NuevoCobro/>
        </Route>
        <Route path="/reservas-calendario">
          <ReservasCalendario/>
        </Route>
        <Route path="/cambiar-fecha">
          <CambiarFechaReserva/>
        </Route>
      </Router>
    </MuiPickersUtilsProvider>
    </>
  );
}

export default App;
