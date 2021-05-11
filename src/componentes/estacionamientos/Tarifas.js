import React, { useState } from 'react';
import Navbar from '../diseño/Navbar.js';
import { List, makeStyles,
Typography, Button, TextField, Grid, InputAdornment } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import Footer from '../diseño/Footer.js';

import DriveEtaIcon from '@material-ui/icons/DriveEta';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import MotorcycleIcon from '@material-ui/icons/Motorcycle';
import Alert from '@material-ui/lab/Alert';
import Checkbox from '@material-ui/core/Checkbox';
import {useStyles} from './Styles';

const Tarifas = () => {
    let [state, setState] = useState({
        automovil: false,
        camioneta: false,
        camion: false,
        bicicleta: false,
        motocicleta: false
    });
    const handleChangeCheckBox = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.checked
        });
    }
    const {
        automovil,
        camioneta,
        camion,
        bicicleta,
        motocicleta
    } = state;

    const classes = useStyles();
    return ( 
        <>  
        <Navbar/>
        <Typography className={classes.titulo}>Tarifas de mi estacionamiento</Typography>
        &nbsp;
            <Alert className={classes.alerta} severity="info" variant="filled">En esta pantalla usted podrá seleccionar los vehículos aceptados en su playa de estacionamiento, así como las tarifas de cada uno de ellos.
            </Alert>
        &nbsp;
        <List className={classes.cartaReservas}>
        &nbsp;
        <Typography className={classes.subtitulos}>Vehículos aceptados</Typography>
        &nbsp;
            <Grid container spacing={3}>
                <Grid item xs={11} md={4}>
                <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                    <Checkbox color="primary" onChange={handleChangeCheckBox} className={classes.checkBox} checked={automovil} name="automovil"/>
                    <Typography className={classes.subtitulos}>Automóvil</Typography>
                </div>
                { automovil ?
                <TextField
                className={classes.input}
                label="Ingrese tarifa"
                variant="standard"
                fullWidth
                autoFocus
                name="automovil"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                        <DriveEtaIcon />
                        </InputAdornment>
                    ),
                    }}
                />
                : ""}
                </Grid>
                <Grid item xs={11} md={4}>
                <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                    <Checkbox color="primary" onChange={handleChangeCheckBox} className={classes.checkBox} checked={camioneta} name="camioneta"/>
                    <Typography className={classes.subtitulos}>Camioneta</Typography>
                </div>
                { camioneta ?
                <TextField
                className={classes.input}
                label="Ingrese tarifa"
                variant="standard"
                fullWidth
                autoFocus
                name="camioneta"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                        <DriveEtaIcon />
                        </InputAdornment>
                    ),
                    }}
                />
                : ""}
                </Grid>
                <Grid item xs={11} md={3}>
                <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                    <Checkbox color="primary" onChange={handleChangeCheckBox} className={classes.checkBox} checked={camion} name="camion"/>
                    <Typography className={classes.subtitulos}>Camión</Typography>
                </div>
                { camion ? 
                <TextField
                className={classes.input}
                label="Ingrese tarifa"
                variant="standard"
                fullWidth
                autoFocus
                name="camion"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                        <LocalShippingIcon />
                        </InputAdornment>
                    ),
                    }}
                />
                : "" }
                </Grid>
                <Grid item xs={11} md={4}>
                <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                    <Checkbox color="primary" onChange={handleChangeCheckBox} className={classes.checkBox} checked={bicicleta} name="bicicleta"/>
                    <Typography className={classes.subtitulos}>Bicicleta</Typography>
                </div>
                {bicicleta ?
                <TextField
                className={classes.input}
                label="Ingrese tarifa"
                variant="standard"
                fullWidth
                autoFocus
                name="bicicleta"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                        <DirectionsBikeIcon />
                        </InputAdornment>
                    ),
                    }}
                />
                : ""}
                </Grid>
                <Grid item xs={11} md={4}>
                <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                    <Checkbox color="primary" onChange={handleChangeCheckBox} className={classes.checkBox} checked={motocicleta} name="motocicleta"/>
                    <Typography className={classes.subtitulos}>Motocicleta</Typography>
                </div>
                { motocicleta ?
                <TextField
                className={classes.input}
                label="Ingrese tarifa"
                variant="standard"
                fullWidth
                autoFocus
                name="motocicleta"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                        <MotorcycleIcon />
                        </InputAdornment>
                    ),
                    }}
                />
                : ""}
                </Grid>
            </Grid>
            &nbsp;
            <Button
                endIcon={<CheckIcon/>}
                className= {classes.botonModificarDatos}>Actualizar tarifas
            </Button>
        </List>
        &nbsp;
        <Footer/>
    </>
     );
}
 
export default Tarifas;