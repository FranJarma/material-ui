import React, {useState, useContext} from 'react';
import NavbarCliente from '../diseño/NavbarCliente.js';
import { Typography, Grid, Card, CardContent, Button, CardActionArea, Divider, TextareaAutosize, Dialog, DialogTitle, DialogContent, FormHelperText, TextField, DialogActions, MenuItem, Select} from '@material-ui/core';
import { Link } from 'react-router-dom';
import Footer from '../diseño/Footer.js';
import SpinnerContext from '../../context/spinner/spinnerContext.js';
import Spinner from '../diseño/Spinner.js';
import { FirebaseContext } from '../../firebase';
import {useStyles} from './Styles';
import {useLocation} from 'react-router-dom';
import Mapa from './../mapas/Mapa.js';
import Comentarios from './../estacionamientos/Comentarios';
import { Alert, Rating } from '@material-ui/lab';
import Toast from '../diseño/Toast';
import Swal from '../diseño/Swal';
import * as CEstacionamientos from './../../constantes/estacionamientos/CEstacionamientos';
import * as CGeneral from './../../constantes/general/CGeneral';
import traducirError from '../../firebase/errores.js';
import CheckIcon from '@material-ui/icons/Check';
import useInfoUsuario from '../../hooks/useInfoUsuario';
import { TimePicker } from "@material-ui/pickers";

const DetallesEstacionamientoCliente = () => {
    const location = useLocation();
    const usuario = useInfoUsuario();
    const { estacionamiento } = location.state;
    const classes = useStyles();
    const spinnerContext = useContext(SpinnerContext);
    const { cargando } = spinnerContext;
    const { firebase } = useContext(FirebaseContext);
    //state para rating
    const [puntuacion, setPuntuacion] = useState('');
    //state para input de comentario
    const [info, setInfo] = useState({
        comentario: '',
        observaciones: ''
    });
    const [diasSeleccionados, setDiasSeleccionados] = useState([]);
    const [horaIngreso, setHoraIngreso] = useState(new Date());
    const [horaSalida, setHoraSalida] = useState(new Date());
    const handleChangeDiasSeleccionados = (e) => {
        const {
          target: { value },
        } = e;
        setDiasSeleccionados(
          // On autofill we get a the stringified value.
          typeof value === 'string' ? value.split(',') : value,
        );
      };
    //modal
    const [modalSolicitarMensualidad, setModalSolicitarMensualidad] = useState(false);
    const handleChangeModalSolicitarMensualidad = () => {
        setModalSolicitarMensualidad(!modalSolicitarMensualidad);
    }
    const {comentario, observaciones} = info;
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
            Toast(traducirError(error.code));
        }
    }
    async function solicitarMensualidad () {
        try {
            if(diasSeleccionados.length === 0) Toast('Complete todos los campos');
            if(horaIngreso > horaSalida) Toast('La hora de salida no puede ser mayor que la de ingreso');
            await firebase.solicitarMensualidad(usuario, estacionamiento,
         diasSeleccionados,horaIngreso.getHours() + ':' + horaIngreso.getMinutes(),
            horaIngreso.getHours() + ':' + horaIngreso.getMinutes(), observaciones);
            Swal(CGeneral.OPERACION_COMPLETADA, "La mensualidad ha sido solicitada");
            setModalSolicitarMensualidad(false);
        } catch (error) {
            Toast(traducirError(error.code));
        }
    }
    const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
    return (
        (!cargando ? 
        <>
        <NavbarCliente/>
        <Typography style={{color: "#000000", fontHeight: 'bold'}} className={classes.tituloModal}>{estacionamiento.nombreCompleto}</Typography>
            <Grid container>
                <Grid item lg={9} md={9} xs={12}>
                    <Mapa containerElement={<div style={{ height: '430px', width: 'auto', marginLeft: "1rem", marginRight: "1rem"}} />}
                        mapElement={<div style={{ height: `100%` }} />}
                        isMarkerShown
                        lat={estacionamiento.ubicacion.latitud}
                        lng={estacionamiento.ubicacion.longitud}
                        nombre={estacionamiento.nombreCompleto}
                    >
                    </Mapa>
                </Grid>
                    <Grid item lg={3} md={3} xs={12}>
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
                                pathname: `/nueva-reserva/estacionamientoId=${estacionamiento.id}`,
                                state: {estacionamiento}
                            }}>
                            <Button fullWidth variant="contained" color="primary">Reservar acá</Button>
                            </Link>
                            <Button color="primary" fullWidth onClick={handleChangeModalSolicitarMensualidad}>Solicitar mensualidad</Button>
                        </Card>
                    </Grid>
                    <Dialog fullWidth open={modalSolicitarMensualidad} onClose={handleChangeModalSolicitarMensualidad} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Solicitar Mensualidad</DialogTitle>
                        <DialogContent style={{overflow: 'hidden'}}>
                        <Grid container spacing={3} >
                            <Grid item xs={12} md={12} lg={12} xl={12}>
                                <FormHelperText>Seleccione días</FormHelperText>
                                <Select 
                                variant="outlined"
                                fullWidth
                                value={diasSeleccionados}
                                onChange={handleChangeDiasSeleccionados}
                                multiple
                                >
                                    {dias.map((nombre)=>(
                                        <MenuItem key={nombre} value={nombre}>{nombre}</MenuItem>
                                    ))}
                                </Select>
                            </Grid>
                            <Grid item xs={6} md={6} lg={6} xl={6}>
                                <TimePicker
                                clearable
                                label="Hora de Ingreso"
                                value={horaIngreso}
                                minutesStep={10}
                                onChange={hora => setHoraIngreso(hora)}
                                fullWidth
                                inputVariant="outlined"
                            />
                            </Grid>
                            <Grid item xs={6} md={6} lg={6} xl={6}>
                                <TimePicker
                                clearable
                                label="Hora de Salida"
                                value={horaSalida}
                                minutesStep={10}
                                onChange={hora => setHoraSalida(hora)}
                                fullWidth
                                inputVariant="outlined"
                            />
                            </Grid>
                            <Grid item xs={12} md={12} lg={12} xl={12}>
                            <FormHelperText>Observaciones (motivo de mensualidad, forma de pago, etc)</FormHelperText>
                            <TextareaAutosize
                                name="observaciones"
                                value={observaciones}
                                onChange={onChange}
                                required
                                className={classes.inputMiEstacionamiento}
                                rowsMin={5}
                                maxLength={100}
                                style={{width: "100%", resize: 'none'}}
                                >
                            </TextareaAutosize>
                            <Alert severity="info">Una vez registrada la solicitud, la misma le llegará al encargado de la playa de estacionamiento para que la pueda revisar y aprobar</Alert>
                            </Grid>
                        </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={solicitarMensualidad} endIcon={<CheckIcon/>} variant="contained" color="primary">Confirmar</Button>
                            <Button onClick={handleChangeModalSolicitarMensualidad} className={classes.botonCancelar}>{CGeneral.CANCELAR}</Button>
                        </DialogActions>
                    </Dialog>
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