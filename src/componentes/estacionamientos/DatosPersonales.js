import React from 'react';
import Navbar from './../diseño/Navbar.js';
import { List, makeStyles,
Typography, Button, TextField, Grid } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import Footer from '../diseño/Footer.js';
import useInfoUsuario from '../../hooks/useInfoUsuario.js';
import InputMask from 'react-input-mask';
import * as CGeneral from '../../constantes/general/CGeneral';
import {useStyles} from './Styles';

const DatosPersonales = () => {
    const usuarioInfo = useInfoUsuario();
    const classes = useStyles();
    return ( 
        <>  
        <Navbar/>
        <Typography className={classes.titulo}>Mis datos personales</Typography>
        &nbsp;
        <List className={classes.cartaReservas}>
        &nbsp;
            <Grid container spacing={3}>
                <Grid item sm={12} xs={12}>
                <TextField
                className={classes.input}
                label="Nombre Completo"
                variant="standard"
                fullWidth
                autoFocus
                value={usuarioInfo.nombreCompleto}
                />
                </Grid>
                <Grid item sm={6} xs={12} >
                <InputMask 
                        mask="(+54) 9999999999"
                        value={usuarioInfo.telefono}
                        className = {classes.input}
                        >
                            {() => <TextField
                                className = {classes.input}
                                type="text"
                                fullWidth
                                name="telefono"
                                variant="standard"
                                label={CGeneral.TELEFONO}
                            />
                            }
                        </InputMask>
                </Grid>
                <Grid item sm={6} xs={12} >
                <InputMask
                        mask="99.999.999"
                        value={usuarioInfo.dni}
                        className={classes.input}
                        >
                            {() => <TextField
                                className = {classes.input}
                                type="text"
                                fullWidth
                                name="dni"
                                variant="standard"
                                label={CGeneral.DNI}
                            />
                            }
                        </InputMask>
                </Grid>
                <Grid item sm={12} xs={12} >
                <TextField
                className={classes.input}
                label="Correo electrónico"
                variant="standard"
                value={usuarioInfo.email}
                fullWidth
                />
                </Grid>
                <Grid item sm={12} xs={12} >
                <TextField
                className={classes.input}
                label="Contraseña"
                variant="standard"
                type="password"
                fullWidth
                />
                </Grid>
                <Grid item sm={12} xs={12} >
                <TextField
                className={classes.input}
                label="Repetir contraseña"
                variant="standard"
                type="password"
                fullWidth
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
 
export default DatosPersonales;