import Login from "./componentes/auth/Login.js";
import Registrar from "./componentes/auth/Registrar.js";
import RecuperarContraseña from "./componentes/auth/RecuperarContraseña.js";
import ReservasHoy from "./componentes/reservas/ReservasHoy.js";
import ReservasCalendario from "./componentes/reservas/ReservasCalendario.js";
import CambiarFechaReserva from "./componentes/reservas/CambiarFechaReserva.js";
import NuevoCobro from "./componentes/reservas/NuevoCobro.js";
import BuscarReserva from "./componentes/reservas/BuscarReserva.js";

import MiEstacionamiento from "./componentes/estacionamientos/MiEstacionamiento.js";
import DatosPersonales from "./componentes/usuarios/DatosPersonales.js";
import Lugares from "./componentes/estacionamientos/Lugares.js";
import Estacionamientos from "./componentes/estacionamientos/Estacionamientos.js";

import Usuarios from "./componentes/usuarios/Usuarios.js";

import Reportes from "./componentes/reportes/Reportes.js";

import RutaPrivada from "./componentes/rutas/RutaPrivada";
import Home from "./componentes/Home.js";

import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import esLocale from "date-fns/locale/es";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PaginacionState from "./context/paginacion/paginacionState";
import SpinnerState from "./context/spinner/spinnerState.js";

import firebase, { FirebaseContext } from "../src/firebase";
import useAutenticado from "./hooks/useAutenticado";
import AdministrarUsuario from "./componentes/usuarios/AdministrarUsuario";
import AdministrarHorasDias from "./componentes/estacionamientos/AdministrarHorasDias.js";
import EncontrarEstacionamiento from "./componentes/estacionamientos/EncontrarEstacionamiento";
import CambiarContraseña from "./componentes/usuarios/CambiarContraseña";
import Landing from "./componentes/Landing";
import EncontrarEstacionamientoMapa from "./componentes/estacionamientos/EncontrarEstacionamientoMapa.js";
import DetallesEstacionamientoCliente from "./componentes/estacionamientos/DetallesEstacionamientoCliente.js";
import NuevaReserva from "./componentes/reservas/NuevaReserva.js";
import MisReservas from "./componentes/reservas/MisReservas.js";
import Mensualidades from "./componentes/reservas/Mensualidades";
import RutaPrivadaCliente from "./componentes/rutas/RutaPrivadaCliente.js";

function App() {
  const usuario = useAutenticado();
  return (
    <>
      <FirebaseContext.Provider
        value={{
          firebase,
          usuario,
        }}
      >
        <PaginacionState>
          <SpinnerState>
            <MuiPickersUtilsProvider locale={esLocale} utils={DateFnsUtils}>
              <Router>
                <Switch>
                  <Route exact path="/" component={Landing}></Route>
                  <Route
                    exact
                    path="/encontrar-estacionamiento"
                    component={EncontrarEstacionamiento}
                  ></Route>
                  <Route
                    path="/detalles-estacionamiento/:id"
                    component={DetallesEstacionamientoCliente}
                  ></Route>
                  <RutaPrivadaCliente
                    path="/nueva-reserva/estacionamientoId=:id"
                    component={NuevaReserva}
                  ></RutaPrivadaCliente>
                  <RutaPrivadaCliente
                    path="/mis-reservas"
                    component={MisReservas}
                  ></RutaPrivadaCliente>
                  <Route
                    exact
                    path="/encontrar-estacionamiento-mapa"
                    component={EncontrarEstacionamientoMapa}
                  ></Route>
                  <Route
                    exact
                    path="/login-encargados"
                    component={Login}
                  ></Route>
                  <RutaPrivada
                    exact
                    path="/home"
                    component={Home}
                  ></RutaPrivada>
                  <RutaPrivada
                    exact
                    path="/nueva-cuenta"
                    component={Registrar}
                  ></RutaPrivada>
                  <Route
                    exact
                    path="/recuperar-contraseña"
                    component={RecuperarContraseña}
                  ></Route>
                  <Route
                    exact
                    path="/cambiar-contraseña"
                    component={CambiarContraseña}
                  ></Route>
                  <RutaPrivada
                    exact
                    path="/reservas-del-dia"
                    component={ReservasHoy}
                  ></RutaPrivada>
                  <RutaPrivada
                    exact
                    path="/mensualidades"
                    component={Mensualidades}
                  ></RutaPrivada>
                  <RutaPrivada
                    exact
                    path="/mis-reservas"
                    component={MisReservas}
                  ></RutaPrivada>
                  <RutaPrivada
                    exact
                    path="/nuevo-cobro"
                    component={NuevoCobro}
                  ></RutaPrivada>
                  <RutaPrivada
                    exact
                    path="/reservas-calendario"
                    component={ReservasCalendario}
                  ></RutaPrivada>
                  <RutaPrivada
                    exact
                    path="/cambiar-fecha"
                    component={CambiarFechaReserva}
                  ></RutaPrivada>
                  <RutaPrivada
                    exact
                    path="/mi-estacionamiento"
                    component={MiEstacionamiento}
                  ></RutaPrivada>
                  <RutaPrivada
                    exact
                    path="/horarios-y-dias"
                    component={AdministrarHorasDias}
                  ></RutaPrivada>
                  <RutaPrivada
                    exact
                    path="/datos-personales"
                    component={DatosPersonales}
                  ></RutaPrivada>
                  <RutaPrivada
                    exact
                    path="/reportes"
                    component={Reportes}
                  ></RutaPrivada>
                  <RutaPrivada
                    exact
                    path="/lugares"
                    component={Lugares}
                  ></RutaPrivada>
                  <RutaPrivada
                    exact
                    path="/usuarios"
                    component={Usuarios}
                  ></RutaPrivada>
                  <RutaPrivada
                    exact
                    path="/nuevo-usuario"
                    component={AdministrarUsuario}
                  ></RutaPrivada>
                  <RutaPrivada
                    exact
                    path="/estacionamientos"
                    component={Estacionamientos}
                  ></RutaPrivada>
                  <RutaPrivada
                    exact
                    path="/buscar"
                    component={BuscarReserva}
                  ></RutaPrivada>
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
