
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
import BuscarReserva from './componentes/reservas/BuscarReserva.js';
import SpinnerState from './context/spinner/spinnerState.js';
import AlertaState from './context/alerta/alertaState.js';

import firebase, {FirebaseContext} from '../src/firebase';
import useAutenticado from './hooks/useAutenticado';
import RutaPrivada from './componentes/rutas/RutaPrivada';

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
        <AlertaState>
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
                    <RutaPrivada exact path="/reservas-del-dia" component={ReservasHoy}>
                    </RutaPrivada>
                    <RutaPrivada exact path="/nuevo-cobro" component={NuevoCobro}>
                    </RutaPrivada>
                    <RutaPrivada exact path="/reservas-calendario" component={ReservasCalendario}>
                    </RutaPrivada>
                    <RutaPrivada exact path="/cambiar-fecha" component={CambiarFechaReserva}>
                    </RutaPrivada>
                    <RutaPrivada exact path="/mi-estacionamiento" component={Estacionamiento}>
                    </RutaPrivada>
                    <RutaPrivada exact path="/valoraciones" component={Comentarios}>
                    </RutaPrivada>
                    <RutaPrivada exact path="/datos-personales" component={DatosPersonales}>
                    </RutaPrivada>
                    <RutaPrivada exact path="/reportes" component={Reportes}>
                    </RutaPrivada>
                    <RutaPrivada exact path="/tarifas" component={Tarifas}>
                    </RutaPrivada>
                    <RutaPrivada exact path="/lugares" component={Lugares}>
                    </RutaPrivada>
                    <RutaPrivada exact path="/encargados" component={Encargados}>
                    </RutaPrivada>
                    <RutaPrivada exact path="/estacionamientos" component={Estacionamientos}>
                    </RutaPrivada>
                    <RutaPrivada exact path="/buscar" component={BuscarReserva}>
                    </RutaPrivada>
                  </Switch>
                </Router>
              </MuiPickersUtilsProvider>
          </SpinnerState>
        </AlertaState>
      </PaginacionState>
    </FirebaseContext.Provider>
    </>
  );
}

export default App;
