import { Button, Grid, TextField } from '@material-ui/core';
import React, { useState, useEffect, useContext } from 'react';
import Toast from '../diseño/Toast';
import {useStyles} from './Styles';
import firebase from './../../firebase';
import traducirError from './../../firebase/errores';
import * as CGeneral from './../../constantes/general/CGeneral';
import * as CAuth from './../../constantes/auth/CAuth';
import SpinnerContext from '../../context/spinner/spinnerContext';

const LoginCliente = ({cerrarModal}) => {
    const classes = useStyles();
    const spinnerContext = useContext(SpinnerContext);
    const { mostrarSpinner } = spinnerContext;
    useEffect(()=> {
        localStorage.removeItem('infoPersona');
        localStorage.removeItem('infoReserva');
        localStorage.removeItem('fecha');
    });
    //state para manejar el contenido de los inputs
    const [usuario, guardarUsuario] = useState({
        email: '',
        contraseña: ''
    })
    //guardamos el contenido del state en los inputs
    const { email, contraseña } = usuario;
    //evento onChange
    const onChange = (e) => {
        guardarUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        });
    }
    //función para iniciar sesión
    async function iniciarSesion(e) {
        e.preventDefault();
        try {
            if(email === '' || contraseña === '') {
                Toast(CGeneral.COMPLETE_TODOS_LOS_CAMPOS);
            }
            else {
                await firebase.login(email, contraseña);
                mostrarSpinner(CAuth.INICIANDO_SESION);
                cerrarModal();

            }
        }
        catch (error) {
            Toast(traducirError(error.code))
        }
    }
    return ( 
    <Grid container spacing={3}> 
        <Grid item xs={12} md={12} lg={12}>
        <br/>
            <TextField
            onChange={onChange}
            value={email}
            name="email"
            autoFocus
            variant="outlined"
            fullWidth
            className={classes.inputUsuarioCliente}
            label="Ingrese correo electrónico"></TextField>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
            <TextField
            value={contraseña}
            name="contraseña"
            type="password"
            onChange={onChange}
            variant="outlined"
            fullWidth
            className={classes.inputUsuarioCliente}
            label="Ingrese contraseña"></TextField>
        </Grid>
        <Button
        onClick={iniciarSesion}
        className={classes.botonIniciarSesion}>Ingresar
        </Button>
    </Grid>
    );
}
 
export default LoginCliente;