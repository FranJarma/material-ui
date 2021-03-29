import React, { useState } from 'react';
import Navbar from './../diseño/Navbar.js';
import { List, makeStyles,
Typography, Button, TextField, Grid, Select, Checkbox } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import Footer from '../diseño/Footer.js';
import {
    KeyboardTimePicker,
  } from '@material-ui/pickers';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import Chip from '@material-ui/core/Chip';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import MotorcycleIcon from '@material-ui/icons/Motorcycle';
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
        paddingRight: "1rem",
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
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    labelSelectMultiple: {
        paddingTop:"1rem",
        fontSize: "0.8rem"
    },
    labelCheckbox: {
        fontSize: "0.8rem"
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

const Estacionamiento = () => {
    //states para los campos de fechas y horas
    const [horaApertura, setearHoraIngreso] = useState(new Date());
    const handleCambiarHoraApertura = (hora) => {
        setearHoraIngreso(hora);
    };
    const [horaCierre, setearHoraCierre] = useState(new Date());
    const handleCambiarHoraCierre = (hora) => {
        setearHoraCierre(hora);
    };

    const [dia, setearDia] = useState([]);

    const handleChangeDia = (event) => {
        setearDia(event.target.value);
    };
    //states para los checkbox
    const [checkHorarioCorrido, setCheckHorarioCorrido] = useState(false);
    const handleChangeHorarioCorrido = () => {
        setCheckHorarioCorrido(true);
    };
    const [checkTodosLosDias, setCheckTodosLosDias] = useState(false);
    const handleChangeTodosLosDias = () => {
        setCheckTodosLosDias(true);
    };

    const dias = [
        'Lunes',
        'Martes',
        'Miercoles',
        'Jueves',
        'Viernes',
        'Sábado',
        'Domingo',
    ];

    const classes = useStyles();
    return ( 
        <>  
        <Navbar/>
        <Typography className={classes.titulo}>Mi Estacionamiento</Typography>
        &nbsp;
            <Alert className={classes.alerta} severity="info" variant="filled">En esta pantalla usted podrá ver y modificar los datos de su playa de estacionamiento. Es decir:
             <ul>
                 <li>Datos propios del establecimiento (nombre, dirección, n° de teléfono, etc).</li>
                 <li>Horarios de apertura y cierre y días de atención.</li>
                 <li>Tarifas para todos los vehículos aceptados por la playa de estacionamiento.</li>
                 <li>Ubicación georeferenciada.</li>
            </ul>
            </Alert>
        &nbsp;
        <List className={classes.cartaReservas}>
        &nbsp;
        <Typography className={classes.subtitulos}>Datos de la playa de estacionamiento</Typography>
        &nbsp;
            <Grid container spacing={3}>
                <Grid item sm={6} xs={12}>
                <TextField
                className={classes.input}
                label="Nombre Completo"
                variant="standard"
                fullWidth
                autoFocus
                value="Playa de estacionamiento del convento"
                />
                </Grid>
                <Grid item sm={6} xs={12} >
                <TextField
                className={classes.input}
                label="País"
                variant="standard"
                value="Argentina"
                fullWidth
                />
                </Grid>
                <Grid item sm={3} xs={6}>
                <TextField
                className={classes.input}
                label="Provincia"
                fullWidth
                variant="standard"
                value="Salta"
                />
                </Grid>
                <Grid item sm={3} xs={6} >
                <TextField
                className={classes.input}
                label="N° de teléfono"
                variant="standard"
                value="4224256"
                fullWidth
                />
                </Grid>
                <Grid item sm={2} xs={6} >
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
                label="Cantidad de lugares para estacionar"
                type="number"
                variant="standard"
                value="30"
                fullWidth
                />
                </Grid>
            </Grid>
            &nbsp;
        <Typography className={classes.subtitulos}>Horarios y fechas</Typography>
        &nbsp;
            <Grid container spacing={3}>
                <Grid item sm={5} xs={4} >
                <KeyboardTimePicker
                className={classes.input}
                fullWidth
                disabled={checkHorarioCorrido ? true: false}
                id="time-picker"
                label="Horario de Apertura"
                value={horaApertura}
                onChange={handleCambiarHoraApertura}
                KeyboardButtonProps={{
                    'aria-label': 'change time',
                }}
                />
                </Grid>
                <Grid item sm={5} xs={4} >
                <KeyboardTimePicker
                className={classes.input}
                fullWidth
                disabled={checkHorarioCorrido ? true: false}
                id="time-picker"
                label="Horario de Cierre"
                value={horaCierre}
                onChange={handleCambiarHoraCierre}
                KeyboardButtonProps={{
                    'aria-label': 'change time',
                }}
                />
                </Grid>
                <Grid item sm={2} xs={4}>
                    <InputLabel className={classes.labelCheckbox}>Horario corrido</InputLabel>
                    <Checkbox
                    color="primary"
                    value={checkHorarioCorrido}
                    onChange={handleChangeHorarioCorrido}
                    />
                </Grid>
                <Grid item sm={10} xs={8}>
                <InputLabel className={classes.labelSelectMultiple}>Días de apertura (Seleccione uno o varios)</InputLabel>
                <Select
                labelId="demo-mutiple-chip-label"
                fullWidth
                className={classes.input}
                id="demo-mutiple-chip"
                displayEmpty
                multiple
                value={dia}
                onChange={handleChangeDia}
                input={<Input id="select-multiple-chip" />}
                renderValue={(selected) => (
                    <div className={classes.chips}>
                    {selected.map((value) => (
                        <Chip key={value} label={value} className={classes.chip} />
                    ))}
                    </div>
                )}
                >
                <MenuItem value="" disabled>Seleccione uno o varios</MenuItem>
                {dias.map((dia) => (
                    <MenuItem key={dia} value={dia}>
                    {dia}
                    </MenuItem>
                    
                ))}
                </Select>
                </Grid>
                <Grid item sm={2} xs={4}>
                    <InputLabel className={classes.labelCheckbox}>Todos los días</InputLabel>
                    <Checkbox
                    color="primary"
                    value={checkTodosLosDias}
                    onChange={handleChangeTodosLosDias}
                    />
                </Grid>
            </Grid>
        &nbsp;
        <Typography className={classes.subtitulos}>Ubicación</Typography>
            <Grid container spacing={3}>
                <Grid item sm={12} xs={12}>
                <Select
                fullWidth
                className={classes.input}
                />
                </Grid>
                <Grid item sm={2} xs={6}>
                <TextField
                className={classes.input}
                label="Latitud"
                variant="standard"
                fullWidth
                disabled
                value="47.15"
                />
                </Grid>
                <Grid item sm={2} xs={6}>
                <TextField
                className={classes.input}
                label="Longitud"
                variant="standard"
                fullWidth
                disabled
                value="-35.1656"
                />
                </Grid>
                <Grid item sm={8} xs={12}>
                <TextField
                className={classes.input}
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
                <Grid item sm={3} xs={6}>
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
                <Grid item sm={3} xs={6}>
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
                <Grid item sm={3} xs={6}>
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