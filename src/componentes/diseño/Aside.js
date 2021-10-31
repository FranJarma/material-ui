import React, { useState, useContext } from 'react';
import CommuteIcon from '@material-ui/icons/Commute';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import StoreMallDirectoryIcon from '@material-ui/icons/StoreMallDirectory';
import PersonIcon from '@material-ui/icons/Person';
import {Avatar, Button, Divider, ListItemIcon, makeStyles} from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import DateRangeIcon from '@material-ui/icons/DateRange';
import EventIcon from '@material-ui/icons/Event';
import TodayIcon from '@material-ui/icons/Today';
import SwapVertIcon from '@material-ui/icons/SwapVert';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import GridOnIcon from '@material-ui/icons/GridOn';
import AssignmentIcon from '@material-ui/icons/Assignment';

import { Link, useHistory }  from 'react-router-dom';

import {FirebaseContext} from './../../firebase';
import Toast from './Toast';
import traducirError from './../../firebase/errores';

import * as CAuth from './../../constantes/auth/CAuth';
import SpinnerContext from '../../context/spinner/spinnerContext';
import useInfoUsuario from '../../hooks/useInfoUsuario';
import useInfoEstacionamiento from '../../hooks/useInfoEstacionamiento';

const useStyles = makeStyles(theme => ({
    tituloAside: {
        fontFamily: "Roboto Condensed, sans-serif",
        textTransform: "uppercase",
        fontSize: 18,
        textAlign: "center",
    },
    subtituloAside: {
        fontFamily: "Roboto Condensed, sans-serif",
        fontSize: 16,
        textAlign: "center",
    },
    imagenPerfil: {
        margin: "auto",
        width: 80,
        height: 80,
        display: 'flex',
        borderRadius: 50,
        marginTop: 10
    },
    titulosMenu: {
        fontFamily: "Roboto Condensed, sans-serif",
        fontSize: 18,
        textDecoration: "none",
        color: "#000000"
    },
    subMenu: {
        paddingLeft: theme.spacing(5),
    },
    iconos: {
        color: "#4db6ac",
    },
    datosPersonales: {
        [theme.breakpoints.up('md')]:{
            display: 'none'
        },
    },
    botonCerrarSesionNavbar: {
        [theme.breakpoints.up('md')]:{
            display: 'none'
        },
        backgroundColor: "#ffffff",
        color: "#4db6ac",
        borderColor:"#4db6ac",
        textAlign:'center',
        width: '60%',
        marginLeft: 'auto',
        marginRight: 'auto',
        fontFamily: "Roboto Condensed, sans-serif",
        textTransform: "uppercase",
        fontSize: 15,
        borderRadius: "1rem",
        "&:hover":{
            backgroundColor: "#4db6ac",
            color:"#FFFFFF"
        }
    }
}));

const Aside = () => {
    const classes = useStyles();
    const usuarioInfo = useInfoUsuario();
    const estacionamientoInfo = useInfoEstacionamiento();
    //states para controlar los submenús
    const [subMenuReservas, abrirSubMenuReservas ] = useState(false);

    const handleClickAbrirSubMenuReservas = () => {
        abrirSubMenuMiEstacionamiento(false);
        abrirSubMenuReservas(!subMenuReservas);
    }

    const [subMenuMiEstacionamiento, abrirSubMenuMiEstacionamiento ] = useState(false);

    const handleClickAbrirSubMenuMiEstacionamiento = () => {
        abrirSubMenuReservas(false);
        abrirSubMenuMiEstacionamiento(!subMenuMiEstacionamiento);
    }

    const history = useHistory();

    const {usuario, firebase} = useContext(FirebaseContext);

    const spinnerContext = useContext(SpinnerContext);
    const { mostrarSpinner } = spinnerContext;

    //función para cerrar sesión
    async function cerrarSesion(){
        try {
            await firebase.cerrarSesion();
            mostrarSpinner(CAuth.CERRANDO_SESION);
            history.push('/login-encargados');
        }
        catch (error) {
            Toast(traducirError(error.code))
        }
    }
    const menuPrincipal = (
        <>
            &nbsp;
            {usuario ?
            <div className={classes.datosPersonales}>
            <Typography className={classes.tituloAside}>
                {localStorage.getItem('nombreUsuario')}
            </Typography>
            <Avatar className={classes.imagenPerfil} />
            </div>
            : ''}
            &nbsp;
            {estacionamientoInfo ? 
            <Typography className={classes.subtituloAside}>
                {estacionamientoInfo.nombreCompleto}
            </Typography>
            : "" }
            &nbsp;
            <List>
                {localStorage.getItem('esEncargado') === 'true' ?
                <>
                <ListItem button onClick= { handleClickAbrirSubMenuReservas }>
                    <ListItemIcon>
                        <CommuteIcon className={classes.iconos}/>
                    </ListItemIcon>
                    <ListItemText primary="Reservas">
                    </ListItemText>
                    {subMenuReservas ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
                </ListItem>
                <Collapse in={subMenuReservas} timeout="auto" unmountOnExit>
                    <List disablePadding>
                    <Link to={'/reservas-del-dia'} className={classes.titulosMenu}>
                        <ListItem button className={classes.subMenu}>
                            <ListItemIcon>
                            <TodayIcon className={classes.iconos} />
                            </ListItemIcon>
                            <ListItemText primary="Reservas del día" />
                        </ListItem>
                    </Link>
                    <Link to={'/reservas-calendario'} className={classes.titulosMenu}>
                        <ListItem button className={classes.subMenu}>
                            <ListItemIcon>
                            <DateRangeIcon className={classes.iconos}/>
                            </ListItemIcon>
                            <ListItemText primary="Calendario de reservas" />
                        </ListItem>
                    </Link>
                    <Link to={'/cambiar-fecha'} className={classes.titulosMenu}>
                        <ListItem button className={classes.subMenu}>
                            <ListItemIcon>
                            <SwapVertIcon className={classes.iconos}/>
                            </ListItemIcon>
                            <ListItemText primary="Cambiar fecha de reserva" />
                        </ListItem>
                    </Link>
                    <Link to={'/nuevo-cobro'} className={classes.titulosMenu}>
                        <ListItem button className={classes.subMenu}>
                        <ListItemIcon>
                            <MonetizationOnIcon className={classes.iconos}/>
                        </ListItemIcon>
                        <ListItemText>
                            Ingresar cobro de reservas
                        </ListItemText>
                        </ListItem>
                    </Link>
                    </List>
                </Collapse>
                <ListItem button onClick= { handleClickAbrirSubMenuMiEstacionamiento }>
                    <ListItemIcon>
                        <StoreMallDirectoryIcon className={classes.iconos}/>
                    </ListItemIcon>
                    <ListItemText primary="Mi estacionamiento">
                    </ListItemText>
                    {subMenuMiEstacionamiento ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
                </ListItem>
                <Collapse in={subMenuMiEstacionamiento} timeout="auto" unmountOnExit>
                    <List disablePadding>
                    <Link to={'/mi-estacionamiento'} className={classes.titulosMenu}>
                    <ListItem button className={classes.subMenu}>
                        <ListItemIcon>
                            <AssignmentIcon className={classes.iconos}/>
                        </ListItemIcon>
                        <ListItemText>
                            Datos del estacionamiento
                        </ListItemText>
                    </ListItem>
                    </Link>
                    <Link to={'/lugares'} className={classes.titulosMenu}>
                    <ListItem button className={classes.subMenu}>
                        <ListItemIcon>
                            <GridOnIcon className={classes.iconos}/>
                        </ListItemIcon>
                        <ListItemText>
                            Administrar lugares
                        </ListItemText>
                    </ListItem>
                    </Link>
                    <Link to={'/horarios-y-dias'} className={classes.titulosMenu}>
                    <ListItem button className={classes.subMenu}>
                        <ListItemIcon>
                            <WatchLaterIcon className={classes.iconos}/>
                        </ListItemIcon>
                        <ListItemText>
                            Horarios y días de apertura
                        </ListItemText>
                    </ListItem>
                    </Link>
                    </List>
                </Collapse>
                <Link to={'/mensualidades'} className={classes.titulosMenu}>
                <ListItem button>
                    <ListItemIcon>
                        <EventIcon className={classes.iconos}/>
                    </ListItemIcon>
                    <ListItemText>
                        Mensualidades
                    </ListItemText>
                </ListItem>
                </Link>
                <Link to={'/reportes'} className={classes.titulosMenu}>
                <ListItem button>
                    <ListItemIcon>
                        <EqualizerIcon className={classes.iconos}/>
                    </ListItemIcon>
                    <ListItemText>
                        Reportes
                    </ListItemText>
                </ListItem>
                </Link>
                </>
            : ""}
                <div className={classes.datosPersonales}>
                <Link to={'/datos-personales'} className={classes.titulosMenu}>
                <ListItem button>
                    <ListItemIcon>
                        <PersonIcon className={classes.iconos}/>
                    </ListItemIcon>
                    <ListItemText>
                        Datos personales
                    </ListItemText>
                </ListItem>
                </Link>
                </div>
            </List>
            <Divider></Divider>
            {usuarioInfo.esAdmin ?
            <List>
                <Link to={'/usuarios'} className={classes.titulosMenu}>
                <ListItem button>
                    <ListItemIcon>
                        <PersonIcon className={classes.iconos}/>
                    </ListItemIcon>
                    <ListItemText primary="Administración de usuarios">
                    </ListItemText>
                </ListItem>
                </Link>
                <Link to={'/estacionamientos'} className={classes.titulosMenu}>
                    <ListItem button>
                        <ListItemIcon>
                            <StoreMallDirectoryIcon className={classes.iconos}/>
                        </ListItemIcon>
                        <ListItemText primary="Administración de playas de estacionamiento">
                        </ListItemText>
                    </ListItem>
                </Link>
            </List>
            : ""}
            <Divider></Divider>
            &nbsp;
            <Button
            startIcon={<ExitToAppIcon/>}
            onClick={cerrarSesion}
            variant="outlined" className={classes.botonCerrarSesionNavbar}>{CAuth.CERRAR_SESION}
            </Button>
        </>
    );
    return ( menuPrincipal );
}
 
export default Aside;