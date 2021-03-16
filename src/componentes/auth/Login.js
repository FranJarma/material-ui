import React from 'react';
import { Button, Divider, Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent'
import logo from './../../imagenes/logo.png';
import {Link} from 'react-router-dom';

const useStyles = makeStyles( theme => ({
    cartaLogin: {
        height: 450,
        width: 450,
        margin: "auto",
        marginTop: "2rem"
    },
    tituloCarta:{
        fontFamily: "Roboto Condensed, sans-serif",
        textTransform: "uppercase",
        fontSize: 30
    },
    subtituloCarta:{
        fontFamily: "Roboto Condensed, sans-serif",
        color: "#bdbdbd",
        fontSize: 15
    },
    botonIniciarSesion: {
        fontFamily: "Roboto Condensed, sans-serif",
        fontSize: 15,
        backgroundColor: "#14a37f",
        marginLeft: 20,
        width: "91%",
        "&:hover":{
            backgroundColor: "#14a37f"
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
            borderColor: "#14a37f"
        },
        "& .MuiFormLabel-root.Mui-focused": {
            color: "#14a37f"
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
            <img src={logo} className={classes.logo}></img>
        </div>
        <Card className={classes.cartaLogin}>
            <CardContent>
                <Typography className={classes.tituloCarta}>Login</Typography>
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
                    <Link to={'/home'}>
                    <Button
                        className={classes.botonIniciarSesion}
                        variant="contained"
                    >Iniciar sesión
                    </Button>
                    </Link>
                    </Grid>
                    &nbsp;
                    <Grid item>
                    <Link to={'/recuperar-contraseña'}>
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