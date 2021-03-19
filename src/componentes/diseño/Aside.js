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
import InfoIcon from '@material-ui/icons/Info';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import DateRangeIcon from '@material-ui/icons/DateRange';
import TodayIcon from '@material-ui/icons/Today';
import SwapVertIcon from '@material-ui/icons/SwapVert';
import StarIcon from '@material-ui/icons/Star';
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
    },
    nested: {
        paddingLeft: theme.spacing(5),
    },
    botonCerrarSesionNavbar: {
        backgroundColor: "#4db6ac",
        color: "#FFFFFF",
        textAlign:'center',
        width: '50%',
        marginLeft: 'auto',
        marginRight: 'auto',
        fontFamily: "Roboto Condensed, sans-serif",
        textTransform: "uppercase",
        fontSize: 15,
        borderRadius: "1rem",
        "&:hover":{
            backgroundColor: "#4db6ac",
        }
    }
}));

const Aside = () => {
    const classes = useStyles();
    //state para controlar los submenús
    const [subMenu, abrirSubMenu ] = useState(false);

    const handleClickSubMenu = () => {
        abrirSubMenu(!subMenu);
    }
    
    const menuPrincipal = (
        <>
            &nbsp;
            <Typography className={classes.tituloAside}>
                {!esAdmin ? "Playa de Estacionamiento del Convento" : "Administrador"}
            </Typography>
            &nbsp;
            <Divider></Divider>
            {!esAdmin ?
            <List>
                <ListItem button onClick= { handleClickSubMenu }>
                    <ListItemIcon>
                        <CommuteIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Reservas">
                    </ListItemText>
                    {subMenu ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
                </ListItem>
                <Collapse in={subMenu} timeout="auto" unmountOnExit>
                    <List disablePadding>
                    <Link to={'/reservas-del-dia'}>
                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                            <TodayIcon  />
                            </ListItemIcon>
                            <ListItemText primary="Reservas del día" />
                        </ListItem>
                    </Link>
                    <ListItem button className={classes.nested}>
                        <ListItemIcon>
                        <DateRangeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Calendario de reservas" />
                    </ListItem>
                    <ListItem button className={classes.nested}>
                        <ListItemIcon>
                        <SwapVertIcon />
                        </ListItemIcon>
                        <ListItemText primary="Cambiar fecha de reserva" />
                    </ListItem>
                    </List>
                </Collapse>
                <ListItem button>
                    <ListItemIcon>
                        <MonetizationOnIcon/>
                    </ListItemIcon>
                    <ListItemText>
                        Ingresar nuevo pago
                    </ListItemText>
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <StoreMallDirectoryIcon/>
                    </ListItemIcon>
                    <ListItemText>
                        Datos del estacionamiento y tarifas
                    </ListItemText>
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <StarIcon/>
                    </ListItemIcon>
                    <ListItemText>
                        Comentarios y valoraciones
                    </ListItemText>
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <EqualizerIcon/>
                    </ListItemIcon>
                    <ListItemText>
                        Reportes
                    </ListItemText>
                </ListItem>
                &nbsp;
                <Divider></Divider>
                <ListItem button>
                    <ListItemIcon>
                        <PersonIcon/>
                    </ListItemIcon>
                    <ListItemText>
                        Datos del encargado
                    </ListItemText>
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <InfoIcon/>
                    </ListItemIcon>
                    <ListItemText>
                        Acerca
                    </ListItemText>
                </ListItem>
            </List>
            :<List>
                <ListItem button onClick={handleClickSubMenu}>
                    <ListItemIcon>
                        <PersonIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Administración de usuarios">
                    </ListItemText>
                </ListItem>
                <ListItem button onClick={handleClickSubMenu}>
                    <ListItemIcon>
                        <StoreMallDirectoryIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Administración de playas de estacionamiento">
                    </ListItemText>
                </ListItem>
                <Divider></Divider>
                <ListItem button>
                    <ListItemIcon>
                        <InfoIcon/>
                    </ListItemIcon>
                    <ListItemText>
                        Acerca
                    </ListItemText>
                </ListItem>

            </List>

            }
            <Divider></Divider>
            &nbsp;
            <Button className={classes.botonCerrarSesionNavbar}>Cerrar Sesión</Button>
        </>
    );
    return ( menuPrincipal );
}
 
export default Aside;