import React, {useState} from 'react';
import Navbar from '../diseño/Navbar.js';
import { List, ListItemAvatar, ListItemText, Divider, makeStyles, Typography, ListItem, Avatar, Button } from '@material-ui/core';
import Buscar from '../diseño/Buscar.js';
import Alert from '@material-ui/lab/Alert';
import Paginacion from '../diseño/Paginacion.js';
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

const Encargados = () => {
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
    const encargados = [
        {
            id: 0,
            nombreCompleto: 'Francisco Jarma',
            nombreUsuario: 'fjarma24',
            DNI: '40.524.512',
            email: 'pancho24.1997@gmail.com',
            playa: 'Playa de estacionamiento del Convento'
        },
        {
            id: 1,
            nombreCompleto: 'Roberto Rodriguez',
            nombreUsuario: 'rrodriguez81',
            DNI: '35.152.123',
            email: 'rrodirguez@gmail.com',
            playa: 'Playa de estacionamiento del Carmen'
        },
        {
            id: 2,
            nombreCompleto: 'Ramiro Godinez',
            nombreUsuario: 'rgodinez123',
            DNI: '27.154.222',
            email: 'rgodinez@gmail.com',
            playa: 'Playa de estacionamiento el Solar Grande'
        },
    ];
    return (
        <>
            <Navbar/>
            <Typography className={classes.titulo}>Administración de encargados</Typography>
             &nbsp;
            <List className = {classes.cartaReservas}>
            <Buscar/>
                    {encargados.map(encargado =>(
                    <>
                    <ListItem key={encargado.id}>
                        <ListItemText primary={encargado.nombreCompleto} secondary={
                            <>
                            <Typography>Nombre Usuario: {encargado.nombreUsuario}</Typography>
                            <Typography>DNI: {encargado.DNI}</Typography>
                            <Typography>Email: {encargado.email}</Typography>
                            <Typography>Playa de Estacionamiento: {encargado.playa}</Typography>
                            </>
                        }>
                        </ListItemText>
                        <ListItemText>
                        <Button
                            endIcon={<CheckIcon/>}
                            className= {classes.botonValidarReserva} onClick={handleClickAbrirModalValidar}>
                            Ver roles y permisos
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
 
export default Encargados;