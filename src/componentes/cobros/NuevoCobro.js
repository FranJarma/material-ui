import React, {useState} from 'react';
import Navbar from './../diseño/Navbar.js';
import { List, makeStyles,
Typography, Button, TextField, Grid, FormControl, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import {
  KeyboardDatePicker,
} from '@material-ui/pickers';
import CheckIcon from '@material-ui/icons/Check';
import Footer from '../diseño/Footer.js';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    titulo: {
        fontFamily: "Roboto Condensed, sans-serif",
        textTransform: "uppercase",
        fontSize: 25,
        textAlign: "center"
    },
    subtitulos: {
        fontFamily: "Roboto Condensed, sans-serif",
        fontSize: 18,
        color:"#424242",
        
    },
    subtitulos2: {
        fontFamily: "Roboto Condensed, sans-serif",
        fontSize: 15,
        color:"#424242"
    },
    container: {
        marginLeft: "1rem"
    },
    input: {
        fontFamily: "Roboto Condensed, sans-serif",
        paddingRight: "1rem",
        "& .MuiFormLabel-root.Mui-focused": {
            color: "#4db6ac"
        },
        "& .MuiInput-underline:after": {
            borderBottomColor: "#4db6ac"
        },
    },
    inputCodigo: {
        width: "20rem",
        fontFamily: "Roboto Condensed, sans-serif",
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
        marginLeft: "1rem",
        marginRight: "1rem"
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
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
    botonCambiarReserva: {
        backgroundColor: "#448aff",
        color: "#ffffff",
        fontFamily: "Roboto Condensed, sans-serif",
        textTransform: "uppercase",
        marginTop: "2rem",
        fontSize: 15,
        "&:hover":{
            backgroundColor: "#448aff",
        }
    },
    radio: {
        "&.MuiRadio-colorSecondary.Mui-checked":{
            color:"#4db6ac"
        }
    },
    alerta:{
        position: "relative",
        marginLeft: "1rem",
        marginRight: "1rem",
        borderRadius: 0
    },
}));

const NuevoCobro = () => {
    const classes = useStyles();
    const [fechaSeleccionada, handleCambiarFecha] = useState(new Date());
    const [valorRadio, setearValorRadio] = useState('Debito');

    const handleChangeRadioMedioPago = (event) => {
        setearValorRadio(event.target.value);
    };

    return ( 
        <>  
        <Navbar/>
        <Typography className={classes.titulo}>Nuevo cobro a clientes</Typography>
        &nbsp;
        <Alert className={classes.alerta} severity="info" variant="filled">En esta pantalla usted podrá realizar un cobro a algún cliente que lo requiera en caso de que haya superado
        el tiempo de reserva establecido.
            </Alert>
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
                <Grid item sm={3} xs={12} >
                <TextField
                className={classes.input}
                label="Nombre Completo"
                variant="standard"
                fullWidth
                disabled
                value="Francisco Alfredo Jarma"
                />
                </Grid>
                <Grid item sm={3} xs={12}>
                <TextField
                className={classes.input}
                label="DNI"
                fullWidth
                variant="standard"
                disabled
                value="40.524.512"
                />
                </Grid>
                <Grid item sm={3} xs={4}>
                <TextField
                className={classes.input}
                label="Edad"
                variant="standard"
                fullWidth
                disabled
                value="23"
                />
                </Grid>
                <Grid item sm={3} xs={8} >
                <TextField
                className={classes.input}
                label="N° de teléfono"
                variant="standard"
                fullWidth
                disabled
                value="3874450922"
                />
                </Grid>
                <Grid item sm={12} xs={12} >
                <TextField
                className={classes.input}
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
                className={classes.input}
                label="Patente"
                variant="standard"
                fullWidth
                disabled
                value="LZY643"
                />
                </Grid>
                <Grid item sm={4} xs={6}>
                <TextField
                className={classes.input}
                label="Tipo"
                fullWidth
                variant="standard"
                disabled
                value="Auto"
                />
                </Grid>
                <Grid item sm={4} xs={12}>
                <TextField
                className={classes.input}
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
                <Grid item sm={3} xs={3}>
                <TextField
                className={classes.input}
                label="Lugar"
                variant="standard"
                fullWidth
                disabled
                value="23"
                />
                </Grid>
                <Grid item sm={3} xs={9}>
                <TextField
                className={classes.input}
                label="Abonado por el cliente"
                disabled
                variant="standard"
                fullWidth
                value="$100"
                />
                </Grid>
                <Grid item sm={3} xs={12}>
                <TextField
                className={classes.input}
                label="Adicional a cobrar"
                variant="standard"
                fullWidth
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
                        <Typography className={classes.subtitulos2}>Medio de pago</Typography>
                        <RadioGroup  aria-label="medio de pago" name ="medioDePago" value={valorRadio} onChange={handleChangeRadioMedioPago}>
                            <FormControlLabel value="Debito" control={<Radio className={classes.radio}/>} label="Tarjeta de débito"></FormControlLabel>
                            <FormControlLabel value="Credito" control={<Radio className={classes.radio}/>} label="Tarjeta de crédito"></FormControlLabel>
                            <FormControlLabel value="Efectivo" control={<Radio className={classes.radio}/>} label="Efectivo"></FormControlLabel>
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item sm={5} xs={12}>
                    <TextField
                    label="Número de tarjeta"
                    className={classes.input}
                    variant="standard"
                    fullWidth
                    value="2345-1235-4568-1232"
                    />
                    </Grid>
                    <Grid item sm={3} xs={12}>
                    <TextField
                    label="Código de seguridad"
                    className={classes.input}
                    variant="standard"
                    type="password"
                    fullWidth
                    value="***"
                    />
                </Grid>
            </Grid>
            <Button
                endIcon={<CheckIcon/>}
                className= {classes.botonCambiarReserva}>Confirmar cobro
            </Button>
        </List>
        &nbsp;
        <Footer/>
    </>
     );
}
 
export default NuevoCobro;