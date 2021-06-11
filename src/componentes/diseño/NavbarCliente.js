import React, {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import logo from "./../../imagenes/logo.png";
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";

const anchoNavbarPx = 300;

const useStyles = makeStyles(theme => ({
    appBar: {
        zIndex: 1,
        backgroundColor: "#EEEEEE"
    },
    toolbar: theme.mixins.toolbar,
    root: {
        display: 'flex',
    },
    menu: {
        [theme.breakpoints.up('sm')]: {
        width: anchoNavbarPx,
        flexShrink: 0,
    },
    },
    menuBoton: {
        marginRight: theme.spacing(2),
        color: "#ffffff"
    },
    contenidoMenu: {
        width: anchoNavbarPx,
    },
    contenido: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    logo: {
        cursor: 'pointer',
        [theme.breakpoints.down('xs')]:{
            display: "none"
        },
        [theme.breakpoints.up('sm')]:{
            width: 180,
            marginTop:"0.5rem",
            paddingRight: "1.5rem",
        },
        [theme.breakpoints.up('lg')]:{
            width: 200,
            marginTop:"0.5rem"
        },
    },
    cerrarMenuBoton: {
        marginRight: 'auto',
        color: "#000000"
    },
    botonCerrarSesionNavbar: {
        backgroundColor: "#4db6ac",
        color: "#FFFFFF",
        borderColor:"#4db6ac",
        fontFamily: "Roboto Condensed, sans-serif",
        textTransform: "uppercase",
        fontSize: 15,
        borderRadius: "0.5rem",
        "&:hover":{
            backgroundColor: "#FFFFFF",
            color:"#4db6ac"
        }
    },
    linkEncargados: {
        fontFamily: "sans-serif",
        fontSize: 18,
        textDecoration: "none",
        "&:hover":{
            color: "#4db6ac"
        },
        color: "#000000",
        margin: "0.5rem",
    }
}));

    const NavbarCliente = () => {
        const classes = useStyles();
        const [activo, setActivo] = useState(false);
        let history = useHistory();
        const volverAtras = () => {
            //solo permitir volver atrás si no está en la raiz
            if(history.location.pathname !== '/')
                history.goBack();
        }
        const cambiarLink = () => {
            if (activo) {
                setActivo(false);
            }
            else {
                setActivo(true);
            }
        }
        return (
            <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                <img src={logo} alt="" className={classes.logo} onClick={volverAtras} />
                <div style={{display: "flex", marginLeft: "auto"}}>
                    <Link
                    onClick={cambiarLink}
                    className={classes.linkEncargados}
                    to="/">
                    Inicio
                    </Link>
                    <Link
                    onClick={cambiarLink}
                    className={classes.linkEncargados}
                    to="/encontrar-estacionamiento">
                    Quiero reservar
                    </Link>
                    <Link
                    onClick={cambiarLink}
                    className={classes.linkEncargados}
                    to="/login-encargados">
                    Acceso encargados
                    </Link>
                </div>
                </Toolbar>
            </AppBar>
            <div className={classes.contenido}>
                <div className={classes.toolbar} />
            </div>
            </div>
        );
        }
     
    export default NavbarCliente;