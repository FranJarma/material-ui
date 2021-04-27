import React, { useContext, useState } from 'react';
import { Button, Divider, Grid, makeStyles, Slide, TextField, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent'
import logo from './../../imagenes/logo.png';
import { Link, useHistory } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import LockIcon from '@material-ui/icons/Lock';

import firebase from './../../firebase';
import AlertaContext from '../../context/alerta/alertaContext';
import traducirError from './../../firebase/errores';
import swal from 'sweetalert2';

const useStyles = makeStyles( theme => ({
    cartaRecuperarContraseña: {
        [theme.breakpoints.up('lg')]:{
            margin:"auto",
            height: 300,
            width: 450,
            marginTop: "2rem",
        },
        [theme.breakpoints.down('md')]:{
            margin: "auto",
            height: 300,
            width: 300,
            marginTop: "3rem",
        },
        boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)"
    },
    alerta:{
        position: "relative",
        [theme.breakpoints.up('lg')]:{
            width: 350,
            marginLeft: "1rem",
            marginTop: "14rem",
        },
        [theme.breakpoints.down('md')]:{
            width: 300,
            marginTop: "4rem",
        },
        borderRadius: 5
    },
    cartaEncabezado: {
        backgroundColor: "#4db6ac",
    },
    icono: {
        color: "#ffffff",
        float:"right",
    },
    tituloCarta:{
        fontFamily: "Roboto Condensed, sans-serif",
        textTransform: "uppercase",
        color: "#ffffff",
        fontSize: 25
    },
    subtituloCarta:{
        fontFamily: "Roboto Condensed, sans-serif",
        color: "#ffffff",
        fontSize: 13
    },
    botonRecuperarContraseña: {
        fontFamily: "Roboto Condensed, sans-serif",
        fontSize: 15,
        backgroundColor: "#4db6ac",
        color:'#FFFFFF',
        marginLeft: 20,
        width: "90%",
        "&:hover":{
            backgroundColor: "#4db6ac"
        }
    },
    botonVolver: {
        fontFamily: "Roboto Condensed, sans-serif",
        fontSize: 15,
        marginLeft: 20,
        width: "90%",
        "&:hover":{
            backgroundColor: "#f5f5f5"
        }
    },
    inputCarta: {
        width: "90%",
        fontFamily: "Roboto Condensed, sans-serif",
        marginLeft: 20,
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "#rgba(0, 0, 0, 0.23);"
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#4db6ac;"
        },
        "& .MuiFormLabel-root.Mui-focused": {
            color: "#4db6ac"
        }
    },
    logo: {
        marginTop: "1rem",
        marginLeft: "auto",
        marginRight: "auto",
        display: "block",
        [theme.breakpoints.up('xs')]:{
            width: 200,

        },
        [theme.breakpoints.up('sm')]:{
            width: 200,
        },
        [theme.breakpoints.up('lg')]:{
            width: 250,
        },
    },
}));

const RecuperarContraseña = () => {
    const classes = useStyles();
    const history = useHistory();
    const alertaContext = useContext(AlertaContext);
    const { alerta, mensaje, mostrarAlerta } = alertaContext;
    //state para manejar el contenido de los inputs
    const [usuario, guardarUsuario] = useState({
        email: '',
    })
    //guardamos el contenido del state en los inputs
    const { email } = usuario;
    //evento onChange
    const onChange = (e) => {
        guardarUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        });
    }
    //función para recuperar contraseña
    async function recuperarContraseña () {
        try {
            await firebase.recuperarContraseña(email);
            swal.fire({
                title: '<a style="font-family: Roboto Condensed">Operación completada</a>',
                icon: 'success',
                html: '<p style="font-family: Roboto Condensed">Se ha enviado un correo electrónico a la dirección ingresada. Por favor, siga los pasos para poder recuperar su contraseña.</p>'
            })
            history.push("/");
        } catch (error) {
            const Toast = swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', swal.stopTimer)
                  toast.addEventListener('mouseleave', swal.resumeTimer)
                }
              })
              Toast.fire({
                icon: 'warning',
                title: `<a style="font-family: Roboto Condensed">${traducirError(error.code)}</a>`
              })
        }
    }
    return ( 
    <>
        <div>
            <img src={logo} alt="" className={classes.logo}></img>
        </div>
        <Card className={classes.cartaRecuperarContraseña}>
            <CardContent className={classes.cartaEncabezado}>
                <Typography className={classes.tituloCarta}>Olvidé mi contraseña</Typography>
                <LockIcon className={classes.icono}></LockIcon>
                <Typography className={classes.subtituloCarta}>Ingrese su correo electrónico para continuar</Typography>
            </CardContent>
            <Divider></Divider>
            &nbsp;
            <form>
                <Grid>
                    <>
                        <Grid item>
                            <TextField
                                className = {classes.inputCarta}
                                type="text"
                                name="email"
                                value={email}
                                variant="outlined"
                                label="Correo electrónico"
                                onChange={onChange}
                                autoFocus
                            ></TextField>
                        </Grid>
                    &nbsp;
                    &nbsp;
                    <Grid item>
                    <Button
                        className={classes.botonRecuperarContraseña}
                        variant="contained"
                        onClick={recuperarContraseña}
                    >Recuperar contraseña
                    </Button>
                    </Grid>
                    &nbsp;
                    </>
                    <Grid item>
                    <Link to={'/'} style={{textDecoration: 'none'}}>
                    <Button
                        className={classes.botonVolver}
                    >Volver a Login
                    </Button>
                    </Link>
                    </Grid>
                </Grid>
            </form>
        </Card>
        {alerta ?
        <>
        <Slide direction="right" in={alerta} mountOnEnter unmountOnExit>
            <Alert className={classes.alerta} severity="warning" variant="filled">{mensaje}</Alert>
        </Slide>
        </>
        : ""}
    </>
        );
}
 
export default RecuperarContraseña;