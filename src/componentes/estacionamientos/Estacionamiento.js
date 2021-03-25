import React, {useState} from 'react';
import Navbar from './../diseño/Navbar.js';
import { List, makeStyles,
Typography, Button, TextField, Grid, Select } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import Footer from '../diseño/Footer.js';
import InputAdornment from '@material-ui/core/InputAdornment';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import MotorcycleIcon from '@material-ui/icons/Motorcycle';
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
    input: {
        fontFamily: "Roboto Condensed, sans-serif",
        "& .MuiFormLabel-root.Mui-focused": {
            color: "#4db6ac"
        },
        "& .MuiInput-underline:after": {
            borderBottomColor: "#4db6ac"
        },
    },
    botonModificarDatos: {
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

const Estacionamiento = () => {
    const classes = useStyles();
    return ( 
        <>  
        <Navbar/>
        <Typography className={classes.titulo}>Mi Estacionamiento</Typography>
        &nbsp;
        <List className={classes.cartaReservas}>
        &nbsp;
        <Typography className={classes.subtitulos}>Datos del estacionamiento</Typography>
        &nbsp;
            <Grid container spacing={3}>
                <Grid item sm={5} xs={11}>
                <TextField
                className={classes.input}
                label="Nombre Completo"
                variant="standard"
                fullWidth
                autoFocus
                value="Playa de estacionamiento del convento"
                />
                </Grid>
                <Grid item sm={6} xs={11} >
                <TextField
                className={classes.input}
                label="País"
                variant="standard"
                value="Argentina"
                fullWidth
                />
                </Grid>
                <Grid item sm={3} xs={5}>
                <TextField
                className={classes.input}
                label="Provincia"
                fullWidth
                variant="standard"
                value="Salta"
                />
                </Grid>
                <Grid item sm={2} xs={6} >
                <TextField
                className={classes.input}
                label="N° de teléfono"
                variant="standard"
                value="4224256"
                fullWidth
                />
                </Grid>
                <Grid item sm={2} xs={5} >
                <TextField
                className={classes.input}
                label="CUIT"
                variant="standard"
                value="25405245125"
                fullWidth
                />
                </Grid>
                <Grid item sm={4} xs={6} >
                <TextField
                className={classes.input}
                label="Sucursal"
                variant="standard"
                value="Salta"
                fullWidth
                />
                </Grid>
                <Grid item sm={11} xs={11} >
                <TextField
                className={classes.input}
                label="Cantidad de lugares para estacionar"
                type="number"
                variant="standard"
                value="30"
                fullWidth
                />
                </Grid>
            </Grid>
        &nbsp;
        <Typography className={classes.subtitulos}>Ubicación</Typography>
            <Grid container spacing={3}>
                <Grid item sm={11} xs={11}>
                <Select
                fullWidth
                className={classes.input}
                />
                </Grid>
                <Grid item sm={2} xs={5}>
                <TextField
                label="Latitud"
                variant="standard"
                fullWidth
                disabled
                value="47.15"
                />
                </Grid>
                <Grid item sm={2} xs={6}>
                <TextField
                label="Longitud"
                variant="standard"
                fullWidth
                disabled
                value="-35.1656"
                />
                </Grid>
                <Grid item sm={7} xs={11}>
                <TextField
                label="Dirección completa"
                variant="standard"
                fullWidth
                disabled
                value="General Paz 157"
                />
                </Grid>
                &nbsp;
            </Grid>
            &nbsp;
            <Typography className={classes.subtitulos}>Tarifas</Typography>
        &nbsp;
            <Grid container spacing={3}>
                <Grid item sm={3} xs={6}>
                <TextField
                className={classes.input}
                label="Automóvil"
                variant="standard"
                fullWidth
                value="$100"
                InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <DriveEtaIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                </Grid>
                <Grid item sm={3} xs={5}>
                <TextField
                className={classes.input}
                label="Camioneta"
                fullWidth
                variant="standard"
                value="$150"
                InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocalShippingIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                </Grid>
                <Grid item sm={2} xs={6}>
                <TextField
                className={classes.input}
                label="Bicicleta"
                variant="standard"
                fullWidth
                value="$80"
                InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <DirectionsBikeIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                </Grid>
                <Grid item sm={3} xs={5}>
                <TextField
                className={classes.input}
                label="Motocicleta"
                variant="standard"
                fullWidth
                value="$90"
                InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MotorcycleIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                </Grid>
            </Grid>
            &nbsp;
            <Button
                endIcon={<CheckIcon/>}
                className= {classes.botonModificarDatos}>Modificar datos
            </Button>
        </List>
        &nbsp;
        <Footer/>
    </>
     );
}
 
export default Estacionamiento;