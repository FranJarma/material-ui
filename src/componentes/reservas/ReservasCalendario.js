import React, {useState} from 'react';
import Navbar from './../diseño/Navbar.js';
import { List, ListItemAvatar, ListItemText, Divider, makeStyles,
Typography, ListItem, Avatar, Button } from '@material-ui/core';
import Buscar from './../diseño/Buscar.js';
import Alert from '@material-ui/lab/Alert';
import Paginacion from './../diseño/Paginacion.js';
import {
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Footer from '../diseño/Footer.js';


const useStyles = makeStyles((theme) => ({
    titulo: {
        fontFamily: "Roboto Condensed, sans-serif",
        textTransform: "uppercase",
        fontSize: 25,
        textAlign: "center"
    },
    container: {
        [theme.breakpoints.up('lg')]: {
            marginLeft: "20rem"
        },
    },
    inputFecha: {
        width: "20rem",
        fontFamily: "Roboto Condensed, sans-serif",
        height:"3rem",
        [theme.breakpoints.down('md')]:{
            marginLeft: "2rem"
        },
        "& .MuiFormLabel-root.Mui-focused": {
            color: "#4db6ac"
        },
        "& .MuiInput-underline:after": {
            borderBottomColor: "#4db6ac"
        },
    },
    cartaReservas: {
        flexGrow: 1,
        paddingLeft: 20,
        backgroundColor: theme.palette.background.paper,
        boxShadow: "0 2px 3px rgba(0,0,0,0.25), 0 0 3px rgba(0,0,0,0.22)",
        [theme.breakpoints.up('lg')]: {
            marginLeft: "20rem",
            marginRight: "1rem"
        },
        [theme.breakpoints.up('md')]: {
            marginLeft: "20rem",
            marginRight: "1rem"
        },
    },
    botonConsultar: {
        backgroundColor: "#4db6ac",
        color: "#ffffff",
        fontFamily: "Roboto Condensed, sans-serif",
        textTransform: "uppercase",
        [theme.breakpoints.down('md')]:{
            marginLeft: "8rem"
        },
        fontSize: 15,
        marginTop: "0.7rem",
        "&:hover":{
            backgroundColor: "#4db6ac",
        }
    },
    alerta:{
        position: "relative",
        [theme.breakpoints.up('lg')]: {
            marginLeft: "20rem",
            marginRight: "1rem"
        },
        [theme.breakpoints.down('md')]: {
            marginLeft: "1rem",
            marginRight: "1rem"
        },
        borderRadius: 0
    },
}));

const ReservasCalendario = () => {
    const [fechaSeleccionada, handleCambiarFecha] = useState(new Date());
    const classes = useStyles();
    const reservas = [
        {
            id: 0,
            avatar: "FJ",
            nombreCompleto: "Francisco Jarma",
            patente: "LZY450",
            marca: "Volkswagen",
            tipo: "Auto",
            precio: "$100",
            horaIngreso: "19:52",
            horaSalida: "20:55",
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
            horaSalida: "21:25",
            lugar: "1"
        },
    ];
    return (
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
 
export default ReservasCalendario;