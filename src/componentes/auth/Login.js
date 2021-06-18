import React, { useContext, useState, useEffect } from 'react';
import { Button, Divider, Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent'
import logo from './../../imagenes/logo.png';
import {Link, useHistory } from 'react-router-dom';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import Spinner from './../diseño/Spinner';
import Toast from './../diseño/Toast';
import Footer from '../diseño/Footer';

import SpinnerContext from '../../context/spinner/spinnerContext';
import firebase from './../../firebase';
import traducirError from './../../firebase/errores';

import * as CGeneral from './../../constantes/general/CGeneral';
import * as CAuth from './../../constantes/auth/CAuth';

const useStyles = makeStyles( theme => ({
    cartaLogin: {
        [theme.breakpoints.up('lg')]:{
            margin:"auto",
            height: 400,
            width: 450,
            marginTop: "2rem",
        },
        [theme.breakpoints.down('md')]:{
            margin: "auto",
            height: 400,
            width: 300,
            marginTop: "3rem",
        },
        boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
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
        fontSize: 30
    },
    subtituloCarta:{
        fontFamily: "Roboto Condensed, sans-serif",
        color: "#ffffff",
        fontSize: 15
    },
    botonIniciarSesion: {
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
    botonOlvideContraseña: {
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
        [theme.breakpoints.down('lg')]:{
            width: 200,
        },
        [theme.breakpoints.up('lg')]:{
            width: 250,
        },
    },
}));

const Login = () => {
    const classes = useStyles();
    useEffect(()=> {
        localStorage.removeItem('infoPersona');
        localStorage.removeItem('infoReserva');
        localStorage.removeItem('fecha');
    });
    const history = useHistory();
    const spinnerContext = useContext(SpinnerContext);
    const { cargando, mostrarSpinner } = spinnerContext;
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
                history.push('/home')
            }
        }
        catch (error) {
            Toast(traducirError(error.code))
        }
    }
    
    return ( 
    (!cargando ? 
    <>
        <Link to="/">
            <img src={logo} alt="" className={classes.logo}></img>
        </Link>
        <Card className={classes.cartaLogin}>
            <CardContent className={classes.cartaEncabezado}>
                <Typography className={classes.tituloCarta}>{CGeneral.BIENVENIDO}</Typography>
                <VerifiedUserIcon className={classes.icono}></VerifiedUserIcon>
                <Typography className={classes.subtituloCarta}>{CGeneral.INGRESE_SUS_DATOS_PARA_CONTINUAR}</Typography>
            </CardContent>
            <Divider></Divider>
            &nbsp;
            <form onSubmit={iniciarSesion}>
                <Grid>
                    <Grid item>
                        <TextField
                            className = {classes.inputCarta}
                            type="text"
                            autoFocus
                            value={email}
                            name="email"
                            variant="outlined"
                            label={CGeneral.EMAIL}
                            onChange={onChange}
                        ></TextField>
                    </Grid>
                    &nbsp;
                    <Grid item>
                        <TextField
                            className = {classes.inputCarta}
                            type="password"
                            value={contraseña}
                            name="contraseña"
                            variant="outlined"
                            label={CGeneral.CONTRASEÑA}
                            onChange={onChange}
                        ></TextField>
                    </Grid>
                    &nbsp;
                    <Grid item>
                    <Button
                        className={classes.botonIniciarSesion}
                        variant="contained"
                        type="submit"
                    >{CAuth.INICIAR_SESION}
                    </Button>
                    </Grid>
                    &nbsp;
                    <Grid item>
                    <Link to={'/recuperar-contraseña'} style={{textDecoration: 'none'}}>
                    <Button
                        className={classes.botonOlvideContraseña}
                    >{CAuth.OLVIDE_MI_CONTRASEÑA}
                    </Button>
                    </Link>
                    </Grid>
                </Grid>
            </form>
        </Card>
    <Footer></Footer>
    </>
    :<Spinner></Spinner>)
    );
}
 
export default Login;