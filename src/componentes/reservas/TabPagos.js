import React from 'react';
import { Grid, TextField, Typography } from '@material-ui/core';
import { useStyles } from './Styles';
const TabPagos = () => {
    const classes = useStyles();
    return (
    <>
    <Typography className={classes.subtitulos}>Datos del pago</Typography>
    <br/>
        <Grid container spacing={3}>
            <Grid item lg={3} xs={12}>
                <TextField
                autoFocus
                variant="outlined"
                fullWidth
                name="monto"
                disabled
                value={'$ ' + JSON.parse(localStorage.getItem('infoPersona')).tipoVehiculo.split('&')[1]}
                label="Monto a pagar"
                className={classes.inputReserva}>
                </TextField>
            </Grid>
            <Grid item lg={3} xs={12}>
                <TextField
                variant="outlined"
                fullWidth
                name="ntarjeta"
                label="Número de tarjeta"
                className={classes.inputReserva}>
                </TextField>
            </Grid>
            <Grid item lg={3} xs={12}>
                <TextField
                variant="outlined"
                fullWidth
                name="fechaExpiracion"
                label="Fecha de expiración"
                className={classes.inputReserva}>
                </TextField>
            </Grid>
            <Grid item lg={3} xs={12}>
                <TextField
                variant="outlined"
                fullWidth
                name="cvc"
                label="CVC"
                className={classes.inputReserva}>
                </TextField>
            </Grid>
        </Grid>
    </>
     );
}
 
export default TabPagos;