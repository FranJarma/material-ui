import React, {useState} from 'react';
import Navbar from './../diseño/Navbar.js';
import { makeStyles, Typography, Avatar, Button, Card, CardContent } from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
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
        marginBottom: "1rem",
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
        marginLeft: "5rem",
        marginTop: "1rem",
        textAlign: "center",
        fontFamily: "Roboto Condensed, sans-serif",
        textTransform: "uppercase",
        fontSize: 15,
        "&:hover":{
            backgroundColor: "#448aff",
        }
    },
    botonCancelar: {
        color: "#000000",
        fontFamily: "Roboto Condensed, sans-serif",
        textTransform: "uppercase",
        marginTop: "1rem",
        marginLeft: "auto",
        alignContent: "auto"
    },
    botonConcluirReserva: {
        backgroundColor: "#43a047",
        color: "#ffffff",
        fontFamily: "Roboto Condensed, sans-serif",
        textTransform: "uppercase",
        marginLeft: "5rem",
        marginTop: "1rem",
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
    nombreCompleto: {
        fontFamily: "Roboto Condensed, sans-serif",
        color: "#448aff",
        fontSize: 18,
        textTransform: "uppercase",
        fontWeight: "bold",
        marginLeft: "1rem"
    },
    camposTitulos: {
        fontFamily: "Roboto Condensed, sans-serif",
        color: "#9e9e9e",
        marginLeft: "5rem",
        fontWeight: "bold",
        padding: "0.1rem",
        fontSize: 16,
    },
    campos: {
        fontFamily: "Roboto Condensed, sans-serif",
        color: "#9e9e9e",
        marginLeft: "0.5rem",
        fontSize: 15,
        display: "flex",
        flexWrap: "wrap"
    },
    avatar: {
        width: "4rem",
        height: "4rem"
    },
    icono: {
        color: "#9e9e9e",
        marginLeft: "5rem",
        width: "1rem",
        height: "1rem"
    }
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
            codigo: "A156-125Q-X123-WQAS2",
            avatar: "FJ",
            nombreCompleto: "Francisco Jarma",
            patente: "LZY450",
            marca: "Volkswagen",
            horaReserva: "10:48",
            tipo: "Auto",
            precio: "$100",
            horaIngreso: "",
            horaSalida: "",
            observaciones: "Llegaré 5 minutos tarde",
            lugar: "11"
        },
        {
            id: 1,
            codigo: "B1S5-A53ZW-DJ65-Q286",
            avatar: "JL",
            nombreCompleto: "Juan Lopez",
            patente: "ASD123",
            horaReserva: "10:52",
            marca: "Peugeot",
            tipo: "Auto",
            precio: "$100",
            horaIngreso: "19:20",
            horaSalida: "",
            observaciones: "Automóvil color azul",
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
            <Buscar/>
                    {reservas.map(reserva =>(
                    <>
                    <Card className = {classes.cartaReservas}>
                        <CardActionArea>
                            <CardContent key={reserva.id}>
                                <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                                    <Avatar className={classes.avatar}>{reserva.avatar}</Avatar>
                                    <Typography className={classes.nombreCompleto}>{reserva.nombreCompleto}</Typography>
                                </div>
                                <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                                    <Typography className={classes.camposTitulos}>Codigo: </Typography>
                                    <Typography className={classes.campos}>{reserva.codigo}</Typography>
                                </div>
                                <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                                    <Typography className={classes.camposTitulos}>Lugar: </Typography>
                                    <Typography className={classes.campos}>{reserva.lugar}</Typography>
                                </div>
                                <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                                    <Typography className={classes.camposTitulos}>Marca del vehículo: </Typography>
                                    <Typography className={classes.campos}>{reserva.marca}</Typography>
                                </div>
                                <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                                    <Typography className={classes.camposTitulos}>Patente del vehículo:</Typography>
                                    <Typography className={classes.campos}>{reserva.patente}</Typography>
                                </div>
                                <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                                    <Typography className={classes.camposTitulos}>Tipo de vehículo:</Typography>
                                    <Typography className={classes.campos}>{reserva.tipo}</Typography>
                                </div>
                                <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                                    <Typography className={classes.camposTitulos}>Precio:</Typography>
                                    <Typography className={classes.campos}>{reserva.precio}</Typography>
                                </div>
                                <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                                    <Typography className={classes.camposTitulos}>Hora de Ingreso: </Typography>
                                    <Typography className={classes.campos}>{reserva.horaIngreso}</Typography>
                                </div>
                                <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                                    <Typography className={classes.camposTitulos}>Hora de Salida: </Typography>
                                    <Typography className={classes.campos}>{reserva.horaSalida}</Typography>
                                </div>
                                <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                                    <Typography className={classes.camposTitulos}>Observaciones: </Typography>
                                    <Typography className={classes.campos}>{reserva.observaciones}</Typography>
                                </div>
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
                            </CardContent>
                        </CardActionArea>
                    </Card>
                    </>
                    ))}
            <Paginacion/>
            <Footer/>
        </>
    );
}
 
export default ReservasHoy;