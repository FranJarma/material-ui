import React, {useState, useContext, useEffect} from 'react';
import NavbarCliente from '../diseño/NavbarCliente.js';
import { Typography, Grid} from '@material-ui/core';
import Paginacion from '../diseño/Paginacion.js';
import Footer from '../diseño/Footer.js';
import PaginacionContext from '../../context/paginacion/paginacionContext';
import SpinnerContext from '../../context/spinner/spinnerContext.js';
import Spinner from '../diseño/Spinner.js';
import { FirebaseContext } from '../../firebase';
import Toast from './../diseño/Toast';
import {useStyles} from './Styles';
import EstacionamientoCliente from './EstacionamientoCliente.js';

const EncontrarEstacionamientoMapa = () => {
    const classes = useStyles();
    //context de paginación y spinner
    const paginacionContext = useContext(PaginacionContext);
    const { pagina, itemsPorPagina } = paginacionContext;
    const spinnerContext = useContext(SpinnerContext);
    const { cargando } = spinnerContext;
    //state para guardar estacionamientos
    const [estacionamientos, guardarEstacionamientos] = useState([]);
    //state para geolocalización
    const[posicion, setPosicion] = useState({
        latitud: '',
        longitud: ''
    })
   const {firebase} = useContext(FirebaseContext);
   //use effect para que constantemente traiga los estacionamientos
   useEffect (() => {
       const obtenerEstacionamientos = () => {
           try {
               firebase.db.collection('estacionamientos').orderBy('nombreCompleto', 'asc')
               .onSnapshot(manejarSnapshot); 
           } catch (error) {
               Toast(error);
           }
       }
       obtenerEstacionamientos();
   },[])
   function manejarSnapshot(snapshot){
    if (!snapshot) return;
    const estacionamientos = snapshot.docs.map(doc => {
        return {
            id: doc.id,
            ...doc.data()
        }
    });
    guardarEstacionamientos(estacionamientos);
}
    //useEffect para preguntarle al usuario si quiere conocer su ubicación
    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(posicion => {
            setPosicion({
                latitud: posicion.coords.latitude,
                longitud: posicion.coords.longitude
            })
            alert(`Geolocalización:${posicion.coords.latitude};${posicion.coords.longitude}`);
        });
    },[setPosicion])

    return (
        (!cargando ? 
        <>
            <NavbarCliente/>
                <Typography style={{color: "#000000", fontHeight: 'bold'}} className={classes.tituloModal}>{posicion ? "Estacionamientos cercanos a tu ubicación: ": "Estacionamientos registrados: "}{estacionamientos.length}</Typography>
                    <Grid container>
                        {estacionamientos.slice((pagina-1)* itemsPorPagina, pagina*itemsPorPagina).map(estacionamiento =>(
                        <>
                            <EstacionamientoCliente key={estacionamiento.uid} estacionamiento={estacionamiento}/>
                        </>
                        ))}
                    </Grid>
                {estacionamientos.length > 0 ? <Paginacion lista={estacionamientos}/> : ""}
            <Footer/>
        </>
    : <Spinner></Spinner>)
);
}
 
export default EncontrarEstacionamientoMapa;