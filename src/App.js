
import Login from './componentes/auth/Login.js';
import Registrar from './componentes/auth/Registrar.js';
import RecuperarContraseña from './componentes/auth/RecuperarContraseña.js';
import ReservasHoy from './componentes/reservas/ReservasHoy.js';
import ReservasCalendario from './componentes/reservas/ReservasCalendario.js';
import CambiarFechaReserva from './componentes/reservas/CambiarFechaReserva.js';
import NuevoCobro from './componentes/reservas/NuevoCobro.js';
import Estacionamiento from './componentes/estacionamientos/Estacionamiento.js';
import Comentarios from './componentes/estacionamientos/Comentarios.js';
import DatosPersonales from './componentes/estacionamientos/DatosPersonales.js';
import Reportes from './componentes/reportes/Reportes.js';
import Tarifas from './componentes/estacionamientos/Tarifas.js';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import esLocale from "date-fns/locale/es";
import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Lugares from './componentes/estacionamientos/Lugares.js';
import Encargados from './componentes/encargados/Encargados.js';
import Estacionamientos from './componentes/estacionamientos/Estacionamientos.js';
import PaginacionState from './context/paginacion/paginacionState';
import Buscar from './componentes/busqueda/Buscar.js';
import SpinnerState from './context/spinner/spinnerState.js';


function App() {
  return (
    <>
    <PaginacionState>
      <SpinnerState>
      <MuiPickersUtilsProvider locale={esLocale} utils={DateFnsUtils}>
        <Router>
          <Switch>
            <Route exact path="/" component={Login}>
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
            <Route exact path="/encargados" component={Encargados}>
            </Route>
            <Route exact path="/estacionamientos" component={Estacionamientos}>
            </Route>
            <Route exact path="/buscar" component={Buscar}>
            </Route>
          </Switch>
        </Router>
      </MuiPickersUtilsProvider>
      </SpinnerState>
    </PaginacionState>
    </>
  );
}

export default App;
