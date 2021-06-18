import React, { useState } from 'react';
import { FormHelperText, Grid, MenuItem, TextField, Typography } from '@material-ui/core';
import { useStyles } from './Styles';
import useLocalStorageState from 'use-local-storage-state'
import InputMask from 'react-input-mask';

const TabPersona = ({estacionamiento}) => {
    const classes = useStyles();
    const [infoPersona, setInfoPersona] = useState({
        nombreCompleto: '',
        dni: '',
        email: '',
        telefono: '',
        tipoVehiculo: '',
        marcaVehiculo: '',
        patenteVehiculo: '',
        valor: ''
    });
    const [localStorage, guardarEnLocalStorage] = useLocalStorageState('infoPersona', infoPersona);
    //evento onChange
    const onChange = (e) => {
        setInfoPersona({
            ...infoPersona,
            [e.target.name] : e.target.value
        });
        guardarEnLocalStorage({
            ...infoPersona,
            [e.target.name] : e.target.value,
        })
    }
    const marcas = [
        {id: 0, marca: 'Audi'},
        {id: 1, marca: 'BMW'},
        {id: 2, marca: 'Chevrolet'},
        {id: 3, marca: 'Citroen'},
        {id: 4, marca: 'Fiat'},
        {id: 5, marca: 'Ford'},
        {id: 6, marca: 'Honda'},
        {id: 7, marca: 'Nissan'},
        {id: 8, marca: 'Peugeot'},
        {id: 9, marca: 'Renault'},
        {id: 10, marca: 'Toyota'},
        {id: 11, marca: 'Volkswagen'}
    ];

    return (
    <>
    <Typography className={classes.subtitulos}>Datos de la persona</Typography>
    <br/>
        <Grid container spacing={3}>
            <Grid item lg={4} xs={12}>
                <TextField
                autoFocus
                variant="outlined"
                fullWidth
                value={localStorage.nombreCompleto}
                name="nombreCompleto"
                label="Nombre completo"
                onChange={onChange}
                className={classes.inputReserva}>
                </TextField>
            </Grid>
            <Grid item lg={4} xs={12}>
                <TextField
                variant="outlined"
                fullWidth
                type="text"
                value={localStorage.email}
                name="email"
                label="Email"
                onChange={onChange}
                className={classes.inputReserva}>
                </TextField>
            </Grid>
            <Grid item lg={2} xs={6}>
            <InputMask
                    mask="99.999.999"
                    value={localStorage.dni}
                    onChange={onChange}
                    >
                        {() => <TextField
                            className = {classes.inputReserva}
                            type="text"
                            fullWidth
                            name="dni"
                            variant="outlined"
                            label="DNI"
                        />
                        }
            </InputMask>
            </Grid>
            <Grid item lg={2} xs={6}>
            <InputMask
                    mask="(+54) 9999999999"
                    value={localStorage.telefono}
                    onChange={onChange}
                    >
                        {() => <TextField
                            className = {classes.inputReserva}
                            type="text"
                            fullWidth
                            name="telefono"
                            variant="outlined"
                            label="N° de teléfono"
                        />
                        }
            </InputMask>
            </Grid>
        </Grid>
    <br/>
    <Typography className={classes.subtitulos}>Datos del vehículo</Typography>
    <br/>
        <Grid container spacing={3}>
            <Grid item lg={4} xs={6}>
                <TextField
                variant="outlined"
                fullWidth
                name="tipoVehiculo"
                label="Tipo de vehículo"
                onChange={onChange}
                value={localStorage.tipoVehiculo}
                className={classes.inputReserva}
                select
                >
                {estacionamiento.tarifas.map((vehiculo) => (
                <MenuItem
                style={{textTransform: 'capitalize'}}
                key={vehiculo.vehiculo}
                name={vehiculo.vehiculo + '&' + vehiculo.valor}
                value={vehiculo.vehiculo + '&' + vehiculo.valor}>
                {vehiculo.vehiculo}
                <FormHelperText style={{marginLeft: '0.5rem'}}>${vehiculo.valor} p/hora</FormHelperText>
                </MenuItem>
                ))}
                </TextField>
            </Grid>
            <Grid item lg={4} xs={6}>
                <TextField
                variant="outlined"
                fullWidth
                value={localStorage.marcaVehiculo}
                name="marcaVehiculo"
                label="Marca del vehículo"
                onChange={onChange}
                className={classes.inputReserva}
                select>
                {marcas.map((vehiculo) => (
                <MenuItem
                style={{textTransform: 'capitalize'}}
                key={vehiculo.id}
                name={vehiculo.marca}
                value={vehiculo.marca}>
                {vehiculo.marca}
                </MenuItem>
                ))}
                </TextField>
            </Grid>
            <Grid item lg={4} xs={6}>
                <InputMask
                    mask="aa 999 aa"
                    value={localStorage.patenteVehiculo}
                    onChange={onChange}
                    >
                        {() => <TextField
                            className = {classes.inputReserva}
                            type="text"
                            fullWidth
                            name="patenteVehiculo"
                            variant="outlined"
                            label="N° de patente"
                        />
                        }
                </InputMask>
            </Grid>
        </Grid>
    </>
     );
}
 
export default TabPersona;