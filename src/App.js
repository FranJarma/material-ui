import Login from './componentes/auth/Login.js';
import Registrar from './componentes/auth/Registrar.js';
import RecuperarContraseña from './componentes/auth/RecuperarContraseña.js';
import ReservasHoy from './componentes/reservas/ReservasHoy.js';
import ReservasCalendario from './componentes/reservas/ReservasCalendario.js';
import CambiarFechaReserva from './componentes/reservas/CambiarFechaReserva.js';
import NuevoCobro from './componentes/reservas/NuevoCobro.js';
import BuscarReserva from './componentes/reservas/BuscarReserva.js';

import Estacionamiento from './componentes/estacionamientos/Estacionamiento.js';
import Comentarios from './componentes/estacionamientos/Comentarios.js';
import DatosPersonales from './componentes/estacionamientos/DatosPersonales.js';
import Tarifas from './componentes/estacionamientos/Tarifas.js';
import Lugares from './componentes/estacionamientos/Lugares.js';
import Estacionamientos from './componentes/estacionamientos/Estacionamientos.js';

import Usuarios from './componentes/usuarios/Usuarios.js';

import Reportes from './componentes/reportes/Reportes.js';

import RutaPrivada from './componentes/rutas/RutaPrivada';
import Home from './componentes/Home.js';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import esLocale from "date-fns/locale/es";
import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import PaginacionState from './context/paginacion/paginacionState';
import SpinnerState from './context/spinner/spinnerState.js';

import firebase, {FirebaseContext} from '../src/firebase';
import useAutenticado from './hooks/useAutenticado';
import AdministrarUsuario from './componentes/usuarios/AdministrarUsuario';

function App() {
  const usuario = useAutenticado();
  return (
    <>
    <FirebaseContext.Provider
      value={{
        firebase,
        usuario
      }}
    >
      <PaginacionState>
          <SpinnerState>
              <MuiPickersUtilsProvider locale={esLocale} utils={DateFnsUtils}>
                <Router>
                  <Switch>
                    <Route exact path="/" component={Login}>
                    </Route>
                    <Route exact path="/home" component={Home}>
                    </Route>
                    <Route exact path="/nueva-cuenta" component={Registrar}>
                    </Route>
                    <Route exact path="/recuperar-contraseña" component={RecuperarContraseña}>
                    </Route>
                    <Route exact path="/reservas-del-dia" component={ReservasHoy}>
                    </Route>
                    <Route exact path="/nuevo-cobro" component={NuevoCobro}>
                    </Route>
                    <Route exact path="/reservas-calendario" component={ReservasCalendario}>
                    </Route>
                    <Route exact path="/cambiar-fecha" component={CambiarFechaReserva}>
                    </Route>
                    <Route exact path="/mi-estacionamiento" component={Estacionamiento}>
                    </Route>
                    <Route exact path="/valoraciones" component={Comentarios}>
                    </Route>
                    <Route exact path="/datos-personales" component={DatosPersonales}>
                    </Route>
                    <Route exact path="/reportes" component={Reportes}>
                    </Route>
                    <Route exact path="/tarifas" component={Tarifas}>
                    </Route>
                    <Route exact path="/lugares" component={Lugares}>
                    </Route>
                    <Route exact path="/usuarios" component={Usuarios}>
                    </Route>
                    <Route exact path="/nuevo-usuario" component={AdministrarUsuario}>
                    </Route>
                    <Route exact path="/estacionamientos" component={Estacionamientos}>
                    </Route>
                    <Route exact path="/buscar" component={BuscarReserva}>
                    </Route>
                  </Switch>
                </Router>
              </MuiPickersUtilsProvider>
          </SpinnerState>
      </PaginacionState>
    </FirebaseContext.Provider>
    </>
  );
}

export default App;
