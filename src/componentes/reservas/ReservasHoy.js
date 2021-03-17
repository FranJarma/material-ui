import React from 'react';
import Footer from './../diseño/Footer.js';
import Navbar from './../diseño/Navbar.js';
import { List, ListItemAvatar, ListItemText, Divider, makeStyles, Typography, ListItem, Avatar } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';

const useStyles = makeStyles((theme) => ({
    titulo: {
        fontFamily: "Roboto Condensed, sans-serif",
        textTransform: "uppercase",
        fontSize: 25
    },
    cartaReservas: {
        flexGrow: 1,
        paddingLeft: 20,
        backgroundColor: theme.palette.background.paper,
        [theme.breakpoints.up('lg')]: {
            marginLeft: "20rem",
            marginRight: "1rem"
        },
        [theme.breakpoints.up('md')]: {
            marginLeft: "20rem",
            marginRight: "1rem"
        },
    },
    tituloReserva: {

    },
    subtituloReserva: {

    },
    imagenReserva: {

    }
}));

const ReservasHoy = () => {
    const classes = useStyles();
    return (
    <main className = {classes.cartaReservas}>
        <Navbar/>
        <Typography className={classes.titulo}>Reservas del día: 16/03/2021</Typography>
        &nbsp;
        <List>
            <ListItem button>
                <ListItemAvatar>
                    <Avatar>
                        <PersonIcon/>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Francisco Alfredo Jarma" secondary="16:00 - 18:20">
                </ListItemText>
            </ListItem>
            <Divider></Divider>
            <ListItem button>
                <ListItemAvatar>
                    <Avatar>
                        <PersonIcon/>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Roberto Gómez Bolaños" secondary="17:00 - 18:20">
                </ListItemText>
            </ListItem>
            <Divider></Divider>
            <ListItem button>
                <ListItemAvatar>
                    <Avatar>
                        <PersonIcon/>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Andrea Gómez" secondary="16:00 - 18:20">
                </ListItemText>
            </ListItem>
            </List>
    </main>
    );
}
 
export default ReservasHoy;