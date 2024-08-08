import { Button, Grid, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import {useStyles} from './Styles';
import Toast from '../diseño/Toast';
import Swal from '../diseño/Swal';
import firebase from '../../firebase';
import traducirError from '../../firebase/errores';
import * as CGeneral from '../../constantes/general/CGeneral';
import * as CAuth from '../../constantes/auth/CAuth';
import InputMask from 'react-input-mask';

const RegistrarCliente = ({cerrarModal}) => {
    const classes = useStyles();
    //state para manejar el contenido de los inputs
    const [usuario, guardarUsuario] = useState({
        nombreCompleto: '',
        email: '',
        nombreUsuario: '',
        contraseña: '',
        rcontraseña: '',
        telefono: '',
        dni: ''
    })
    //guardamos el contenido del state en los inputs
    const { nombreCompleto, email, nombreUsuario, contraseña, rcontraseña, telefono, dni } = usuario;
    //evento onChange
    const onChange = (e) => {
        guardarUsuario({
            ...usuario,
            [e.target.name] : e.target.value
    });
    }
    //función para registrar usuario
    async function registrarUsuario() {
        try {
            if(nombreCompleto === '' || email === '' || contraseña === '' || dni === '' || telefono === ''
            || nombreUsuario === ''){
                Toast(CGeneral.COMPLETE_TODOS_LOS_CAMPOS);
            }
            else if(contraseña !== rcontraseña) {
                Toast(CGeneral.LAS_CONTRASEÑAS_NO_COINCIDEN);
            }
            //se utiliza la función includes para verificar si alguno de los dos campos tiene espacio en blanco
            else if(dni.includes('_')){
                Toast(CGeneral.VALIDACION_DNI)
            }
            else if(telefono.includes('_')){
                Toast(CGeneral.VALIDACION_TELEFONO)
            }
            else{
                await firebase.registrarCliente(nombreCompleto, email, nombreUsuario, contraseña,
                new Date(), telefono, dni);
                Swal(CGeneral.OPERACION_COMPLETADA, CAuth.REGISTRO_EXITOSO);
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
            autoFocus
            onChange={onChange}
            value={nombreCompleto}
            name="nombreCompleto"
            variant="outlined"
            fullWidth
            className={classes.inputUsuarioCliente}
            label="Ingrese nombre completo">
            </TextField>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
            <TextField
            onChange={onChange}
            value={nombreUsuario}
            name="nombreUsuario"
            variant="outlined"
            fullWidth
            className={classes.inputUsuarioCliente}
            label="Ingrese nombre de usuario">
            </TextField>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
            <TextField
            onChange={onChange}
            variant="outlined"
            value={email}
            name="email"
            fullWidth
            className={classes.inputUsuarioCliente}
            label="Ingrese correo electrónico"></TextField>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
            <InputMask
                    mask="99.999.999"
                    value={dni}
                    onChange={onChange}
                    >
                        {() => <TextField
                            className = {classes.inputUsuarioCliente}
                            type="text"
                            fullWidth
                            name="dni"
                            variant="outlined"
                            label={CGeneral.DNI}
                        />
                        }
                    </InputMask>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
            <InputMask
                mask="(+54) 9999999999"
                value={telefono}
                onChange={onChange}
                >
                    {() => <TextField
                        className = {classes.inputUsuarioCliente}
                        type="text"
                        fullWidth
                        name="telefono"
                        variant="outlined"
                        label={CGeneral.TELEFONO}
                    />
                    }
            </InputMask>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
            <TextField
            onChange={onChange}
            variant="outlined"
            value={contraseña}
            name="contraseña"
            type="password"
            fullWidth
            className={classes.inputUsuarioCliente}
            label="Ingrese contraseña"></TextField>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
            <TextField
            onChange={onChange}
            variant="outlined"
            value={rcontraseña}
            name="rcontraseña"
            type="password"
            fullWidth
            className={classes.inputUsuarioCliente}
            label="Repita contraseña"></TextField>
        </Grid>
        <Button
        onClick={registrarUsuario}
        className={classes.botonIniciarSesion}>Registrar</Button>
    </Grid>
    );
}
 
export default RegistrarCliente;