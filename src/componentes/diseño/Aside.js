import React from 'react';
import CommuteIcon from '@material-ui/icons/Commute';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import StoreMallDirectoryIcon from '@material-ui/icons/StoreMallDirectory';
import PersonIcon from '@material-ui/icons/Person';
import {Divider, ListItemIcon, makeStyles} from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

const esAdmin = false;

const useStyles = makeStyles(theme => ({
    tituloAside: {
        fontFamily: "Roboto Condensed, sans-serif",
        textTransform: "uppercase",
        fontSize: 20,
        textAlign: "center"
    },
    imagenPerfil: {
        margin: "auto",
        width: 120,
        height: 120
    },
    titulosMenu: {
        fontFamily: "Roboto Condensed, sans-serif",
        fontSize: 18
    },
}));

const Aside = () => {
    const classes = useStyles();
    //para cargar los menús del encargado
    const menuEncargado = [
        { titulo: "Reservas del día", icono: CommuteIcon },
        { titulo: "Ingresar pago", icono: MonetizationOnIcon },
        { titulo: "Reportes", icono: EqualizerIcon },
        { titulo: "Datos del estacionamiento y tarifas", icono: StoreMallDirectoryIcon },
        { titulo: "Datos del encargado", icono: PersonIcon }
    ]
    //para cargar los menús del admin
    const menuAdmin = [
        { titulo: "Administración de usuarios", icono: PersonIcon },
        { titulo: "Administración de playas de estacionamiento", icono: StoreMallDirectoryIcon }
    ]
    const menuPrincipal = (
        <div>
            &nbsp;
            <Typography className={classes.tituloAside}>
                {!esAdmin ? "Playa de Estacionamiento del Convento" : "Administrador"}
            </Typography>
            &nbsp;
            <Divider></Divider>
            {!esAdmin ?
            <List>
            {menuEncargado.map((item) => (
                <ListItem button>
                    <ListItemIcon>
                        {React.createElement(item.icono)}
                    </ListItemIcon>
                    <ListItemText classes={{primary:classes.titulosMenu}}>
                        {`${item.titulo}`}
                    </ListItemText>
                </ListItem>
            ))}
            </List>
            :<List>
            {menuAdmin.map((item) => (
                <ListItem button>
                    <ListItemIcon>
                        {React.createElement(item.icono)}
                    </ListItemIcon>
                    <ListItemText primary={`${item.titulo}`} />
                </ListItem>
            ))}
            </List>
            }
        </div>
    );
    return ( menuPrincipal );
}
 
export default Aside;