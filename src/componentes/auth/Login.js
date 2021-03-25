import React from 'react';
import { Button, Divider, Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent'
import logo from './../../imagenes/logo.png';
import {Link} from 'react-router-dom';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';

const useStyles = makeStyles( theme => ({
    cartaLogin: {
        height: 400,
        width: 450,
        margin: "auto",
        marginTop: "2rem",
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
        width: "91%",
        "&:hover":{
            backgroundColor: "#4db6ac"
        }
    },
    botonOlvideContraseña: {
        fontFamily: "Roboto Condensed, sans-serif",
        fontSize: 15,
        marginLeft: 20,
        width: "91%",
        "&:hover":{
            backgroundColor: "#f5f5f5"
        }
    },
    inputCarta: {
        width: "91%",
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

const Login = () => {
    const classes = useStyles();
    return ( 
    <>
        <div>
            <img src={logo} alt="" className={classes.logo}></img>
        </div>
        <Card className={classes.cartaLogin}>
            <CardContent className={classes.cartaEncabezado}>
                <Typography className={classes.tituloCarta}>Bienvenido</Typography>
                <VerifiedUserIcon className={classes.icono}></VerifiedUserIcon>
                <Typography className={classes.subtituloCarta}>Ingrese sus datos para continuar</Typography>
            </CardContent>
            <Divider></Divider>
            &nbsp;
            <form>
                <Grid>
                    <Grid item>
                        <TextField
                            className = {classes.inputCarta}
                            type="text"
                            variant="outlined"
                            label="Usuario"
                            autoFocus
                        ></TextField>
                    </Grid>
                    &nbsp;
                    <Grid item>
                        <TextField
                            className = {classes.inputCarta}
                            type="password"
                            variant="outlined"
                            label="Contraseña"
                        ></TextField>
                    </Grid>
                    &nbsp;
                    <Grid item>
                    <Link to={'/home'} style={{textDecoration: 'none'}}>
                    <Button
                        className={classes.botonIniciarSesion}
                        variant="contained"
                    >Iniciar sesión
                    </Button>
                    </Link>
                    </Grid>
                    &nbsp;
                    <Grid item>
                    <Link to={'/recuperar-contraseña'} style={{textDecoration: 'none'}}>
                    <Button
                        className={classes.botonOlvideContraseña}
                    >Olvidé mi contraseña
                    </Button>
                    </Link>
                    </Grid>
                </Grid>
            </form>
        </Card>
    </>
        );
}
 
export default Login;