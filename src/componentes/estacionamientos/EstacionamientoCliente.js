import React, {useState, useContext, useEffect} from 'react';
import { Typography, Button, Card, Grid, CardContent, Chip, TextareaAutosize, CardActionArea
 } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import {useStyles} from './Styles';
import * as CEstacionamientos from './../../constantes/estacionamientos/CEstacionamientos';
import * as CGeneral from './../../constantes/general/CGeneral';
import Mapa from './../mapas/Mapa.js';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import CallIcon from '@material-ui/icons/Call';
import StarIcon from '@material-ui/icons/Star';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Rating } from '@material-ui/lab';
import Toast from '../diseño/Toast';
import Swal from '../diseño/Swal';
import { FirebaseContext } from '../../firebase';
 
const EstacionamientoCliente = ({estacionamiento}) => {
    const { firebase } = useContext(FirebaseContext);
    //states para los modals
    const [modalVerMas, setAbrirModalVerMas] = useState(false);
    const handleClickAbrirModalVerMas= () => {
        setPuntuacion('');
        setInfo('');
        setAbrirModalVerMas(true);
    };
    const handleClickCerrarModalVerMas = () => {
        setPuntuacion('');
        setInfo('');
        setAbrirModalVerMas(false);
    };
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

    const classes = useStyles();
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
                setAbrirModalVerMas(false);
            }
        } catch (error) {
            console.log(error);
            Toast(error.code);
        }
    }
    return ( 
        <>
            <Link style={{textDecoration: 'none'}} to={{
                pathname: `detalles-estacionamiento/${estacionamiento.id}`,
                state: {estacionamiento}
            }}>
            <Card className={classes.cartaEstacionamientosCliente}>
                <CardActionArea>
                    <img className={classes.imagen} src={estacionamiento.urlImagen}></img>
                    <Typography style={{textAlign: "center"}} className={classes.nombreCompleto}>{estacionamiento.nombreCompleto}</Typography>
                    <div style={{display: 'flex', textAlign: 'center'}}><StarIcon style={{color:"#4db6ac"}}/><Typography style={{textAlign:'center'}} className={classes.campos}>{estacionamiento.valoracion.toFixed(2)}</Typography></div>
                    <div style={{display: 'flex', textAlign: 'center'}}><LocationOnIcon style={{color:"#4db6ac"}}/><Typography style={{textAlign:'center'}} className={classes.campos}>{estacionamiento.ubicacion.provincia} | {estacionamiento.ubicacion.direccion}</Typography></div>
                    <div style={{display: 'flex', textAlign: 'center'}}><CallIcon style={{color:"#4db6ac"}}/><Typography style={{textAlign:'center'}} className={classes.campos}>{estacionamiento.telefono}</Typography></div>
                </CardActionArea>
            </Card>
        </Link>
        <Dialog style={{zIndex: 1}} maxWidth={'md'} open={modalVerMas} onClose={handleClickCerrarModalVerMas} aria-labelledby="form-dialog-title">
            <div style={{backgroundColor: '#43a047'}}>
                <Typography className={classes.tituloModal} id="form-dialog-title">
                    {estacionamiento.nombreCompleto}
                    <Typography onClick={handleClickCerrarModalVerMas}
                    className={classes.botonCerrarModal}>
                    X</Typography>
                </Typography>
            </div>
            <DialogContent>
                <DialogContentText>
                    <Mapa containerElement={<div style={{ height: '350px', width: 'auto' }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                        isMarkerShown
                        lat={estacionamiento.ubicacion.latitud}
                        lng={estacionamiento.ubicacion.longitud}
                        nombre={estacionamiento.nombreCompleto}
                    >
                    </Mapa>
                    <Grid container spacing={3}>
                        <Grid item lg={6} xs={6}>
                            <Typography className={classes.camposTitulosLugares}>Tarifas:</Typography>
                            <Typography className={classes.campos}>Auto: ${estacionamiento.tarifas[0].valor}</Typography>
                            <Typography className={classes.campos}>Camioneta: ${estacionamiento.tarifas[1].valor}</Typography>
                            <Typography className={classes.campos}>Motocicleta: ${estacionamiento.tarifas[2].valor}</Typography>
                            <Typography className={classes.campos}>Traffic: ${estacionamiento.tarifas[3].valor}</Typography>
                        </Grid>
                        <Grid item lg={6} xs={6}>
                            <Typography className={classes.camposTitulosLugares}>Horarios:</Typography>
                            {estacionamiento.horarios[0].apertura !== "" ?<Typography className={classes.campos}>Lunes: {estacionamiento.horarios[0].apertura.split(':')[0]} a {estacionamiento.horarios[0].cierre.split(':')[0]} hs </Typography>:""}
                            {estacionamiento.horarios[1].apertura !== "" ?<Typography className={classes.campos}>Martes: {estacionamiento.horarios[1].apertura.split(':')[0]} a {estacionamiento.horarios[1].cierre.split(':')[0]} hs </Typography>:""}
                            {estacionamiento.horarios[2].apertura !== "" ?<Typography className={classes.campos}>Miércoles: {estacionamiento.horarios[2].apertura.split(':')[0]} a {estacionamiento.horarios[2].cierre.split(':')[0]} hs </Typography>:""}
                            {estacionamiento.horarios[3].apertura !== "" ?<Typography className={classes.campos}>Jueves: {estacionamiento.horarios[3].apertura.split(':')[0]} a {estacionamiento.horarios[3].cierre.split(':')[0]} hs </Typography>:""}
                            {estacionamiento.horarios[4].apertura !== "" ?<Typography className={classes.campos}>Viernes: {estacionamiento.horarios[4].apertura.split(':')[0]} a {estacionamiento.horarios[4].cierre.split(':')[0]} hs </Typography>:""}
                            {estacionamiento.horarios[5].apertura !== "" ?<Typography className={classes.campos}>Sábado: {estacionamiento.horarios[5].apertura.split(':')[0]} a {estacionamiento.horarios[5].cierre.split(':')[0]} hs </Typography>:""}
                            {estacionamiento.horarios[6].apertura !== "" ?<Typography className={classes.campos}>Domingo: {estacionamiento.horarios[6].apertura.split(':')[0]} a {estacionamiento.horarios[6].cierre.split(':')[0]} hs </Typography>:""}
                        </Grid>
                        <Grid item lg={12} xs={12}>
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
                    </Grid>
                </DialogContentText>
            </DialogContent>
        </Dialog> 
        </>
        );
}
 
export default EstacionamientoCliente;