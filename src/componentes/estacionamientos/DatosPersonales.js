import React from 'react';
import Navbar from './../diseño/Navbar.js';
import { List, makeStyles,
Typography, Button, TextField, Grid } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import Footer from '../diseño/Footer.js';
import useInfoUsuario from '../../hooks/useInfoUsuario.js';

const useStyles = makeStyles((theme) => ({
    titulo: {
        fontFamily: "Roboto Condensed, sans-serif",
        textTransform: "uppercase",
        fontSize: 25,
        textAlign: "center"
    },
    subtitulos: {
        fontFamily: "Roboto Condensed, sans-serif",
        fontSize: 18,
        color:"#424242",
    },
    container: {
        marginLeft: "1rem"
    },
    cartaReservas: {
        flexGrow: 1,
        paddingLeft: 20,
        backgroundColor: theme.palette.background.paper,
        boxShadow: "0 2px 3px rgba(0,0,0,0.25), 0 0 3px rgba(0,0,0,0.22)",
        marginLeft: "1rem",
        marginRight: "1rem"
    },
    input: {
        fontFamily: "Roboto Condensed, sans-serif",
        paddingRight: "1rem",
        "& .MuiFormLabel-root.Mui-focused": {
            color: "#4db6ac"
        },
        "& .MuiInput-underline:after": {
            borderBottomColor: "#4db6ac"
        },
    },
    botonModificarDatos: {
        backgroundColor: "#448aff",
        color: "#ffffff",
        fontFamily: "Roboto Condensed, sans-serif",
        textTransform: "uppercase",
        marginTop: "2rem",
        fontSize: 15,
        "&:hover":{
            backgroundColor: "#448aff",
        }
    },
}));

const DatosPersonales = () => {
    const usuarioInfo = useInfoUsuario();
    const classes = useStyles();
    return ( 
        <>  
        <Navbar/>
        <Typography className={classes.titulo}>Mis datos personales</Typography>
        &nbsp;
        <List className={classes.cartaReservas}>
        &nbsp;
            <Grid container spacing={3}>
                <Grid item sm={12} xs={12}>
                <TextField
                className={classes.input}
                label="Nombre Completo"
                variant="standard"
                fullWidth
                autoFocus
                value={usuarioInfo.nombreCompleto}
                />
                </Grid>
                <Grid item sm={12} xs={12} >
                <TextField
                className={classes.input}
                label="N° de teléfono"
                variant="standard"
                value={usuarioInfo.telefono}
                fullWidth
                />
                </Grid>
                <Grid item sm={12} xs={12} >
                <TextField
                className={classes.input}
                label="DNI"
                variant="standard"
                value={usuarioInfo.dni}
                fullWidth
                />
                </Grid>
                <Grid item sm={12} xs={12} >
                <TextField
                className={classes.input}
                label="Nombre de usuario"
                variant="standard"
                value={usuarioInfo.usuario}
                fullWidth
                />
                </Grid>
                <Grid item sm={12} xs={12} >
                <TextField
                className={classes.input}
                label="Correo electrónico"
                variant="standard"
                value={usuarioInfo.email}
                fullWidth
                />
                </Grid>
                <Grid item sm={12} xs={12} >
                <TextField
                className={classes.input}
                label="Contraseña"
                variant="standard"
                type="password"
                fullWidth
                />
                </Grid>
                <Grid item sm={12} xs={12} >
                <TextField
                className={classes.input}
                label="Repetir contraseña"
                variant="standard"
                type="password"
                fullWidth
                />
                </Grid>
            </Grid>
            &nbsp;
            <Button
                endIcon={<CheckIcon/>}
                className= {classes.botonModificarDatos}>Modificar datos
            </Button>
        </List>
        &nbsp;
        <Footer/>
    </>
     );
}
 
export default DatosPersonales;