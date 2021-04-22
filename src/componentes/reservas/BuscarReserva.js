import React, {useContext, useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../diseño/Navbar.js';
import { makeStyles, Typography, Avatar, Button, Card, CardContent } from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
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
import PaginacionContext from '../../context/paginacion/paginacionContext';
import SpinnerContext from '../../context/spinner/spinnerContext.js';
import Spinner from '../diseño/Spinner.js';

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
    },
    cantidad: {
        fontFamily: "Roboto Condensed, sans-serif",
        color: "#448aff",
        fontSize: 18,
        textTransform: "uppercase",
        marginLeft: "1rem",
        fontWeight: "bold",
        marginBottom: "2rem"
    },
}));

const Buscar = () => {
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
        {
            id: 2,
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
        {
            id: 3,
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
        {
            id: 4,
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
        {
            id: 5,
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
        {
            id: 6,
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
        {
            id: 7,
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
        {
            id: 8,
            codigo: "B1S5-A53ZW-DJ65-Q286",
            avatar: "JL",
            nombreCompleto: "v65vzx4",
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
        {
            id: 9,
            codigo: "B1S5-A53ZW-DJ65-Q286",
            avatar: "JL",
            nombreCompleto: "654zcx",
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
        {
            id: 10,
            codigo: "B1S5-A53ZW-DJ65-Q286",
            avatar: "JL",
            nombreCompleto: "zxc654",
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
        {
            id: 11,
            codigo: "B1S5-A53ZW-DJ65-Q286",
            avatar: "JL",
            nombreCompleto: "964asd98daszx",
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
        {
            id: 12,
            codigo: "B1S5-A53ZW-DJ65-Q286",
            avatar: "JL",
            nombreCompleto: "2132zx1c",
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
        {
            id: 13,
            codigo: "B1S5-A53ZW-DJ65-Q286",
            avatar: "JL",
            nombreCompleto: "asd854asdzxc",
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
        {
            id: 14,
            codigo: "B1S5-A53ZW-DJ65-Q286",
            avatar: "JL",
            nombreCompleto: "asd56das4",
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
        {
            id: 15,
            codigo: "B1S5-A53ZW-DJ65-Q286",
            avatar: "JL",
            nombreCompleto: "zxcczx654",
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
        {
            id: 16,
            codigo: "B1S5-A53ZW-DJ65-Q286",
            avatar: "JL",
            nombreCompleto: "123126354",
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
        {
            id: 17,
            codigo: "B1S5-A53ZW-DJ65-Q286",
            avatar: "JL",
            nombreCompleto: "zxc564as",
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
        {
            id: 18,
            codigo: "B1S5-A53ZW-DJ65-Q286",
            avatar: "JL",
            nombreCompleto: "zxcczx64asd",
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
        {
            id: 19,
            codigo: "B1S5-A53ZW-DJ65-Q286",
            avatar: "JL",
            nombreCompleto: "zxczx1cx6asd4",
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
        {
            id: 20,
            codigo: "B1S5-A53ZW-DJ65-Q286",
            avatar: "JL",
            nombreCompleto: "asdsda510",
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
        {
            id: 21,
            codigo: "B1S5-A53ZW-DJ65-Q286",
            avatar: "JL",
            nombreCompleto: "zxczcx23132zxc",
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
        {
            id: 22,
            codigo: "B1S5-A53ZW-DJ65-Q286",
            avatar: "JL",
            nombreCompleto: "984132349-",
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
        {
            id: 23,
            codigo: "B1S5-A53ZW-DJ65-Q286",
            avatar: "JL",
            nombreCompleto: "z123*//*",
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
        {
            id: 24,
            codigo: "B1S5-A53ZW-DJ65-Q286",
            avatar: "JL",
            nombreCompleto: "zxczx65",
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
        {
            id: 25,
            codigo: "B1S5-A53ZW-DJ65-Q286",
            avatar: "JL",
            nombreCompleto: "1z36xc1zcx",
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
        {
            id: 26,
            codigo: "B1S5-A53ZW-DJ65-Q286",
            avatar: "JL",
            nombreCompleto: "12332asdczx",
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
        {
            id: 27,
            codigo: "B1S5-A53ZW-DJ65-Q286",
            avatar: "JL",
            nombreCompleto: "jllkjjkqewa1",
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
        {
            id: 28,
            codigo: "B1S5-A53ZW-DJ65-Q286",
            avatar: "JL",
            nombreCompleto: "zxczxzcx",
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
        {
            id: 29,
            codigo: "B1S5-A53ZW-DJ65-Q286",
            avatar: "JL",
            nombreCompleto: "3231232",
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
        {
            id: 30,
            codigo: "B1S5-A53ZW-DJ65-Q286",
            avatar: "JL",
            nombreCompleto: "asddasddaa",
            patente: "ASD123",
            horaReserva: "10:52",
            marca: "Peugeot",
            tipo: "Auto",
            precio: "$100",
            horaIngreso: "19:20",
            horaSalida: "",
            observaciones: "Automóvil color azul",
            lugar: "1"
        }
    ];
    //state para guardar los registros filtrados
    const [resultado, guardarResultado] = useState([]);
    //context de paginación y spinner
    const paginacionContext = useContext(PaginacionContext);
    const { pagina, itemsPorPagina } = paginacionContext;
    const spinnerContext = useContext(SpinnerContext);
    const { cargando } = spinnerContext;
    const history = useHistory();

    useEffect(()=>{
        guardarResultado(reservas);
        const search = history.location.search;
        const parametroBusqueda = search.split('=')[1];
        const reservasFiltradas = reservas.filter(reserva => {
            return (
                reserva.nombreCompleto.toLowerCase().includes(parametroBusqueda) ||
                reserva.patente.toLowerCase().includes(parametroBusqueda)
            )
        });
        guardarResultado(reservasFiltradas);
    },[guardarResultado, history.location.search]);
    return (
        (!cargando ? 
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
            <Typography className={classes.cantidad}>{resultado.length > 0 ? `Total de reservas encontradas: ${resultado.length}` : "No se encontraron reservas" }</Typography>
                {resultado.slice((pagina-1)* itemsPorPagina, pagina*itemsPorPagina).map(reserva =>(
                    <>
                    <Card id="lista" className = {classes.cartaReservas}>
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
                                            <Button onClick={handleClickCerrarModalValidar} endIcon={<CheckIcon/>} className={classes.botonValidarReserva}>Validar</Button>
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
                                            <Button onClick={handleClickCerrarModalConcluir} endIcon={<DoneAllIcon/>} className={classes.botonConcluirReserva}>Concluir</Button>
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
                {resultado.length > 0 ? <Paginacion lista={resultado}/>: ""}
            <Footer/>
        </>
    : <Spinner></Spinner>)
    );
}
export default Buscar;