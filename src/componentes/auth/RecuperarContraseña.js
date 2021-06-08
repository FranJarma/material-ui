import React, { useState } from 'react';
import { Button, Divider, Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent'
import logo from './../../imagenes/logo.png';
import { Link, useHistory } from 'react-router-dom';
import LockIcon from '@material-ui/icons/Lock';

import firebase from './../../firebase';
import traducirError from './../../firebase/errores';
import Footer from '../diseño/Footer';
import Alert from '@material-ui/lab/Alert';

import * as CGeneral from '../../constantes/general/CGeneral';
import * as CAuth from '../../constantes/auth/CAuth';
import Toast from '../diseño/Toast';
import Swal from '../diseño/Swal';

const useStyles = makeStyles( theme => ({
    cartaRecuperarContraseña: {
        [theme.breakpoints.up('lg')]:{
            margin:"auto",
            height: 300,
            width: 600,
            marginTop: "2rem",
        },
        [theme.breakpoints.down('md')]:{
            margin: "auto",
            height: 300,
            width: 300,
            marginTop: "2.5rem",
        },
        boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)"
    },
    alerta:{
        borderRadius: 5,
        [theme.breakpoints.up('lg')]:{
            margin:"auto",
            width: 600,
            marginTop: "1rem",
        },
        [theme.breakpoints.down('md')]:{
            margin: "auto",
            width: 300,
            marginTop: "2.5rem",
        },
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
            if(email === '') {
                Toast(CGeneral.COMPLETE_TODOS_LOS_CAMPOS)
            }
            else {
                await firebase.recuperarContraseña(email);
                Swal(CGeneral.OPERACION_COMPLETADA, CAuth.SE_HA_ENVIADO_CORREO);
                history.push("/login-encargados");
            }
        } catch (error) {
            Toast(traducirError(error.code));
        }
    }
    return ( 
    <>
        <div>
            <img src={logo} alt="" className={classes.logo}></img>
        </div>
        <Card className={classes.cartaRecuperarContraseña}>
            <CardContent className={classes.cartaEncabezado}>
                <Typography className={classes.tituloCarta}>{CAuth.OLVIDE_MI_CONTRASEÑA}</Typography>
                <LockIcon className={classes.icono}></LockIcon>
                <Typography className={classes.subtituloCarta}>{CGeneral.INGRESE_EMAIL}</Typography>
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
                            label={CGeneral.EMAIL}
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
                    >{CAuth.RECUPERAR_CONTRASEÑA}
                    </Button>
                    </Grid>
                    &nbsp;
                    </>
                    <Grid item>
                    <Link exact to={'/login-encargados'} style={{textDecoration: 'none'}}>
                    <Button
                        className={classes.botonVolver}
                    >{CGeneral.VOLVER}
                    </Button>
                    </Link>
                    </Grid>
                </Grid>
            </form>
        </Card>
        <Alert className={classes.alerta}>
            {CAuth.ENVIAREMOS_MAIL}
        </Alert>
        <Footer></Footer>
    </>
        );
}
 
export default RecuperarContraseña;