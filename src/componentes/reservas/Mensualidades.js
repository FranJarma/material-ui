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
import {useStyles} from './Styles';
import useInfoEstacionamiento from '../../hooks/useInfoEstacionamiento';
import Toast from '../diseño/Toast.js';
import traducirError from '../../firebase/errores.js';
import Mensualidad from './Mensualidad.js';

const Mensualidades = () => {
    const classes = useStyles();
    const estacionamientoInfo = useInfoEstacionamiento();
    //state para guardar reservas
    const [mensualidades, guardarMensualidades] = useState([]);
    const {firebase} = useContext(FirebaseContext);
    //use effect para que constantemente traiga las reservas
    useEffect (() => {
        /*las reservas que se tienen que traer son las del día de hoy, con hora de salida nula
        y con el estacionamiento id del usuario logueado (encargado) */
        const obtenerMensualidades = () => {
            try {
                firebase.db.collection('mensualidades')
                .where('estacionamiento.id','==', estacionamientoInfo.id)
                .onSnapshot(manejarSnapshot); 
            } catch (error) {
                console.log(error);
                Toast(traducirError(error.code));
            }
        }
        obtenerMensualidades();
    },[])
    function manejarSnapshot(snapshot){
        if (!snapshot) return;
        const mensualidades = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        });
        guardarMensualidades(mensualidades);
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
            <Typography className={classes.titulo}>{CReservas.MENSUALIDADES}</Typography>
            &nbsp;
            <Alert className={classes.alerta} severity="info" variant="filled">En esta pantalla podrá ver todas las mensualidades solicitadas por los usuarios y aprobarlas
            </Alert>
             &nbsp;
            <Typography className={classes.cantidad}>{mensualidades.length > 0 ?
            `${CReservas.TOTAL_MENSUALIDADES} ${mensualidades.length}` : `${CReservas.NO_SE_ENCONTRARON_MENSUALIDADES}`
            }</Typography>
                <Grid container>
                    {mensualidades.slice((pagina-1)* itemsPorPagina, pagina*itemsPorPagina).map(mensualidad =>(
                        <Mensualidad key={mensualidad.id} mensualidad={mensualidad} estacionamiento={estacionamientoInfo} mensualidades={mensualidades}/>
                    ))}
                </Grid>
                {mensualidades.length > 0 ? <Paginacion lista={mensualidades}/> : ""}
            <Footer/>
        </>
        : <Spinner></Spinner>)
    );
}
 
export default Mensualidades;