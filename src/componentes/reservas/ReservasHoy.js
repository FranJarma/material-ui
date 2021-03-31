import React, {useState} from 'react';
import Navbar from './../diseño/Navbar.js';
import { List, ListItemAvatar, ListItemText, Divider, makeStyles, Typography, ListItem, Avatar, Button } from '@material-ui/core';
import Buscar from './../diseño/Buscar.js';
import Alert from '@material-ui/lab/Alert';
import Paginacion from './../diseño/Paginacion.js';
import CheckIcon from '@material-ui/icons/Check';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import Footer from '../diseño/Footer.js';
import {
    KeyboardTimePicker,
  } from '@material-ui/pickers';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles((theme) => ({
    titulo: {
        fontFamily: "Roboto Condensed, sans-serif",
        textTransform: "uppercase",
        fontSize: 25,
        textAlign: "center"
    },
    cartaReservas: {
        flexGrow: 1,
        paddingLeft: 20,
        boxShadow: "0 2px 3px rgba(0,0,0,0.25), 0 0 3px rgba(0,0,0,0.22)",
        backgroundColor: theme.palette.background.paper,
        marginLeft: "1rem",
        marginRight: "1rem"
    },
    inputHoraIngreso: {
        fontFamily: "Roboto Condensed, sans-serif",
        "& .MuiFormLabel-root.Mui-focused": {
            color: "#448aff"
        },
        "& .MuiInput-underline:after": {
            borderBottomColor: "#448aff"
        },
    },
    inputHoraSalida: {
        fontFamily: "Roboto Condensed, sans-serif",
        "& .MuiFormLabel-root.Mui-focused": {
            color: "#43a047"
        },
        "& .MuiInput-underline:after": {
            borderBottomColor: "#43a047"
        },
    },
    botonValidarReserva: {
        backgroundColor: "#448aff",
        color: "#ffffff",
        float: "right",
        fontFamily: "Roboto Condensed, sans-serif",
        textTransform: "uppercase",
        marginLeft: "auto",
        alignContent: "auto",
        fontSize: 15,
        "&:hover":{
            backgroundColor: "#448aff",
        }
    },
    botonCancelar: {
        color: "#000000",
        fontFamily: "Roboto Condensed, sans-serif",
        textTransform: "uppercase",
        marginLeft: "auto",
        alignContent: "auto"
    },
    botonConcluirReserva: {
        backgroundColor: "#43a047",
        color: "#ffffff",
        float: "right",
        fontFamily: "Roboto Condensed, sans-serif",
        textTransform: "uppercase",
        marginLeft: "auto",
        alignContent: "auto",
        fontSize: 15,
        "&:hover":{
            backgroundColor: "#43a047",
        }
    },
    alerta:{
        position: "relative",
        marginLeft: "1rem",
        marginRight: "1rem",
        borderRadius: 0
    },
}));

const ReservasHoy = () => {
    const classes = useStyles();
    //state para la hora de ingreso y salida
    const [horaIngreso, setearHoraIngreso] = useState(new Date());
    const handleCambiarHoraIngreso = (horaIngreso) => {
        setearHoraIngreso(horaIngreso);
    };
    const [horaSalida, setearHoraSalida] = useState(new Date());
    const handleCambiarHoraSalida = (horaSalida) => {
        setearHoraSalida(horaSalida);
    };
    //states para validar y concluir reservas
    const [abrirModalValidar, setAbrirModalValidar] = useState(false);
    const handleClickAbrirModalValidar = () => {
        setAbrirModalValidar(true);
    };
    const handleClickCerrarModalValidar = () => {
        setAbrirModalValidar(false);
    };
    const [abrirModalConcluir, setAbrirModalConcluir] = useState(false);
    const handleClickAbrirModalConcluir = () => {
        setAbrirModalConcluir(true);
    };
    const handleClickCerrarModalConcluir = () => {
        setAbrirModalConcluir(false);
    };
    const reservas = [
        {
            id: 0,
            avatar: "FJ",
            nombreCompleto: "Francisco Jarma",
            patente: "LZY450",
            marca: "Volkswagen",
            tipo: "Auto",
            precio: "$100",
            horaIngreso: "",
            horaSalida: "",
            lugar: "11"
        },
        {
            id: 1,
            avatar: "JL",
            nombreCompleto: "Juan Lopez",
            patente: "ASD123",
            marca: "Peugeot",
            tipo: "Auto",
            precio: "$100",
            horaIngreso: "19:20",
            horaSalida: "",
            lugar: "1"
        },
    ];
    return (
        <>
            <Navbar/>
            <Typography className={classes.titulo}>Reservas del día de hoy</Typography>
            &nbsp;
            <Alert className={classes.alerta} severity="info" variant="filled">En esta pantalla usted podrá ver todas aquellas reservas hechas en el día de la fecha
            por usuarios registrados. Además podrá:
             <ul>
                 <li>Validar una reserva para registrar el horario de ingreso del cliente al establecimiento.</li>
                 <li>Concluir una reserva para registrar el horario de salida del cliente del establecimiento.</li>
            </ul>
            </Alert>
             &nbsp;
            <List className = {classes.cartaReservas}>
            <Buscar/>
                    {reservas.map(reserva =>(
                    <>
                    <ListItem key={reserva.id}>
                        <ListItemAvatar>
                            <Avatar>{reserva.avatar}</Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={reserva.nombreCompleto} secondary={
                            <>
                            <Typography>Lugar: {reserva.lugar}</Typography>
                            <Typography>Marca del vehículo: {reserva.marca}</Typography>
                            <Typography>Patente del vehículo: {reserva.patente}</Typography>
                            <Typography>Tipo de vehículo: {reserva.tipo}</Typography>
                            <Typography>Precio: {reserva.precio}</Typography>
                            <Typography>Hora de Ingreso: {reserva.horaIngreso}</Typography>
                            <Typography>Hora de Salida: {reserva.horaSalida}</Typography>
                            </>
                        }>
                        </ListItemText>
                        <ListItemText>
                            {reserva.horaIngreso === "" ?
                            <>
                            <Button
                            endIcon={<CheckIcon/>}
                            className= {classes.botonValidarReserva} onClick={handleClickAbrirModalValidar}>
                            Validar
                            </Button>
                            <Dialog open={abrirModalValidar} onClose={handleClickCerrarModalValidar} aria-labelledby="form-dialog-title">
                                <DialogTitle id="form-dialog-title">Validar reserva</DialogTitle>
                                <DialogContent>
                                <DialogContentText> Para validar la reserva por favor ingrese la hora exacta de ingreso del cliente</DialogContentText>
                                <KeyboardTimePicker
                                    className={classes.inputHoraIngreso}
                                    autoFocus
                                    value={horaIngreso}
                                    fullWidth
                                    label="Hora de ingreso"
                                    onChange={handleCambiarHoraIngreso}
                                    margin="dense"
                                />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClickCerrarModalValidar} endIcon={<CheckIcon/>} className={classes.botonValidarReserva}>Validar reserva</Button>
                                    <Button onClick={handleClickCerrarModalValidar} className={classes.botonCancelar}>Cancelar</Button>
                                </DialogActions>
                            </Dialog>
                            </>
                            :
                            <>
                            <Button
                            endIcon={<DoneAllIcon/>}
                            className= {classes.botonConcluirReserva}
                            onClick={handleClickAbrirModalConcluir}>Concluir</Button>
                            <Dialog open={abrirModalConcluir} onClose={handleClickCerrarModalConcluir} aria-labelledby="form-dialog-title">
                                <DialogTitle id="form-dialog-title">Concluir reserva</DialogTitle>
                                <DialogContent>
                                <DialogContentText>Para concluir la reserva por favor ingrese la hora exacta de salida del cliente</DialogContentText>
                                <KeyboardTimePicker
                                    className={classes.inputHoraSalida}
                                    autoFocus
                                    value={horaSalida}
                                    fullWidth
                                    label="Hora de salida"
                                    onChange={handleCambiarHoraSalida}
                                    margin="dense"
                                />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClickCerrarModalConcluir} endIcon={<DoneAllIcon/>} className={classes.botonConcluirReserva}>Concluir reserva</Button>
                                    <Button onClick={handleClickCerrarModalConcluir} className={classes.botonCancelar}>Cancelar</Button>
                                </DialogActions>
                            </Dialog>
                            </>
                            }
                        </ListItemText>
                    </ListItem>
                <Divider></Divider>
                    </>
                    ))}
            </List>
            <Paginacion/>
            <Footer/>
        </>
    );
}
 
export default ReservasHoy;