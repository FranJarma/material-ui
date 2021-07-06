import React, {useContext, useState, useEffect} from 'react';
import Navbar from './../diseño/Navbar.js';
import { Typography, Grid } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Paginacion from './../diseño/Paginacion.js';
import Footer from '../diseño/Footer.js';
import PaginacionContext from './../../context/paginacion/paginacionContext';
import SpinnerContext from '../../context/spinner/spinnerContext.js';
import Spinner from '../diseño/Spinner.js';
import { FirebaseContext } from '../../firebase';

import * as CReservas from './../../constantes/reservas/CReservas';
import Reserva from './Reserva';
import {useStyles} from './Styles';
import useInfoEstacionamiento from '../../hooks/useInfoEstacionamiento';
import Toast from '../diseño/Toast.js';
import traducirError from '../../firebase/errores.js';

const ReservasHoy = () => {
    const classes = useStyles();
    const fecha = new Date();
    const estacionamientoInfo = useInfoEstacionamiento();
    //state para guardar reservas
    const [reservasDelDia, guardarReservasDelDia] = useState([]);
    const {firebase} = useContext(FirebaseContext);
    //use effect para que constantemente traiga las reservas
    useEffect (() => {
        /*las reservas que se tienen que traer son las del día de hoy, con hora de salida nula
        y con el estacionamiento id del usuario logueado (encargado) */
        const obtenerReservasDeHoy = () => {
            try {
                firebase.db.collection('reservas')
                .where('fechaReserva','==',fecha.getDate() + '/'+(fecha.getMonth()+1)+'/'+fecha.getFullYear())
                .onSnapshot(manejarSnapshot); 
            } catch (error) {
                Toast(traducirError(error.code));
            }
        }
        obtenerReservasDeHoy();
    },[])
    function manejarSnapshot(snapshot){
        if (!snapshot) return;
        const reservasDelDia = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        });
        guardarReservasDelDia(reservasDelDia);
    }
    //context de paginación y spinner
    const paginacionContext = useContext(PaginacionContext);
    const { pagina, itemsPorPagina } = paginacionContext;
    const spinnerContext = useContext(SpinnerContext);
    const { cargando } = spinnerContext;
    return (
        (!cargando ? 
        <>
            <Navbar/>
            <Typography className={classes.titulo}>{CReservas.RESERVAS_HOY}</Typography>
            &nbsp;
            <Alert className={classes.alerta} severity="info" variant="filled">{CReservas.ALERTA_PRINCIPAL}
             <ul>
                 <li>{CReservas.SUB_ALERTA1}</li>
                 <li>{CReservas.SUB_ALERTA2}</li>
            </ul>
            </Alert>
             &nbsp;
            <Typography className={classes.cantidad}>{reservasDelDia.length > 0 ?
            `${CReservas.TOTAL_RESERVAS} ${reservasDelDia.length}` : `${CReservas.NO_SE_ENCONTRARON_RESERVAS}`
            }</Typography>
                <Grid container>
                    {reservasDelDia.slice((pagina-1)* itemsPorPagina, pagina*itemsPorPagina).map(reservaDelDia =>(
                        <Reserva key={reservaDelDia.id} reserva={reservaDelDia} estacionamiento={estacionamientoInfo} reservas={reservasDelDia}/>
                    ))}
                </Grid>
                {reservasDelDia.length > 0 ? <Paginacion lista={reservasDelDia}/> : ""}
            <Footer/>
        </>
        : <Spinner></Spinner>)
    );
}
 
export default ReservasHoy;