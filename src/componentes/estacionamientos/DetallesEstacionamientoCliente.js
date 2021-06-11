import React, {useState, useContext, useEffect} from 'react';
import NavbarCliente from '../diseño/NavbarCliente.js';
import { Typography, Grid, Card, Select, TextField, CardContent, FormHelperText, Button, CardActionArea, Divider, Checkbox, Paper, Chip, CardHeader, TextareaAutosize} from '@material-ui/core';
import Paginacion from '../diseño/Paginacion.js';
import Footer from '../diseño/Footer.js';
import PaginacionContext from '../../context/paginacion/paginacionContext';
import SpinnerContext from '../../context/spinner/spinnerContext.js';
import Spinner from '../diseño/Spinner.js';
import { FirebaseContext } from '../../firebase';
import {useStyles} from './Styles';
import {useLocation} from 'react-router-dom';
import Mapa from './../mapas/Mapa.js';
import Comentarios from './../estacionamientos/Comentarios';
import { Rating } from '@material-ui/lab';
import Toast from '../diseño/Toast';
import Swal from '../diseño/Swal';
import * as CEstacionamientos from './../../constantes/estacionamientos/CEstacionamientos';
import * as CGeneral from './../../constantes/general/CGeneral';
const DetallesEstacionamientoCliente = () => {
    const location = useLocation();
    const { estacionamiento } = location.state;
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
   const { firebase } = useContext(FirebaseContext);
   //state para rating
   const [puntuacion, setPuntuacion] = useState('');
   //state para input de comentario
   const [info, setInfo] = useState({
       comentario: ''
   });
   const {comentario} = info;
   const onChange = (e) => {
       setInfo({
           ...info,
           [e.target.name] : e.target.value});
   }
   //función de firebase para registrar puntuación
   async function registrarPuntuacion () {
       //valoracion = sum(puntuaciones)/len(puntuacions)
       try {
           if (comentario === "" || puntuacion === "") {
               Toast(CEstacionamientos.INGRESE_COMENTARIO);
           }
           else {
               await firebase.registrarPuntuacion(estacionamiento.id, comentario, parseFloat(puntuacion));
               Swal(CGeneral.OPERACION_COMPLETADA, CEstacionamientos.COMENTARIO_REGISTRADO);
           }
       } catch (error) {
           console.log(error);
           Toast(error.code);
       }
   }
    return (
        (!cargando ? 
        <>
        <NavbarCliente/>
        <Typography style={{color: "#000000", fontHeight: 'bold'}} className={classes.tituloModal}>{estacionamiento.nombreCompleto}</Typography>
            <Grid container>
                <Grid item lg={10} xs={12}>
                    <Mapa containerElement={<div style={{ height: '430px', width: 'auto', marginLeft: "1rem", marginRight: "1rem"}} />}
                        mapElement={<div style={{ height: `100%` }} />}
                        isMarkerShown
                        lat={estacionamiento.ubicacion.latitud}
                        lng={estacionamiento.ubicacion.longitud}
                        nombre={estacionamiento.nombreCompleto}
                    >
                    </Mapa>
                </Grid>
                    <Grid item lg={2} xs={12}>
                        <Card style={{marginLeft:'1rem', marginRight: '1rem', marginTop: '2rem', marginBottom: '1rem'}}>
                            <CardContent>
                                <div className={classes.camposTitulos}>Tarifas</div>
                                <Typography className={classes.campos} style={{marginLeft:'1.5rem'}}>Auto: ${estacionamiento.tarifas[0].valor}</Typography>
                                <Typography className={classes.campos} style={{marginLeft:'1.5rem'}}>Camioneta: ${estacionamiento.tarifas[1].valor}</Typography>
                                <Typography className={classes.campos} style={{marginLeft:'1.5rem'}}>Motocicleta: ${estacionamiento.tarifas[2].valor}</Typography>
                                <Typography className={classes.campos} style={{marginLeft:'1.5rem'}}>Traffic: ${estacionamiento.tarifas[3].valor}</Typography>
                                <Divider></Divider>
                                <div className={classes.camposTitulos}>Horarios</div>
                                {estacionamiento.horarios[0].apertura !== "" ?<Typography className={classes.campos} style={{marginLeft:'1.5rem'}}>Lunes: {estacionamiento.horarios[0].apertura.split(':')[0]} a {estacionamiento.horarios[0].cierre.split(':')[0]} hs </Typography>:""}
                                {estacionamiento.horarios[1].apertura !== "" ?<Typography className={classes.campos} style={{marginLeft:'1.5rem'}}>Martes: {estacionamiento.horarios[1].apertura.split(':')[0]} a {estacionamiento.horarios[1].cierre.split(':')[0]} hs </Typography>:""}
                                {estacionamiento.horarios[2].apertura !== "" ?<Typography className={classes.campos} style={{marginLeft:'1.5rem'}}>Miércoles: {estacionamiento.horarios[2].apertura.split(':')[0]} a {estacionamiento.horarios[2].cierre.split(':')[0]} hs </Typography>:""}
                                {estacionamiento.horarios[3].apertura !== "" ?<Typography className={classes.campos} style={{marginLeft:'1.5rem'}}>Jueves: {estacionamiento.horarios[3].apertura.split(':')[0]} a {estacionamiento.horarios[3].cierre.split(':')[0]} hs </Typography>:""}
                                {estacionamiento.horarios[4].apertura !== "" ?<Typography className={classes.campos} style={{marginLeft:'1.5rem'}}>Viernes: {estacionamiento.horarios[4].apertura.split(':')[0]} a {estacionamiento.horarios[4].cierre.split(':')[0]} hs </Typography>:""}
                                {estacionamiento.horarios[5].apertura !== "" ?<Typography className={classes.campos} style={{marginLeft:'1.5rem'}}>Sábado: {estacionamiento.horarios[5].apertura.split(':')[0]} a {estacionamiento.horarios[5].cierre.split(':')[0]} hs </Typography>:""}
                                {estacionamiento.horarios[6].apertura !== "" ?<Typography className={classes.campos} style={{marginLeft:'1.5rem'}}>Domingo: {estacionamiento.horarios[6].apertura.split(':')[0]} a {estacionamiento.horarios[6].cierre.split(':')[0]} hs </Typography>:""}
                            </CardContent>
                            <CardActionArea style={{textAlign: 'center'}}><Button className={classes.botonReservar}>Reservar acá</Button></CardActionArea>
                        </Card>
                    </Grid>
                <Grid item lg={12} xs={12} style={{marginLeft:'1rem', marginRight: '1rem'}}>
                <Typography className={classes.camposTitulosLugares}>Deje su comentario y valoración (estos datos son anónimos):</Typography>
                    <TextareaAutosize
                        name="comentario"
                        value={comentario}
                        onChange={onChange}
                        required
                        className={classes.inputMiEstacionamiento}
                        rowsMin={5}
                        maxLength={100}
                        style={{width: "100%", resize: 'none'}}
                        >
                    </TextareaAutosize>
                    <Rating
                    valor={puntuacion}
                    onChange={(event, nuevaPuntuacion) => {
                        setPuntuacion(nuevaPuntuacion);
                    }}
                    >
                    </Rating>
                    <Button
                    className={classes.botonAgregar}
                    onClick={registrarPuntuacion}>
                    Calificar
                    </Button>
                </Grid>
                <Grid item xs={12} lg={12}>
                    <Comentarios/>
                </Grid>
            </Grid>
            <Footer/>
        </>
    : <Spinner></Spinner>)
);
}
 
export default DetallesEstacionamientoCliente;