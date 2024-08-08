import React, {useState, useContext} from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import logo from "./../../imagenes/logo.png";
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { Button, Dialog, DialogContent, Tabs, Tab } from '@material-ui/core';
import LoginCliente from '../usuarios/LoginCliente';
import RegistrarCliente from '../usuarios/RegistrarCliente';
import OlvideContraseñaCliente from '../usuarios/OlvideContraseñaCliente';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import * as CAuth from './../../constantes/auth/CAuth';
import SpinnerContext from '../../context/spinner/spinnerContext';
import {FirebaseContext} from './../../firebase';
import Toast from './Toast';
import traducirError from './../../firebase/errores';

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
        textDecoration: 'none',
        color: "#FFFFFF",
        borderColor:"#4db6ac",
        fontFamily: "Roboto Condensed, sans-serif",
        textTransform: "uppercase",
        fontSize: 12,
        borderRadius: "0.5rem",
        "&:hover":{
            backgroundColor: "#4db6ac",
        },
        padding: 0,
        marginTop: '1rem',
        marginBottom: '1rem'
    },
    linkEncargados: {
        fontFamily: "Roboto Condensed",
        fontSize: 14,
        textDecoration: "none",
        "&:hover":{
            borderBottom: "2px solid #4db6ac",
        },
        color: "#000000",
        margin: "1rem",
        [theme.breakpoints.down('sm')]: {
            fontSize: 12,
            textAlign: 'center',
        }
    },
    tabs: {
        backgroundColor: "#FFFFFF",
        color:"#4db6ac",
        width: "100%"
    },
    tab: {
        fontFamily: 'Roboto Condensed',
        fontHeight: 'bold',
        fontSize: 14,
        [theme.breakpoints.only('xs')]: {
            fontSize: 12
        }
    },
}));

    const NavbarCliente = () => {
        const {firebase} = useContext(FirebaseContext);
        const spinnerContext = useContext(SpinnerContext);
        const {  mostrarSpinner } = spinnerContext;
        const classes = useStyles();
        const [activo, setActivo] = useState(false);
        const [modal, setModal] = useState(false);
        const [tab, setTab] = useState(0);
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
        const abrirModalIniciarSesion = () => {
            setModal(true);
        }
        const cerrarModalIniciarSesion = () => {
            setModal(false);
        }
        const handleChangeTab = (event, nuevoTab) => {
            setTab(nuevoTab);
        };
        //función para cerrar sesión
        async function cerrarSesion(){
            try {
                await firebase.cerrarSesion();
                mostrarSpinner(CAuth.CERRANDO_SESION);
            }
            catch (error) {
                Toast(traducirError(error.code))
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
                    to="/encontrar-estacionamiento">
                    Encontrar estacionamientos
                    </Link>
                    <Link
                    onClick={cambiarLink}
                    className={classes.linkEncargados}
                    to="/mis-reservas">
                    Mis reservas
                    </Link>
                    <Link
                    onClick={cambiarLink}
                    className={classes.linkEncargados}
                    to="/login-encargados">
                    Soy encargado
                    </Link>
                    {localStorage.getItem('usuario') === '' || localStorage.getItem('usuario') === undefined || localStorage.getItem('usuario') === null ?
                    <Button
                    onClick={abrirModalIniciarSesion}
                    className={classes.botonCerrarSesionNavbar}>
                    Ingresar
                    </Button>
                    : 
                    <Button
                    onClick={cerrarSesion}
                    className={classes.botonCerrarSesionNavbar}>
                    Salir
                    </Button>
                    }
                </div>
                <Dialog
                style={{zIndex: 1}}
                fullWidth
                maxWidth={'sm'}
                open={modal}
                onClose={cerrarModalIniciarSesion}>
                    <DialogContent>
                        <Tabs
                            className={classes.tabs}
                            TabIndicatorProps={{style: {background:'#4db6ac'}}}
                            variant="fullWidth"
                            value={tab}
                            onChange={handleChangeTab}>
                            <Tab className={classes.tab} icon={<AccountCircleIcon/>} label="Iniciar sesión"></Tab>
                            <Tab className={classes.tab} icon={<PersonAddIcon/>} label="Registrarme"></Tab>
                            <Tab className={classes.tab} icon={<VpnKeyIcon/>} label="Olvidé contraseña"></Tab>
                        </Tabs>
                        {tab === 0 ?
                        <LoginCliente cerrarModal = {cerrarModalIniciarSesion}/>
                        : tab === 1 ? <RegistrarCliente cerrarModal = {cerrarModalIniciarSesion}/> 
                        : <OlvideContraseñaCliente cerrarModal = {cerrarModalIniciarSesion}/>}
                    </DialogContent>
                </Dialog>
                </Toolbar>
            </AppBar>
            <div className={classes.contenido}>
                <div className={classes.toolbar} />
            </div>
            </div>
        );
        }
     
    export default NavbarCliente;