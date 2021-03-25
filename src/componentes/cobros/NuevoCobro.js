import React, {useState} from 'react';
import Navbar from './../diseño/Navbar.js';
import { List, makeStyles,
Typography, Button, TextField, Grid, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
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
        marginLeft: "2rem",
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
        [theme.breakpoints.up('lg')]: {
            marginLeft: "21rem",
            marginRight: "1rem"
        },
        [theme.breakpoints.down('md')]: {
            marginLeft: "1rem",
            marginRight: "1rem"
        },
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
      },
    botonConsultar: {
        backgroundColor: "#4db6ac",
        color: "#ffffff",
        fontFamily: "Roboto Condensed, sans-serif",
        textTransform: "uppercase",
        marginLeft: "0.5rem",
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

const NuevoCobro = () => {
    const classes = useStyles();
    const [fechaSeleccionada, handleCambiarFecha] = useState(new Date());
    const [valorRadio, setearValorRadio] = useState('Efectivo');

    const handleChangeRadioMedioPago = (event) => {
        setearValorRadio(event.target.value);
    };

    return ( 
        <>  
        <Navbar/>
        <Typography className={classes.titulo}>Nuevo cobro a clientes</Typography>
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
                label="Subtotal"
                variant="filled"
                fullWidth
                disabled
                value="$100"
                />
                </Grid>
                <Grid item sm={2} xs={4}>
                <TextField
                label="Adicional"
                variant="filled"
                fullWidth
                disabled
                value="$30"
                />
                </Grid>
                <Grid item sm={2} xs={12}>
                <TextField
                label="Total a cobrar"
                variant="filled"
                fullWidth
                disabled
                value="$130"
                />
                </Grid>
                &nbsp;
            </Grid>
            &nbsp;
            <Typography className={classes.subtitulos}>Datos del pago</Typography>
        &nbsp;
            <Grid container spacing={3}>
                <Grid item sm={3} xs={12}>
                    <FormControl>
                        <FormLabel className={classes.subtitulos}>Medio de pago</FormLabel>
                        <RadioGroup aria-label="medio de pago" name ="medioDePago" value={valorRadio} onChange={handleChangeRadioMedioPago}>
                            <FormControlLabel value="Efectivo" control={<Radio/>} label="Efectivo"></FormControlLabel>
                            <FormControlLabel value="Débito" control={<Radio/>} label="Tarjeta de débito"></FormControlLabel>
                            <FormControlLabel value="Crédito" control={<Radio/>} label="Tarjeta de crédito"></FormControlLabel>
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item sm={4} xs={12}>
                <TextField
                label="Número de tarjeta"
                className={classes.inputCodigo}
                variant="standard"
                fullWidth
                value="2345-1235-4568-1232"
                />
                </Grid>
                <Grid item sm={1} xs={12}>
                <TextField
                label="Código de seguridad"
                className={classes.inputCodigo}
                variant="standard"
                type="password"
                fullWidth
                value="***"
                />
                </Grid>
                &nbsp;
            </Grid>
            &nbsp;
            <Button
                endIcon={<CheckIcon/>}
                className= {classes.botonCambiarReserva}>Confirmar cobro
            </Button>
        </List>
    </>
     );
}
 
export default NuevoCobro;