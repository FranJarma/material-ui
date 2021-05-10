import React, { useContext, useState, useEffect } from 'react';
import { Button, Checkbox, Grid, TextField, Typography } from '@material-ui/core';
import SpinnerContext from '../../context/spinner/spinnerContext';
import CheckIcon from '@material-ui/icons/Check';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import * as CGeneral from '../../constantes/general/CGeneral';
import * as CAuth from '../../constantes/auth/CAuth';
import InputMask from 'react-input-mask';
import {useStyles} from './Styles';
import Toast from './../diseño/Toast';
import Swal from './../diseño/Swal';
import firebase from './../../firebase';
import traducirError from './../../firebase/errores';

//le pasamos como props la info del usuario seleccionado con el botón, la acción (registrar / modificar) y la función para cerrar el modal
const NuevoUsuario = ({usuarioCompleto, accion, cerrarModal}) => {
    const classes = useStyles();
    const spinnerContext = useContext(SpinnerContext);
    const { cargando } = spinnerContext;
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
    //state para manejar los checkbox
    const [checkAdmin, setcheckAdmin] = useState(false);
    const handleChangeCheckBox = (event) => {
        setcheckAdmin(event.target.checked);
    }
    // use effect para cargar los campos al querer modificar un usuario
    useEffect(()=>{
        if (usuarioCompleto){
            guardarUsuario({
                nombreCompleto: usuarioCompleto.nombreCompleto,
                email: usuarioCompleto.email,
                nombreUsuario: usuarioCompleto.nombreUsuario,
                contraseña: usuarioCompleto.contraseña,
                telefono: usuarioCompleto.telefono,
                dni: usuarioCompleto.dni
            })
            setcheckAdmin(usuarioCompleto.esAdmin)
        }
    }, [guardarUsuario])
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
                await firebase.registrarUsuario(nombreCompleto, email, nombreUsuario, contraseña, !checkAdmin,
                new Date().getDate() + '/' + (new Date().getMonth()+1) + '/' + new Date().getFullYear(),
                telefono, dni, checkAdmin);
                Swal(CGeneral.OPERACION_COMPLETADA, CAuth.REGISTRO_EXITOSO);
                cerrarModal();
            }
        }
        catch (error) {
            console.log(error);
            Toast(traducirError(error.code))
        }
    }
    //función para modificar usuario
    async function modificarUsuario() {
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
                //hay que pasarle el id del documento
                await firebase.modificarUsuario(usuarioCompleto.id, nombreCompleto,
                nombreUsuario, email, telefono, dni, !checkAdmin, checkAdmin);
                cerrarModal();
                Swal(CGeneral.OPERACION_COMPLETADA, CAuth.USUARIO_MODIFICADO);
            }
        }
        catch (error) {
            console.log(error);
            Toast(traducirError(error.code))
        }
    }
    return ( 
    (!cargando ? 
    <>
        &nbsp;
        <form>
            <Grid container spacing={3}>
                <Grid item md={6} sm={5} xs={12}>
                    <TextField
                        className = {classes.inputNuevoUsuario}
                        fullWidth
                        type="text"
                        autoFocus
                        value={nombreCompleto}
                        name="nombreCompleto"
                        variant="outlined"
                        label={CGeneral.NOMBRE_COMPLETO}
                        onChange={onChange}
                    ></TextField>
                </Grid>
                <Grid item md={3} sm={3} xs={12}>
                    <InputMask
                    mask="99.999.999"
                    value={dni}
                    onChange={onChange}
                    >
                        {() => <TextField
                            className = {classes.inputNuevoUsuario}
                            type="text"
                            fullWidth
                            name="dni"
                            variant="outlined"
                            label={CGeneral.DNI}
                        />
                        }
                    </InputMask>
                </Grid>
                <Grid item md={3} sm={4} xs={12}>
                    <InputMask
                    mask="(+54) 9999999999"
                    value={telefono}
                    onChange={onChange}
                    >
                        {() => <TextField
                            className = {classes.inputNuevoUsuario}
                            type="text"
                            fullWidth
                            name="telefono"
                            variant="outlined"
                            label={CGeneral.TELEFONO}
                        />
                        }
                    </InputMask>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item md={6} sm={6} xs={12}>
                    <TextField
                        className = {classes.inputNuevoUsuario}
                        type="text"
                        fullWidth
                        value={email}
                        name="email"
                        variant="outlined"
                        label={CGeneral.EMAIL}
                        onChange={onChange}
                    ></TextField>
                </Grid>
                <Grid item md={6} sm={6} xs={12}>
                    <TextField
                        className={classes.inputNuevoUsuario}
                        type="text"
                        fullWidth
                        value={nombreUsuario}
                        name="nombreUsuario"
                        variant="outlined"
                        label={CGeneral.NOMBRE_USUARIO}
                        onChange={onChange}
                    ></TextField>
                </Grid>
            </Grid>
            {accion === "Registrar" ? 
            <>
            <Grid container spacing={3}>
                <Grid item md={6} sm={6} xs={12}>
                    <TextField
                        className = {classes.inputNuevoUsuario}
                        type="password"
                        fullWidth
                        value={contraseña}
                        name="contraseña"
                        variant="outlined"
                        label={CGeneral.CONTRASEÑA}
                        onChange={onChange}
                    ></TextField>
                </Grid>
                <Grid item md={6} sm={6} xs={12}>
                <TextField
                        className = {classes.inputNuevoUsuario}
                        type="password"
                        fullWidth
                        value={rcontraseña}
                        name="rcontraseña"
                        variant="outlined"
                        label={CGeneral.REPITA_CONTRASEÑA}
                        onChange={onChange}
                    ></TextField>
                </Grid>
            </Grid>
            </>
            : ""}
                <Grid item >
                    <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap',
                    marginTop: '1rem'}}>
                        <Checkbox
                        color="primary" checked={checkAdmin} name="esAdmin" onChange={handleChangeCheckBox}></Checkbox>
                        <Typography className={classes.subtitulos}>Es admin</Typography>
                    </div>
                </Grid>
                <Button onClick={accion === "Registrar" ? registrarUsuario : modificarUsuario}
                endIcon={accion === "Registrar" ? <CheckIcon/> : <AssignmentTurnedInIcon/>}
                className={classes.botonAgregar}>{accion === "Registrar" ? "Agregar" : "Modificar"}</Button>
        </form>
    </>
    : "")
);

}

export default NuevoUsuario;
