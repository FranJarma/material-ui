import React, {useState, useContext} from 'react';
import Navbar from './../diseño/Navbar.js';
import { makeStyles,
Typography, Card, CardActionArea, CardContent, Avatar, Button } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Paginacion from './../diseño/Paginacion.js';
import {
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Footer from '../diseño/Footer.js';
import PaginacionContext from './../../context/paginacion/paginacionContext';

import SpinnerContext from '../../context/spinner/spinnerContext.js';
import Spinner from '../diseño/Spinner.js';

const useStyles = makeStyles((theme) => ({
    titulo: {
        fontFamily: "Roboto Condensed, sans-serif",
        textTransform: "uppercase",
        fontSize: 25,
        textAlign: "center"
    },
    container: {
        marginLeft: "1rem"
    },
    inputFecha: {
        width: "20rem",
        fontFamily: "Roboto Condensed, sans-serif",
        height:"3rem",
        "& .MuiFormLabel-root.Mui-focused": {
            color: "#4db6ac"
        },
        "& .MuiInput-underline:after": {
            borderBottomColor: "#4db6ac"
        },
    },
    cartaReservas: {
        flexGrow: 1,
        marginBottom: "1rem",
        boxShadow: "0 2px 3px rgba(0,0,0,0.25), 0 0 3px rgba(0,0,0,0.22)",
        backgroundColor: theme.palette.background.paper,
        marginLeft: "1rem",
        marginRight: "1rem"
    },
    botonConsultar: {
        backgroundColor: "#4db6ac",
        color: "#ffffff",
        fontFamily: "Roboto Condensed, sans-serif",
        textTransform: "uppercase",
        fontSize: 15,
        marginTop: "0.7rem",
        "&:hover":{
            backgroundColor: "#4db6ac",
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
    cantidad: {
        fontFamily: "Roboto Condensed, sans-serif",
        color: "#448aff",
        fontSize: 18,
        textTransform: "uppercase",
        marginLeft: "1rem",
        fontWeight: "bold",
        marginBottom: "2rem"
    }
}));

const ReservasCalendario = () => {
    const [fechaSeleccionada, handleCambiarFecha] = useState(new Date());
    const classes = useStyles();
    const reservas = [
        {
            id: 0,
            codigo: "A156-125Q-X123-WQAS2",
            avatar: "FJ",
            nombreCompleto: "Francisco Jarma",
            patente: "LZY450",
            marca: "Volkswagen",
            tipo: "Auto",
            precio: "$100",
            horaIngreso: "19:52",
            horaSalida: "20:55",
            observaciones: "",
            lugar: "11"
        },
        {
            id: 1,
            codigo: "B1S5-A53ZW-DJ65-Q286",
            avatar: "JL",
            nombreCompleto: "Juan Lopez",
            patente: "ASD123",
            marca: "Peugeot",
            tipo: "Auto",
            precio: "$100",
            horaIngreso: "19:20",
            horaSalida: "21:25",
            observaciones: "",
            lugar: "1"
        },
    ];
    //context de paginación y spinner
    const paginacionContext = useContext(PaginacionContext);
    const { pagina, itemsPorPagina } = paginacionContext;
    const spinnerContext = useContext(SpinnerContext);
    const { cargando } = spinnerContext;
    return (
        (!cargando ? 
        <>  
            <Navbar/>
            <Typography className={classes.titulo}>Calendario de reservas</Typography>
            &nbsp;
            <Alert className={classes.alerta} severity="info" variant="filled">En esta pantalla usted podrá ver todas aquellas reservas hechas en una fecha determinada
            por usuarios registrados.
            </Alert>
            &nbsp;
            <form className={classes.container}>
            <KeyboardDatePicker
                className={classes.inputFecha}
                id="date-picker-dialog"
                label="Por favor seleccione una fecha"
                format="dd/MM/yyyy"
                disableFuture
                value={fechaSeleccionada}
                onChange={handleCambiarFecha}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
            />
            <Button className= {classes.botonConsultar}>Consultar</Button>
            </form>
            &nbsp;
            &nbsp;
                <Typography className={classes.cantidad}>Total de reservas registradas: {reservas.length}</Typography>
                    {reservas.slice((pagina-1)* itemsPorPagina, pagina*itemsPorPagina).map(reserva =>(
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
                            </CardContent>
                        </CardActionArea>
                    </Card>
                    </>
                    ))}
                <Paginacion lista={reservas}/>
            <Footer/>
        </>
    : <Spinner></Spinner>)
    );
}
 
export default ReservasCalendario;