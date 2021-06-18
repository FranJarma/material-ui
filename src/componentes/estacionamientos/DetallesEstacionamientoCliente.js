import React, {useState, useContext} from 'react';
import NavbarCliente from '../diseño/NavbarCliente.js';
import { Typography, Grid, Card, CardContent, Button, CardActionArea, Divider, TextareaAutosize} from '@material-ui/core';
import { Link } from 'react-router-dom';
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
                <Grid item lg={9} xs={12}>
                    <Mapa containerElement={<div style={{ height: '430px', width: 'auto', marginLeft: "1rem", marginRight: "1rem"}} />}
                        mapElement={<div style={{ height: `100%` }} />}
                        isMarkerShown
                        lat={estacionamiento.ubicacion.latitud}
                        lng={estacionamiento.ubicacion.longitud}
                        nombre={estacionamiento.nombreCompleto}
                    >
                    </Mapa>
                </Grid>
                    <Grid item lg={3} xs={12}>
                        <Card style={{marginLeft:'1rem', marginRight: '1rem', marginTop: '2rem', marginBottom: '1rem'}}>
                            <CardContent>
                                <div className={classes.camposTitulosLugares}>Tarifas</div>
                                <ul>
                                    <li>Auto: ${estacionamiento.tarifas[0].valor}</li>
                                    <li>Camioneta: ${estacionamiento.tarifas[1].valor}</li>
                                    <li>Motocicleta: ${estacionamiento.tarifas[2].valor}</li>
                                    <li>Traffic: ${estacionamiento.tarifas[3].valor}</li>
                                </ul>
                                <Divider></Divider>
                                <br/>
                                <div className={classes.camposTitulosLugares}>Horarios</div>
                                <ul>
                                    {estacionamiento.horarios[0].apertura !== "" ?<li>Lunes: {estacionamiento.horarios[0].apertura.split(':')[0]}:{estacionamiento.horarios[0].apertura.split(':')[1]} a {estacionamiento.horarios[0].cierre.split(':')[0]}:{estacionamiento.horarios[0].cierre.split(':')[1]} hs </li>:""}
                                    {estacionamiento.horarios[1].apertura !== "" ?<li>Martes: {estacionamiento.horarios[1].apertura.split(':')[0]}:{estacionamiento.horarios[1].apertura.split(':')[1]} a {estacionamiento.horarios[1].cierre.split(':')[0]}:{estacionamiento.horarios[1].cierre.split(':')[1]} hs </li>:""}
                                    {estacionamiento.horarios[2].apertura !== "" ?<li>Miércoles: {estacionamiento.horarios[2].apertura.split(':')[0]}:{estacionamiento.horarios[2].apertura.split(':')[1]} a {estacionamiento.horarios[2].cierre.split(':')[0]}:{estacionamiento.horarios[2].cierre.split(':')[1]} hs </li>:""}
                                    {estacionamiento.horarios[3].apertura !== "" ?<li>Jueves: {estacionamiento.horarios[3].apertura.split(':')[0]}:{estacionamiento.horarios[3].apertura.split(':')[1]} a {estacionamiento.horarios[3].cierre.split(':')[0]}:{estacionamiento.horarios[3].cierre.split(':')[1]} hs </li>:""}
                                    {estacionamiento.horarios[4].apertura !== "" ?<li>Viernes: {estacionamiento.horarios[4].apertura.split(':')[0]}:{estacionamiento.horarios[4].apertura.split(':')[1]} a {estacionamiento.horarios[4].cierre.split(':')[0]}:{estacionamiento.horarios[4].cierre.split(':')[1]} hs </li>:""}
                                    {estacionamiento.horarios[5].apertura !== "" ?<li>Sábado: {estacionamiento.horarios[5].apertura.split(':')[0]}:{estacionamiento.horarios[5].apertura.split(':')[1]} a {estacionamiento.horarios[5].cierre.split(':')[0]}:{estacionamiento.horarios[5].cierre.split(':')[1]} hs </li>:""}
                                    {estacionamiento.horarios[6].apertura !== "" ?<li>Domingo: {estacionamiento.horarios[6].apertura.split(':')[0]}:{estacionamiento.horarios[6].apertura.split(':')[1]} a {estacionamiento.horarios[6].cierre.split(':')[0]}:{estacionamiento.horarios[6].cierre.split(':')[1]} hs </li>:""}
                                </ul>
                            </CardContent>
                            <Link style={{textDecoration: 'none'}} to={{
                                pathname: `/nueva-reserva/${estacionamiento.nombreCompleto}`,
                                state: {estacionamiento}
                            }}>
                            <CardActionArea style={{textAlign: 'center'}}>
                                <Button className={classes.botonReservar}>Reservar acá</Button>
                            </CardActionArea>
                            </Link>
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
                    <Comentarios comentarios={estacionamiento.comentarios}/>
                </Grid>
            </Grid>
            <Footer/>
        </>
    : <Spinner></Spinner>)
);
}
 
export default DetallesEstacionamientoCliente;