import React, {useState} from 'react';
import Navbar from './../diseño/Navbar.js';
import { List, makeStyles,
Typography, Button, TextField, Grid } from '@material-ui/core';
import {
  KeyboardDatePicker,
} from '@material-ui/pickers';
import CheckIcon from '@material-ui/icons/Check';
import Footer from '../diseño/Footer.js';

const useStyles = makeStyles((theme) => ({
    titulo: {
        fontFamily: "Roboto Condensed, sans-serif",
        textTransform: "uppercase",
        fontSize: 25,
        textAlign: "center"
    },
    subtitulos: {
        fontFamily: "Roboto Condensed, sans-serif",
        fontSize: 16,
        color:"#424242",
    },
    container: {
        [theme.breakpoints.up('lg')]: {
            marginLeft: "20rem"
        },
    },
    inputCodigo: {
        width: "20rem",
        fontFamily: "Roboto Condensed, sans-serif",
        [theme.breakpoints.down('md')]:{
            marginLeft: "2rem"
        },
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "#rgba(0, 0, 0, 0.23)",
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
        [theme.breakpoints.down('md')]: {
            marginLeft: "1rem",
            marginRight: "1rem"
        },
    },
    botonConsultar: {
        backgroundColor: "#4db6ac",
        color: "#ffffff",
        fontFamily: "Roboto Condensed, sans-serif",
        textTransform: "uppercase",
        marginLeft: "0.3rem",
        fontSize: 15,
        marginTop: "0.7rem",
        "&:hover":{
            backgroundColor: "#4db6ac",
        }
    },
    botonCambiarReserva: {
        backgroundColor: "#448aff",
        color: "#ffffff",
        fontFamily: "Roboto Condensed, sans-serif",
        textTransform: "uppercase",
        marginTop: "2rem",
        fontSize: 15,
        [theme.breakpoints.down('md')]:{
            marginLeft:"8rem"
        },
        "&:hover":{
            backgroundColor: "#448aff",
        }
    },
}));

const CambiarFechaReserva = () => {
    const classes = useStyles();
    const [fechaSeleccionada, handleCambiarFecha] = useState(new Date());
    return ( 
        <>  
        <Navbar/>
        <Typography className={classes.titulo}>Cambiar fecha de reservas</Typography>
        &nbsp;
        <form className={classes.container}>
        <TextField
        className={classes.inputCodigo}
        label="Ingrese código de reserva"
        variant="standard"
        name="codigo"
        autoFocus
        />
        <Button className= {classes.botonConsultar}>Consultar</Button>
        </form>
        &nbsp;
        <List className={classes.cartaReservas}>
        &nbsp;
        <Typography className={classes.subtitulos}>Datos de la persona</Typography>
        &nbsp;
            <Grid container spacing={3}>
                <Grid item sm={3} xs={6}>
                <TextField
                label="Nombre Completo"
                variant="standard"
                fullWidth
                disabled
                value="Francisco Alfredo Jarma"
                />
                </Grid>
                <Grid item sm={2} xs={5}>
                <TextField
                label="DNI"
                fullWidth
                variant="standard"
                disabled
                value="40.524.512"
                />
                </Grid>
                <Grid item sm={1} xs={6}>
                <TextField
                label="Edad"
                variant="standard"
                fullWidth
                disabled
                value="23"
                />
                </Grid>
                <Grid item sm={2} xs={5} >
                <TextField
                label="N° de teléfono"
                variant="standard"
                fullWidth
                disabled
                value="3874450922"
                />
                </Grid>
                <Grid item sm={3} xs={11} >
                <TextField
                label="Dirección"
                variant="standard"
                fullWidth
                disabled
                value="General Paz 157"
                />
                </Grid>
            </Grid>
        &nbsp;
        <Typography className={classes.subtitulos}>Datos del vehículo</Typography>
        &nbsp;
            <Grid container spacing={3}>
                <Grid item sm={4} xs={6}>
                <TextField
                label="Patente"
                variant="standard"
                fullWidth
                disabled
                value="LZY643"
                />
                </Grid>
                <Grid item sm={4} xs={5}>
                <TextField
                label="Tipo"
                fullWidth
                variant="standard"
                disabled
                value="Auto"
                />
                </Grid>
                <Grid item sm={3} xs={11}>
                <TextField
                label="Marca"
                variant="standard"
                fullWidth
                disabled
                value="Volkswagen"
                />
                </Grid>
            </Grid>
            &nbsp;
            &nbsp;
        <Typography className={classes.subtitulos}>Datos de la reserva</Typography>
        &nbsp;
            <Grid container spacing={3}>
                <Grid item sm={3} xs={11}>
                <KeyboardDatePicker
                fullWidth
                disabled
                className={classes.inputFecha}
                id="date-picker-dialog"
                label="Fecha de reserva"
                format="dd/MM/yyyy"
                value={fechaSeleccionada}
                onChange={handleCambiarFecha}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
                />
                </Grid>
                <Grid item sm={1} xs={4}>
                <TextField
                label="Lugar"
                variant="standard"
                fullWidth
                disabled
                value="23"
                />
                </Grid>
                <Grid item sm={1} xs={4}>
                <TextField
                label="Precio"
                variant="standard"
                fullWidth
                disabled
                value="$100"
                />
                </Grid>
                <Grid item sm={1} xs={3}>
                <TextField
                label="Diferencia"
                variant="standard"
                fullWidth
                value="$50"
                />
                </Grid>
                <Grid item sm={2} xs={4}>
                <TextField
                label="Nuevo lugar"
                variant="standard"
                fullWidth
                value="23"
                />
                </Grid>
                <Grid item sm={3} xs={7}>
                <KeyboardDatePicker
                fullWidth
                className={classes.inputFecha}
                id="date-picker-dialog"
                label="Fecha nueva de reserva"
                format="dd/MM/yyyy"
                value={fechaSeleccionada}
                onChange={handleCambiarFecha}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
                />
                </Grid>
                &nbsp;
            </Grid>
            <Button
                endIcon={<CheckIcon/>}
                className= {classes.botonCambiarReserva}>Cambiar reserva
            </Button>
        </List>
        &nbsp;
        <Footer/>
    </>
     );
}
 
export default CambiarFechaReserva;