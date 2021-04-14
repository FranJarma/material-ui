import React, { useState } from 'react';
import CommuteIcon from '@material-ui/icons/Commute';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import StoreMallDirectoryIcon from '@material-ui/icons/StoreMallDirectory';
import PersonIcon from '@material-ui/icons/Person';
import {Button, Divider, ListItemIcon, makeStyles} from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import DateRangeIcon from '@material-ui/icons/DateRange';
import TodayIcon from '@material-ui/icons/Today';
import SwapVertIcon from '@material-ui/icons/SwapVert';
import StarIcon from '@material-ui/icons/Star';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import GridOnIcon from '@material-ui/icons/GridOn';
import { Link }  from 'react-router-dom';

const esAdmin = false;

const useStyles = makeStyles(theme => ({
    tituloAside: {
        fontFamily: "Roboto Condensed, sans-serif",
        textTransform: "uppercase",
        fontSize: 15,
        textAlign: "center",
    },
    imagenPerfil: {
        margin: "auto",
        width: 120,
        height: 120
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
    botonCerrarSesionNavbar: {
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
    //state para controlar los submenús
    const [subMenuReservas, abrirSubMenuReservas ] = useState(false);

    const handleClickAbrirSubMenuReservas = () => {
        abrirSubMenuReservas(!subMenuReservas);
    }

    const [subMenuMiEstacionamiento, abrirSubMenuMiEstacionamiento ] = useState(false);

    const handleClickAbrirSubMenuMiEstacionamiento = () => {
        abrirSubMenuMiEstacionamiento(!subMenuMiEstacionamiento);
    }

    
    
    const menuPrincipal = (
        <>
            &nbsp;
            <Typography className={classes.tituloAside}>
                {!esAdmin ? "Playa de Estacionamiento del Convento" : "Administrador"}
            </Typography>
            &nbsp;
            <Divider></Divider>
            {esAdmin ?
            <List>
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
                            <StoreMallDirectoryIcon className={classes.iconos}/>
                        </ListItemIcon>
                        <ListItemText>
                            Datos del estacionamiento
                        </ListItemText>
                    </ListItem>
                    </Link>
                    <Link to={'/tarifas'} className={classes.titulosMenu}>
                    <ListItem button className={classes.subMenu}>
                        <ListItemIcon>
                            <AttachMoneyIcon className={classes.iconos}/>
                        </ListItemIcon>
                        <ListItemText>
                        Vehículos y tarifas
                        </ListItemText>
                    </ListItem>
                    </Link>
                    <Link to={'/valoraciones'} className={classes.titulosMenu}>
                    <ListItem button className={classes.subMenu}>
                        <ListItemIcon>
                            <StarIcon className={classes.iconos}/>
                        </ListItemIcon>
                        <ListItemText>
                            Comentarios y valoraciones
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
                    </List>
                </Collapse>
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
                &nbsp;
                <Divider></Divider>
                <Link to={'/datos-personales'} className={classes.titulosMenu}>
                <ListItem button>
                    <ListItemIcon>
                        <PersonIcon className={classes.iconos}/>
                    </ListItemIcon>
                    <ListItemText>
                        Datos del encargado
                    </ListItemText>
                </ListItem>
                </Link>
            </List>
            :<List>
                <Link to={'/encargados'} className={classes.titulosMenu}>
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

            }
            <Divider></Divider>
            &nbsp;
            <Link
                to={'/'}
                style={{textDecoration: 'none', textAlign: 'center'}}
            >
            <Button
            startIcon={<ExitToAppIcon/>}
            variant="outlined" className={classes.botonCerrarSesionNavbar}>Cerrar Sesión</Button>
            </Link>
        </>
    );
    return ( menuPrincipal );
}
 
export default Aside;