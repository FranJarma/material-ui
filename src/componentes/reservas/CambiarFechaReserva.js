import React, {useState} from 'react';
import Navbar from './../diseño/Navbar.js';
import { List, makeStyles,
Typography, Button, TextField, Card, Grid } from '@material-ui/core';
import {
  KeyboardDatePicker,
} from '@material-ui/pickers';
import CheckIcon from '@material-ui/icons/Check';

const useStyles = makeStyles((theme) => ({
    titulo: {
        fontFamily: "Roboto Condensed, sans-serif",
        textTransform: "uppercase",
        fontSize: 25,
        textAlign: "center"
    },
    subtitulos: {
        fontFamily: "Roboto Condensed, sans-serif",
        fontSize: 15,
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
        height:"3rem",
        marginLeft: "1rem",
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "#rgba(0, 0, 0, 0.23);"
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#4db6ac;"
        },
        "& .MuiFormLabel-root.Mui-focused": {
            color: "#4db6ac"
        }
    },
    cartaReservas: {
        flexGrow: 1,
        paddingLeft: 20,
        backgroundColor: theme.palette.background.paper,
        [theme.breakpoints.up('lg')]: {
            marginLeft: "21rem",
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
        fontSize: 15,
        width: "8.5rem",
        height: "3.5rem",
        "&:hover":{
            backgroundColor: "#4db6ac"
        }
    },
    botonCambiarReserva: {
        backgroundColor: "#448aff",
        color: "#ffffff",
        fontFamily: "Roboto Condensed, sans-serif",
        textTransform: "uppercase",
        [theme.breakpoints.up('lg')]: {
            marginLeft:"40rem",
        },
        [theme.breakpoints.down('lg')]: {
            marginLeft:"8rem",
        },
        fontSize: 15,
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
        variant="outlined"
        name="codigo"
        autoFocus
        />
        <Button variant="outlined" className= {classes.botonConsultar}>Consultar</Button>
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
                variant="filled"
                fullWidth
                disabled
                value="Francisco Alfredo Jarma"
                />
                </Grid>
                <Grid item sm={2} xs={6}>
                <TextField
                label="DNI"
                fullWidth
                variant="filled"
                disabled
                value="40.524.512"
                />
                </Grid>
                <Grid item sm={1} xs={6}>
                <TextField
                label="Edad"
                variant="filled"
                fullWidth
                disabled
                value="23"
                />
                </Grid>
                <Grid item sm={2} xs={6} >
                <TextField
                label="N° de teléfono"
                variant="filled"
                fullWidth
                disabled
                value="3874450922"
                />
                </Grid>
                <Grid item sm={4} xs={12} >
                <TextField
                label="Dirección"
                variant="filled"
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
                variant="filled"
                fullWidth
                disabled
                value="LZY643"
                />
                </Grid>
                <Grid item sm={4} xs={6}>
                <TextField
                label="Tipo"
                fullWidth
                variant="filled"
                disabled
                value="Auto"
                />
                </Grid>
                <Grid item sm={4} xs={12}>
                <TextField
                label="Marca"
                variant="filled"
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
                <Grid item sm={3} xs={12}>
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
                variant="filled"
                fullWidth
                disabled
                value="23"
                />
                </Grid>
                <Grid item sm={2} xs={4}>
                <TextField
                label="Precio"
                variant="filled"
                fullWidth
                disabled
                value="$100"
                />
                </Grid>
                <Grid item sm={2} xs={4}>
                <TextField
                label="Diferencia"
                variant="outlined"
                fullWidth
                value="$50"
                />
                </Grid>
                <Grid item sm={1} xs={6}>
                <TextField
                label="Nuevo lugar"
                variant="outlined"
                fullWidth
                value="23"
                />
                </Grid>
                <Grid item sm={3} xs={6}>
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
            &nbsp;
            <Button
                endIcon={<CheckIcon/>}
                className= {classes.botonCambiarReserva}>Cambiar reserva
            </Button>
        </List>
    </>
     );
}
 
export default CambiarFechaReserva;