import React from 'react';
import { Button, Divider, Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent'
import logo from './../../imagenes/logo.png';
import { Link } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles( theme => ({
    cartaRecuperarContraseña: {
        height: 320,
        width: 450,
        margin: "auto",
        marginTop: "2rem",
        boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)"
    },
    alerta:{
        position: "absolute",
        bottom: 0,
        width: "100%",
        color:"#ffffff",
        backgroundColor: "#795548",
        borderRadius: 0
    },
    cartaEncabezado: {
        backgroundColor: "#4db6ac",
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
    botonRecuperarContraseña: {
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
    botonVolver: {
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

const RecuperarContraseña = () => {
    const classes = useStyles();
    return ( 
    <>
        <div>
            <img src={logo} alt="" className={classes.logo}></img>
        </div>
        <Card className={classes.cartaRecuperarContraseña}>
            <CardContent className={classes.cartaEncabezado}>
                <Typography className={classes.tituloCarta}>Olvidé mi contraseña</Typography>
                <Typography className={classes.subtituloCarta}>Ingrese su correo electrónico para continuar</Typography>
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
                            label="Correo electrónico"
                            autoFocus
                        ></TextField>
                    </Grid>
                    &nbsp;
                    &nbsp;
                    <Grid item>
                    <Button
                        className={classes.botonRecuperarContraseña}
                        variant="contained"
                    >Recuperar contraseña
                    </Button>
                    </Grid>
                    &nbsp;
                    <Grid item>
                    <Link to={'/iniciar-sesion'} style={{textDecoration: 'none'}}>
                    <Button
                        className={classes.botonVolver}
                    >Volver a Login
                    </Button>
                    </Link>
                    </Grid>
                </Grid>
            </form>
        </Card>
        <Alert className={classes.alerta} severity="info" variant="filled">Le enviaremos información a su correo electrónico
        para que pueda recuperar su contraseña</Alert>
    </>
        );
}
 
export default RecuperarContraseña;