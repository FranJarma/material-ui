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
import {useStyles} from './Styles';

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
        <List className={classes.cartaMiEstacionamiento}>
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
                <Grid item sm={6} xs={6} >
                <TextField
                className={classes.input}
                label="N° de teléfono"
                variant="standard"
                value="4224256"
                fullWidth
                />
                </Grid>
                <Grid item sm={6} xs={6} >
                <TextField
                className={classes.input}
                label="CUIT"
                variant="standard"
                value="25405245125"
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
                >
                <MenuItem value="" disabled>Seleccione uno o varios</MenuItem>
                {dias.map((dia) => (
                    <MenuItem key={dia} value={dia}>
                    {dia}
                    </MenuItem>
                    
                ))}
                </Select>
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