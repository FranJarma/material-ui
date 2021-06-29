import React, {useState, useContext} from 'react';
import Navbar from './../diseño/Navbar.js';
import { makeStyles,
Typography, Button, Grid } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Paginacion from './../diseño/Paginacion.js';
import Footer from '../diseño/Footer.js';
import PaginacionContext from './../../context/paginacion/paginacionContext';
import SpinnerContext from '../../context/spinner/spinnerContext.js';
import Spinner from '../diseño/Spinner.js';
import Reserva from './Reserva';
import * as CGeneral from './../../constantes/general/CGeneral';
import * as CReservas from './../../constantes/reservas/CReservas';
import { FirebaseContext } from '../../firebase';
import useInfoEstacionamiento from '../../hooks/useInfoEstacionamiento';
import Toast from './../diseño/Toast';
import {useStyles} from './Styles';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';
const ReservasCalendario = () => {
    const [fecha, setFecha] = useState(null);

    const classes = useStyles();
    //state para guardar reservas
    const [reservasDeUnDia, guardarReservasDeUnDia] = useState([]);
    const {firebase} = useContext(FirebaseContext);
    const estacionamientoInfo = useInfoEstacionamiento();
    //context de paginación y spinner
    const paginacionContext = useContext(PaginacionContext);
    const { pagina, itemsPorPagina } = paginacionContext;
    const spinnerContext = useContext(SpinnerContext);
    const { cargando, mostrarSpinner } = spinnerContext;
    //las reservas que se tienen que traer son las de un día determinado
    const obtenerReservasDeUnDia = () => {
        try {
            if (fecha === null) {
                Toast(CGeneral.SELECCIONE_FECHA);
            }
            else {
                mostrarSpinner(CGeneral.BUSCANDO);
                firebase.db.collection('reservas')
                .where('fechaReserva','==',fecha.getDate() + '/'+(fecha.getMonth()+1)+'/'+fecha.getFullYear())
                .onSnapshot(manejarSnapshot); 
            }
        } catch (error) {
            Toast(error);
        }
    };
    function manejarSnapshot(snapshot){
        if (!snapshot) return;
        const reservasDeUnDia = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        });
        guardarReservasDeUnDia(reservasDeUnDia);
    }
    return (
        (!cargando ? 
        <>  
            <Navbar/>
            <Typography className={classes.titulo}>{CReservas.CALENDARIO_RESERVAS}</Typography>
            &nbsp;
            <Alert className={classes.alerta} severity="info" variant="filled">{CReservas.ALERTA_CALENDARIO}
            </Alert>
            &nbsp;
            <div className={classes.container}>
            <DatePicker
                placeholderText="Fecha de reserva"
                locale={es}
                onChange={setFecha}
                value={fecha}
                selected={fecha}
                dateFormat="dd/MM/yyyy"
                withPortal
            />
            <Button onClick={obtenerReservasDeUnDia} className= {classes.botonConsultar}>{CGeneral.CONSULTAR}</Button>
            </div>
            &nbsp;
            &nbsp;
            <Typography className={classes.cantidad}>{reservasDeUnDia.length > 0 ?
            `${CReservas.TOTAL_RESERVAS_ENCONTRADAS} ${reservasDeUnDia.length}` : `${CReservas.NO_SE_ENCONTRARON_RESERVAS}`
            }</Typography>
                <Grid container>
                    {reservasDeUnDia.slice((pagina-1)* itemsPorPagina, pagina*itemsPorPagina).map(reserva =>(
                        <Reserva key={reserva.id} reserva={reserva} estacionamiento={estacionamientoInfo} reservas={reservasDeUnDia}/>
                    ))}
                </Grid>
                {reservasDeUnDia.length > 0 ? <Paginacion lista={reservasDeUnDia}/> : ""}
            <Footer/>
        </>
    : <Spinner></Spinner>)
    );
}
 
export default ReservasCalendario;