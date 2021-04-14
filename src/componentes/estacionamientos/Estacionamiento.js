import React, { useState, useEffect } from 'react';
import Navbar from '../diseño/Navbar.js';
import { List, makeStyles,
Typography, Button, TextField, Grid, Select, Checkbox } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import Footer from '../diseño/Footer.js';
import {
    KeyboardTimePicker,
  } from '@material-ui/pickers';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';

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
        marginLeft: "1rem"
    },
    cartaReservas: {
        flexGrow: 1,
        paddingLeft: 20,
        backgroundColor: theme.palette.background.paper,
        boxShadow: "0 2px 3px rgba(0,0,0,0.25), 0 0 3px rgba(0,0,0,0.22)",
        marginLeft: "1rem",
        marginRight: "1rem"
    },
    input: {
        paddingRight: "1rem",
        "& .MuiFormLabel-root.Mui-focused": {
            color: "#4db6ac"
        },
        "& .MuiInput-underline:after": {
            borderBottomColor: "#4db6ac"
        },
    },
    select: {
        paddingRight: "1rem",
        '&:after': {
            borderColor: "#4db6ac",
        }
    },
    botonModificarDatos: {
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
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    labelSelect: {
        fontSize: "0.8rem"
    },
    labelCheckbox: {
        fontSize: "0.8rem"
    },
    alerta:{
        position: "relative",
        marginLeft: "1rem",
        marginRight: "1rem",
        borderRadius: 0
    },
}));

const Estacionamiento = () => {
    //states para los campos de fechas y horas y para los días de la semana y para las provincias
    const [horaApertura, setearHoraIngreso] = useState(new Date());
    const handleCambiarHoraApertura = (horaApertura) => {
        setearHoraIngreso(horaApertura);
    };
    const [horaCierre, setearHoraCierre] = useState(new Date());
    const handleCambiarHoraCierre = (horaCierre) => {
        setearHoraCierre(horaCierre);
    };

    const [dia, setearDia] = useState([]);

    const handleChangeDia = (event) => {
        setearDia(event.target.value);
    };
    
    const [provincias, setearProvincias] = useState([]);
    const dias = [
        'Lunes',
        'Martes',
        'Miercoles',
        'Jueves',
        'Viernes',
        'Sábado',
        'Domingo',
    ];
    //state para manejar la provincia seleccionada al cambiar el elemento del select
    const [provinciaSeleccionada, setearProvinciaSeleccionada] = useState([]);
    const handleChangeSelectProvincia = (event) => {
        setearProvinciaSeleccionada(event.target.value);
    };
    //state para manejar los checkbox
    var [state, setState] = useState({
        todosLosDias: false,
        horarioCorrido: false
    });
    const handleChangeCheckBox = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.checked
        });
    }
    const {
        todosLosDias,
        horarioCorrido
    } = state;
    //función para consultar a la api de provincias y traer los datos
    useEffect(()=>{
        axios.get(`https://infra.datos.gob.ar/catalog/modernizacion/dataset/7/distribution/7.2/download/provincias.json`)
        .then(res => {
            const resultado = res.data;
            setearProvincias(resultado.provincias);
            console.log(resultado);
        });
    },[setearProvincias]);

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
                 <li>Ubicación georeferenciada.</li>
            </ul>
            </Alert>
        &nbsp;
        <List className={classes.cartaReservas}>
        &nbsp;
        <Typography className={classes.subtitulos}>Datos de la playa de estacionamiento</Typography>
        &nbsp;
            <Grid container spacing={3}>
                <Grid item sm={12} xs={12}>
                <TextField
                className={classes.input}
                label="Nombre Completo"
                variant="standard"
                fullWidth
                autoFocus
                value="Playa de estacionamiento del convento"
                />
                </Grid>
                <Grid item sm={11} xs={11}>
                <InputLabel className={classes.labelSelect}>Provincia</InputLabel>
                <Select
                className={classes.select}
                value={provinciaSeleccionada}
                displayEmpty
                onChange={handleChangeSelectProvincia}
                variant="standard"
                fullWidth
                >
                <MenuItem value="" disabled>Seleccione</MenuItem>
                {provincias.map((provincia) => (
                    <MenuItem key={provincia.id} value={provincia.nombre}>
                        {provincia.nombre}
                    </MenuItem>
                ))}
                </Select>
                </Grid>
                <Grid item sm={4} xs={6} >
                <TextField
                className={classes.input}
                label="N° de teléfono"
                variant="standard"
                value="4224256"
                fullWidth
                />
                </Grid>
                <Grid item sm={4} xs={6} >
                <TextField
                className={classes.input}
                label="CUIT"
                variant="standard"
                value="25405245125"
                fullWidth
                />
                </Grid>
                <Grid item sm={4} xs={12} >
                <TextField
                className={classes.input}
                label="Cantidad de lugares"
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
                { !horarioCorrido ?
                <>
                <Grid item sm={6} xs={6} >
                <KeyboardTimePicker
                className={classes.input}
                fullWidth
                label="Apertura"
                value={horaApertura}
                onChange={handleCambiarHoraApertura}
                KeyboardButtonProps={{
                    'aria-label': 'change time',
                }}
                />  
                </Grid>
                <Grid item sm={6} xs={6} >
                <KeyboardTimePicker
                className={classes.input}
                fullWidth
                label="Cierre"
                value={horaCierre}
                onChange={handleCambiarHoraCierre}
                KeyboardButtonProps={{
                    'aria-label': 'change time',
                }}
                />
                </Grid>
                </>
                : ""}
                <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                    <Checkbox color="primary" name="horarioCorrido" onChange={handleChangeCheckBox}></Checkbox>
                    <Typography className={classes.subtitulos}>Horario corrido</Typography>
                </div>
                { !todosLosDias ?
                <>
                <Grid item sm={11} xs={11}>
                <InputLabel className={classes.labelSelect}>Días de apertura (Seleccione uno o varios)</InputLabel>
                <Select
                fullWidth
                className={classes.select}
                displayEmpty
                multiple
                value={dia}
                onChange={handleChangeDia}
                input={<Input/>}
                renderValue={(selected) => (
                    <div className={classes.chips}>
                    {selected.map((value) => (
                        <Chip key={value} label={value} className={classes.chip} />
                    ))}
                    </div>
                )}
                />
                <MenuItem value="" disabled>Seleccione uno o varios</MenuItem>
                {dias.map((dia) => (
                    <MenuItem key={dia} value={dia}>
                    {dia}
                    </MenuItem>
                    
                ))}
                </Grid>
                </>
                : ""}
                <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                    <Checkbox color="primary" name="todosLosDias" onChange={handleChangeCheckBox}></Checkbox>
                    <Typography className={classes.subtitulos}>Todos los días</Typography>
                </div>  
            </Grid>
        &nbsp;
        <Typography className={classes.subtitulos}>Ubicación</Typography>
            <Grid container spacing={3}>
                <Grid item sm={11} xs={11}>
                <Select
                fullWidth
                className={classes.select}
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