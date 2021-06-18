import React, {useState, useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import NavbarCliente from '../diseño/NavbarCliente.js';
import { Typography, Grid, Card, TextField, CardContent, Chip, InputAdornment, IconButton} from '@material-ui/core';
import Paginacion from '../diseño/Paginacion.js';
import Footer from '../diseño/Footer.js';
import PaginacionContext from '../../context/paginacion/paginacionContext';
import SpinnerContext from '../../context/spinner/spinnerContext.js';
import Spinner from '../diseño/Spinner.js';
import { FirebaseContext } from '../../firebase';
import Toast from './../diseño/Toast';
import {useStyles} from './Styles';
import * as CEstacionamientos from './../../constantes/estacionamientos/CEstacionamientos';
import EstacionamientoCliente from './EstacionamientoCliente.js';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ChatIcon from '@material-ui/icons/Chat';
import SearchIcon from '@material-ui/icons/Search';
import ViewListIcon from '@material-ui/icons/ViewList';

const EstacionamientosMasBaratos = () => {
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
    const datosChip = [
        {id: 0, label: 'Todos', icono: <ViewListIcon style={{color: "#4db6ac"}}/>, link: '/encontrar-estacionamiento'},
        {id: 1, label: 'Horario corrido', icono: <WatchLaterIcon style={{color: "#4db6ac"}}/>, link: '/encontrar-estacionamiento/abiertos-todos-los-dias'},
        {id: 2, label: 'Abiertos todos los días', icono: <EventAvailableIcon style={{color: "#4db6ac"}}/>, link: '/encontrar-estacionamiento/horario-corrido'},
        {id: 3, label: 'Más valorados', icono: <ThumbUpIcon style={{color: "#4db6ac"}}/>, link: '/encontrar-estacionamiento/mas-valorados'},
        {id: 4, label: 'Más comentados', icono: <ChatIcon style={{color: "#4db6ac"}}/>, link: '/encontrar-estacionamiento/mas-comentados'},
        {id: 5, label: 'Cercanos a mi ubicación', icono: <PersonPinCircleIcon style={{color: "#4db6ac"}}/>, link: '/encontrar-estacionamiento/mas-cercanos'},
        {id: 6, label: 'Precios más bajos', icono: <AttachMoneyIcon style={{color: "#4db6ac"}}/>, link: '/encontrar-estacionamiento/mas-baratos'},
    ];
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
    // useEffect(()=>{
    //     navigator.geolocation.getCurrentPosition(posicion => {
    //         setPosicion({
    //             latitud: posicion.coords.latitude,
    //             longitud: posicion.coords.longitude
    //         })
    //         alert(`Geolocalización:${posicion.coords.latitude};${posicion.coords.longitude}`);
    //     });
    // },[setPosicion])
    useEffect(()=> {
        localStorage.removeItem('infoPersona');
        localStorage.removeItem('infoReserva');
        localStorage.removeItem('fecha');
    });
    return (
        (!cargando ? 
        <>
        <NavbarCliente/>
        <Typography style={{color: "#000000", fontHeight: 'bold'}} className={classes.tituloModal}>Estacionamientos más baratos: {estacionamientos.length}</Typography>
                    <Card className={classes.cartaFiltros}>
                        <CardContent>
                            <TextField
                            placeholder="Buscar..."
                            className = {classes.inputFiltros}
                            fullWidth
                            type="text"
                            variant="outlined"
                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                    <IconButton><SearchIcon/></IconButton>
                                </InputAdornment>,
                              }}
                            ></TextField>
                            <div style={{justifyContent: 'center',
                            backgroundColor: "#4db6ac",
                            display: 'flex', flexWrap: 'wrap'}}>
                                {datosChip.map((data)=>{
                                return(
                                <>
                                <Link style={{textDecoration: 'none', marginRight: '0.5rem', marginBottom: '0.5rem'}} to={{
                                    pathname: data.link,
                                }}>
                                        <Chip
                                            className={classes.chip}
                                            clickable
                                            icon={data.icono}
                                            label={data.label}
                                        />
                                    </Link>
                                    </>
                                );
                                })}
                            </div>
                        </CardContent>
                    </Card>
                <Grid container>
                    {estacionamientos.slice((pagina-1)* itemsPorPagina, pagina*itemsPorPagina).map(estacionamiento =>(
                        <>
                        <Grid item lg={3}>
                            <EstacionamientoCliente key={estacionamiento.uid} estacionamiento={estacionamiento}/>
                        </Grid>
                        </>
                    ))}
                </Grid>
                {estacionamientos.length > 0 ? <Paginacion lista={estacionamientos}/> : ""}
            <Footer/>
        </>
    : <Spinner></Spinner>)
);
}
 
export default EstacionamientosMasBaratos;