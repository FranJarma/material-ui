import React, {useState} from 'react';
import Navbar from './../diseño/Navbar.js';
import { List, makeStyles,
Typography, Button, TextField, Grid, Select, MenuItem, InputLabel, Card } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import {
  KeyboardDatePicker,
} from '@material-ui/pickers';
import CheckIcon from '@material-ui/icons/Check';
import Footer from '../diseño/Footer.js';
import {useStyles} from './Styles';
import * as CReservas from './../../constantes/reservas/CReservas';
import useInfoEstacionamiento from '../../hooks/useInfoEstacionamiento';

const CambiarFechaReserva = () => {
    const classes = useStyles();
    const estacionamientoInfo = useInfoEstacionamiento();
    const [fechaSeleccionada, handleCambiarFecha] = useState(new Date());
    const [nuevoLugar, setNuevoLugar] = useState([]);
    const [mostrarInfo, setMostrarInfo] = useState(false);
    const handleChangeNuevoLugar = (event) => {
        setNuevoLugar(event.target.value);
    }
    const handleChangeMostrarInfo = () => {
        if (mostrarInfo === true) {
            setMostrarInfo(false);
        }
        else {
            setMostrarInfo(true);
        }
    }
    const lugares = [
        'Lugar 1',
        'Lugar 2',
        'Lugar 3',
        'Lugar 4',
        'Lugar 5',
        'Lugar 6',
        'Lugar 7',
        'Lugar 8',
        'Lugar 9',
        'Lugar 10',
        'Lugar 11',
        'Lugar 12',
        'Lugar 13',
        'Lugar 14',
        'Lugar 15',
    ]
    return ( 
        <>  
        <Navbar/>
        <Typography className={classes.titulo}>{CReservas.CAMBIAR_FECHA_RESERVAS}</Typography>
        &nbsp;
            <Alert className={classes.alerta} severity="info" variant="filled">{CReservas.ALERTA_CAMBIAR_FECHA}
            </Alert>
        &nbsp;
        <form className={classes.container}>
            <TextField
            className={classes.inputCodigo}
            label="Ingrese código de reserva de 20 dígitos"
            variant="standard"
            name="codigo"
            autoFocus
            inputProps = {{maxLength: 20}}
            />
            <Button
            onClick={handleChangeMostrarInfo}
            value={mostrarInfo}
            className= {classes.botonConsultar}>
            Consultar
            </Button>
        </form>
        &nbsp;
        {mostrarInfo ? 
        <>
        <Card className={classes.cartaReservas}>
        &nbsp;
        <Typography className={classes.subtitulos}>Datos de la persona</Typography>
        &nbsp;
            <Grid container spacing={3}>
                <Grid item sm={6} xs={12}>
                <TextField
                className={classes.input}
                label="Nombre Completo"
                variant="standard"
                fullWidth
                disabled
                value="Francisco Alfredo Jarma"
                />
                </Grid>
                <Grid item sm={6} xs={12}>
                <TextField
                className={classes.input}
                label="DNI"
                fullWidth
                variant="standard"
                disabled
                value="40.524.512"
                />
                </Grid>
                <Grid item sm={6} xs={4}>
                <TextField
                className={classes.input}
                label="Edad"
                variant="standard"
                fullWidth
                disabled
                value="23"
                />
                </Grid>
                <Grid item sm={6} xs={8} >
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
                <Grid item sm={4} xs={6}>
                <KeyboardDatePicker
                fullWidth
                disabled
                className={classes.input}
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
                <Grid item sm={4} xs={3}>
                <TextField
                className={classes.input}
                label="Lugar"
                variant="standard"
                fullWidth
                disabled
                value="23"
                />
                </Grid>
                <Grid item sm={4} xs={3}>
                <TextField
                className={classes.input}
                label="Precio"
                variant="standard"
                fullWidth
                disabled
                value="$100"
                />
                </Grid>
                <Grid item sm={4} xs={6}>
                <KeyboardDatePicker
                fullWidth
                disablePast
                className={classes.input}
                id="date-picker-dialog"
                label="Fecha nueva"
                format="dd/MM/yyyy"
                value={fechaSeleccionada}
                onChange={handleCambiarFecha}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
                />
                </Grid>
                <Grid item sm={4} xs={6}>
                <TextField
                className={classes.input}
                label="Diferencia"
                variant="standard"
                fullWidth
                value="$50"
                />
                </Grid>
                <Grid item sm={4} xs={12}>
                <InputLabel className={classes.label}>Nuevo Lugar</InputLabel>
                <Select
                fullWidth
                className={classes.select}
                displayEmpty
                value={nuevoLugar}
                onChange={handleChangeNuevoLugar}
                >
                <MenuItem value="" disabled>Seleccione uno</MenuItem>
                {lugares.map((lugar) => (
                    <MenuItem key={lugar} value={lugar}>
                    {lugar}
                    </MenuItem>
                    
                ))}
                </Select>
                </Grid>
            </Grid>
            <Button
                endIcon={<CheckIcon/>}
                className= {classes.botonCambiarReserva}>Cambiar reserva
            </Button>
        </Card>
        </>
        : 
        <Typography className={classes.cantidad}>No se encontró la reserva</Typography>
        }
        &nbsp;
        <Footer/>
    </>
     );
}
 
export default CambiarFechaReserva;