import React, {useContext, useState, useEffect,lazy, Suspense} from 'react';
import NavbarCliente from './../diseño/NavbarCliente.js';
import { TextField, Typography, Grid, MenuItem, FormHelperText, Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paginacion from './../diseño/Paginacion.js';
import Footer from '../diseño/Footer.js';
import PaginacionContext from './../../context/paginacion/paginacionContext';
import SpinnerContext from '../../context/spinner/spinnerContext.js';
import Spinner from '../diseño/Spinner.js';
import { FirebaseContext } from '../../firebase';
import * as CReservas from './../../constantes/reservas/CReservas';
import {useStyles} from './Styles';
import Toast from '../diseño/Toast.js';
import traducirError from '../../firebase/errores.js';

const CustomComponent = lazy(
    () =>
      new Promise((resolve, reject) =>
        setTimeout(() => resolve(import('./ReservaCliente')), 3000)
      )
  );

const MisReservas = () => {
    const classes = useStyles();
    //state para guardar reservas
    const {firebase} = useContext(FirebaseContext);
    //use effect para que constantemente traiga las reservas
    const [misReservas, guardarMisReservas] = useState([]);
    const [estacionamientos, guardarEstacionamientos] = useState([]);
    const [playa, setPlaya] = useState('');
    const onChangePlaya = e => {
        setPlaya(e.target.value)
    }
    useEffect (() => {
    setPlaya(0);
    /*traerá las reservas creadas recientemente, permitirá generar comprobantes (tickets) */
        const obtenerReservas = () => {
            try {
                firebase.db.collection('reservas')
                .orderBy("fechaCreacion","desc")
                .where("usuario.uid","==",localStorage.getItem('usuario'))
                .onSnapshot(manejarSnapshot); 
            } catch (error) {
                Toast(traducirError(error.code));
            }
        }
        obtenerReservas();
        const obtenerEstacionamientos = () => {
            try {
                firebase.db.collection('estacionamientos')
                .orderBy("nombreCompleto","asc")
                .onSnapshot(manejarSnapshot1); 
            } catch (error) {
                Toast(traducirError(error.code));
            }
        }
        obtenerEstacionamientos();
    },[])
    function manejarSnapshot(snapshot){
        if (!snapshot) return;
        const reservas = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        });
        guardarMisReservas(reservas);
    };
    function manejarSnapshot1(snapshot){
        if (!snapshot) return;
        const estacionamientos = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        });
        guardarEstacionamientos(estacionamientos);
    };
    async function filtrarReservasPorEstacionamiento (){
        try {
            if (playa === 0) {
                firebase.db.collection('reservas')
                .orderBy("fechaCreacion","desc")
                .where("usuario.uid","==",localStorage.getItem('usuario'))
                .onSnapshot(manejarSnapshot); 
            } 
            else {
                firebase.db.collection('reservas')
                .where("estacionamiento.id", "==", playa)
                .onSnapshot(manejarSnapshot); 
            }
            } catch (error) {
                Toast(traducirError(error.code));
        }
    }

    //context de paginación y spinner
    const paginacionContext = useContext(PaginacionContext);
    const { pagina, itemsPorPagina } = paginacionContext;
    const spinnerContext = useContext(SpinnerContext);
    const { cargando } = spinnerContext;
    return (
        (!cargando ? 
        <>
            <NavbarCliente/>
            <Typography className={classes.titulo}>{CReservas.MIS_RESERVAS}</Typography>
            &nbsp;
            <Typography className={classes.cantidad}>{misReservas.length > 0 ?
            `${CReservas.TOTAL_RESERVAS} ${misReservas.length}` : `${CReservas.NO_SE_ENCONTRARON_RESERVAS}`
            }</Typography>
                <Suspense fallback={<CircularProgress style={{position:'absolute', left: "50%", rigth: "50%"}}/>}>
                    <Grid container>
                        <Grid item xs={12} lg={4} md={6}>
                        <FormHelperText style={{marginLeft:'1rem'}}>Seleccione playa de estacionamiento</FormHelperText>
                        <div style={{display:'flex'}}>
                            <TextField
                                variant="standard"
                                fullWidth
                                name="playa"
                                value={playa}
                                onChange={onChangePlaya}
                                className={classes.selectPlaya}
                                select
                                style={{marginLeft: '1rem'}}
                            >
                            <MenuItem
                            value={0}
                            name='0'
                            >Todas</MenuItem>
                            {estacionamientos.map((estacionamiento)=>(
                                <MenuItem
                                key={estacionamiento.id}
                                value={estacionamiento.id}
                                name={estacionamiento.nombreCompleto}>{estacionamiento.nombreCompleto}</MenuItem>
                            ))}
                            </TextField>
                            <Button className={classes.botonConsultar} style={{padding: 0}} onClick={filtrarReservasPorEstacionamiento}>Filtrar</Button>
                        </div>
                        </Grid>
                    </Grid>
                    <br/>
                    <Grid container>
                        {misReservas.slice((pagina-1)* itemsPorPagina, pagina*itemsPorPagina).map(reserva =>(
                            <CustomComponent key={reserva.id} reserva={reserva}/>
                        ))}
                    </Grid>
                    {misReservas.length > 0 ? <Paginacion lista={misReservas}/> : ""}
                </Suspense>
            <Footer/>
        </>
        : <Spinner></Spinner>)
    );
}
 
export default MisReservas;