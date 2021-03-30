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
import Estacionamientos from './componentes/estacionamientos/Estacionamientos.js';
import Comentario from './componentes/estacionamientos/Comentario.js';
import DatosPersonales from './componentes/estacionamientos/DatosPersonales.js';
import Reportes from './componentes/reportes/Reportes.js';

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
        <Route path="/mi-estacionamiento">
          <Estacionamientos/>
        </Route>
        <Route path="/valoraciones">
          <Comentario/>
        </Route>
        <Route path="/datos-personales">
          <DatosPersonales/>
        </Route>
        <Route path="/reportes">
          <Reportes/>
        </Route>
      </Router>
    </MuiPickersUtilsProvider>
    </>
  );
}

export default App;
