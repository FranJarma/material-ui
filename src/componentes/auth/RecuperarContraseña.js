import React from 'react';
import { Button, Divider, Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent'
import logo from './../../imagenes/logo.png';
import { Link } from 'react-router-dom';

const useStyles = makeStyles( theme => ({
    cartaRecuperarContraseña: {
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
    botonRecuperarContraseña: {
        fontFamily: "Roboto Condensed, sans-serif",
        fontSize: 15,
        backgroundColor: "#14a37f",
        marginLeft: 20,
        width: "91%",
        "&:hover":{
            backgroundColor: "#14a37f"
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

const RecuperarContraseña = () => {
    const classes = useStyles();
    return ( 
    <>
        <div>
            <img src={logo} alt="" className={classes.logo}></img>
        </div>
        <Card className={classes.cartaRecuperarContraseña}>
            <CardContent>
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
                    <Link to={'/iniciar-sesion'}>
                    <Button
                        className={classes.botonVolver}
                    >Volver a Login
                    </Button>
                    </Link>
                    </Grid>
                </Grid>
            </form>
            <CardContent>
                <Typography className={classes.subtituloCarta}>Le enviaremos información a su correo electrónico
                para que pueda recuperar su contraseña</Typography>
            </CardContent>
        </Card>
    </>
        );
}
 
export default RecuperarContraseña;