import React, {useState, useContext} from 'react';
import Navbar from './../diseño/Navbar.js';
import { makeStyles,
Typography, Button, Grid } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Paginacion from './../diseño/Paginacion.js';
import {
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Footer from '../diseño/Footer.js';
import PaginacionContext from './../../context/paginacion/paginacionContext';
import SpinnerContext from '../../context/spinner/spinnerContext.js';
import Spinner from '../diseño/Spinner.js';
import Reserva from './Reserva';
import * as CGeneral from './../../constantes/general/CGeneral';
import * as CReservas from './../../constantes/reservas/CReservas';

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
            <Typography className={classes.titulo}>{CReservas.CALENDARIO_RESERVAS}</Typography>
            &nbsp;
            <Alert className={classes.alerta} severity="info" variant="filled">{CReservas.ALERTA_CALENDARIO}
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
            <Button className= {classes.botonConsultar}>{CGeneral.CONSULTAR}</Button>
            </form>
            &nbsp;
            &nbsp;
            <Typography className={classes.cantidad}>{reservas.length > 0 ?
            `${CReservas.TOTAL_RESERVAS_ENCONTRADAS} ${reservas.length}` : `${CReservas.NO_SE_ENCONTRARON_RESERVAS}`
            }</Typography>
                <Grid container>
                    {reservas.slice((pagina-1)* itemsPorPagina, pagina*itemsPorPagina).map(reserva =>(
                        <Reserva key={reserva.id} reserva={reserva}/>
                    ))}
                </Grid>
                {reservas.length > 0 ? <Paginacion lista={reservas}/> : ""}
            <Footer/>
        </>
    : <Spinner></Spinner>)
    );
}
 
export default ReservasCalendario;