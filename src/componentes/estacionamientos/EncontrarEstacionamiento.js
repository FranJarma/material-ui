import React, {useState, useContext, useEffect, lazy, Suspense} from 'react';
import { Link } from 'react-router-dom';
import NavbarCliente from '../diseño/NavbarCliente.js';
import { Typography, Grid, Card, TextField, CardContent, Chip, InputAdornment, IconButton} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paginacion from '../diseño/Paginacion.js';
import Footer from '../diseño/Footer.js';
import PaginacionContext from '../../context/paginacion/paginacionContext';
import SpinnerContext from '../../context/spinner/spinnerContext.js';
import Spinner from '../diseño/Spinner.js';
import { FirebaseContext } from '../../firebase';
import Toast from './../diseño/Toast';
import {useStyles} from './Styles';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ChatIcon from '@material-ui/icons/Chat';
import SearchIcon from '@material-ui/icons/Search';
import ViewListIcon from '@material-ui/icons/ViewList';
import traducirError from '../../firebase/errores.js';

const CustomComponent = lazy(
    () =>
      new Promise((resolve, reject) =>
        setTimeout(() => resolve(import('./EstacionamientoCliente')), 2000)
      )
  );
const EncontrarEstacionamientos = () => {
    const classes = useStyles();
    //context de paginación y spinner
    const paginacionContext = useContext(PaginacionContext);
    const { pagina, itemsPorPagina } = paginacionContext;
    const spinnerContext = useContext(SpinnerContext);
    const { cargando } = spinnerContext;
    //state para guardar estacionamientos
    const [estacionamientos, guardarEstacionamientos] = useState([]);

    const datosChip = [
        {id: 0, label: 'Todos', icono: <ViewListIcon style={{color: "#4db6ac"}}/>},
        {id: 1, label: 'Horario corrido', icono: <WatchLaterIcon style={{color: "#4db6ac"}}/> },
        {id: 2, label: 'Abiertos todos los días', icono: <EventAvailableIcon style={{color: "#4db6ac"}}/>},
        {id: 3, label: 'Más valorados', icono: <ThumbUpIcon style={{color: "#4db6ac"}}/>},
        {id: 4, label: 'Cercanos a mi ubicación', icono: <PersonPinCircleIcon style={{color: "#4db6ac"}}/>},
        {id: 5, label: 'Precios más bajos', icono: <AttachMoneyIcon style={{color: "#4db6ac"}}/>},
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
    console.log(estacionamientos);
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
    async function filtrarEstacionamientos (filtro){
        try {
            if (filtro === 0) {
                firebase.db.collection('estacionamientos').orderBy('nombreCompleto', 'asc')
                .onSnapshot(manejarSnapshot); 
            }
            else if (filtro === 1) {
                firebase.db.collection('estacionamientos').where('horarios', '==', 'true')
                .onSnapshot(manejarSnapshot); 
            }
            else if (filtro === 2) {
                firebase.db.collection('estacionamientos').where('todosLosDias', '==', 'true')
                .onSnapshot(manejarSnapshot); 
            }
            else if (filtro === 3) {
                firebase.db.collection('estacionamientos').orderBy('valoracion', 'desc')
                .onSnapshot(manejarSnapshot); 
            }
            else if (filtro === 4) {
                firebase.db.collection('estacionamientos').orderBy('valoracion', 'desc')
                .onSnapshot(manejarSnapshot); 
            }
            else if (filtro === 5) {
                firebase.db.collection('estacionamientos').orderBy('tarifas', 'asc')
                .onSnapshot(manejarSnapshot); 
            }
            } catch (error) {
                Toast(traducirError(error.code));
        }
    }
    return (
        (!cargando ? 
        <>
        <NavbarCliente/>
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
                        <Chip
                            style={{margin: '0.5rem'}}
                            clickable
                            icon={data.icono}
                            label={data.label}
                            onClick={() => filtrarEstacionamientos(data.id)}
                        />
                        );
                        })}
                    </div>
                </CardContent>
            </Card>
            <Suspense fallback={<CircularProgress style={{position:'absolute', left: "50%", rigth: "50%"}}/>}>
                <Typography style={{color: "#000000", fontHeight: 'bold'}} className={classes.tituloModal}>Estacionamientos encontrados: {estacionamientos.length}</Typography>
                <Grid container>
                    {estacionamientos.slice((pagina-1)* itemsPorPagina, pagina*itemsPorPagina).map(estacionamiento =>(
                        <>
                            <Grid item lg={3} md={4} xs={12}>
                                <CustomComponent key={estacionamiento.uid} estacionamiento={estacionamiento}/>
                            </Grid>
                        </>
                    ))}
                </Grid>
                {estacionamientos.length > 0 ? <Paginacion lista={estacionamientos}/> : ""}
            </Suspense>
            <Footer/>
        </>
    : <Spinner></Spinner>)
);
}
 
export default EncontrarEstacionamientos;