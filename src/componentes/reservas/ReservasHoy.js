import React from 'react';
import Navbar from './../diseño/Navbar.js';
import { List, ListItemAvatar, ListItemText, Divider, makeStyles, Typography, ListItem, Avatar, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    titulo: {
        fontFamily: "Roboto Condensed, sans-serif",
        textTransform: "uppercase",
        fontSize: 25,
        textAlign: "center"
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
    botonPagado: {
        backgroundColor: "#14a37f",
        color: "#ffffff",
        float: "right",
        fontFamily: "Roboto Condensed, sans-serif",
        textTransform: "uppercase",
        fontSize: 15,
        "&:hover":{
            backgroundColor: "#14a37f",
        }
    },
    botonNoPagado: {
        backgroundColor: "#fbc02d",
        color: "#ffffff",
        float: "right",
        fontFamily: "Roboto Condensed, sans-serif",
        textTransform: "uppercase",
        fontSize: 15,
        "&:hover":{
            backgroundColor: "#fbc02d",
        }
    },
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
                        F
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Francisco Jarma" className={classes.tituloReserva} secondary ={
                    <>
                    <Typography>Patente: LZY450</Typography>
                    <Typography>Automóvil: Volkswagen Gol Rojo</Typography>
                    <Typography>Horario: 16-17</Typography>
                    <Typography>Precio: $100</Typography>
                    <Typography color="secondary">Penalidad: $15</Typography>
                    </>}>
                </ListItemText>
                <ListItemText>
                    <Button className= {classes.botonPagado}>Pagada</Button>
                </ListItemText>
            </ListItem>
            <Divider></Divider>
            <ListItem button>
                <ListItemAvatar>
                    <Avatar>
                        E
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Estanislao Gonzáles Pérez" secondary ={
                    <>
                    <Typography>Patente: KEA512</Typography>
                    <Typography>Automóvil: Ford KA</Typography>
                    <Typography>Horario: 16-17</Typography>
                    <Typography>Precio: $100</Typography>
                    <Typography color="secondary">Penalidad: $15</Typography>
                    </>}>
                </ListItemText>
                <ListItemText>
                    <Button className= {classes.botonNoPagado}>No pagada</Button>
                </ListItemText>
            </ListItem>
                <Divider></Divider>
            <ListItem button>
                <ListItemAvatar>
                    <Avatar>
                        R
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Roberto Gomez" secondary ={
                    <>
                    <Typography>Patente: KAV412</Typography>
                    <Typography>Automóvil: Volkswagen Gol Blanco</Typography>
                    <Typography>Horario: 16-18</Typography>
                    <Typography>Precio: $200</Typography>
                    <Typography color="secondary">Penalidad: $15</Typography>
                    </>}>
                </ListItemText>
                <ListItemText>
                    <Button className= {classes.botonNoPagado}>No Pagada</Button>
                </ListItemText>
            </ListItem>
            <ListItem button>
                <ListItemAvatar>
                    <Avatar>
                        F
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Francisco Jarma" className={classes.tituloReserva} secondary ={
                    <>
                    <Typography>Patente: LZY450</Typography>
                    <Typography>Automóvil: Volkswagen Gol Rojo</Typography>
                    <Typography>Horario: 16-17</Typography>
                    <Typography>Precio: $100</Typography>
                    <Typography color="primary">Penalidad: $0</Typography>
                    </>}>
                </ListItemText>
                <ListItemText>
                    <Button className= {classes.botonPagado}>Pagada</Button>
                </ListItemText>
            </ListItem>
            <Divider></Divider>
            <ListItem button>
                <ListItemAvatar>
                    <Avatar>
                        E
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Estanislao Gonzáles Pérez" secondary ={
                    <>
                    <Typography>Patente: KEA512</Typography>
                    <Typography>Automóvil: Ford KA</Typography>
                    <Typography>Horario: 16-17</Typography>
                    <Typography>Precio: $100</Typography>
                    <Typography color="primary">Penalidad: $0</Typography>
                    </>}>
                </ListItemText>
                <ListItemText>
                    <Button className= {classes.botonNoPagado}>No pagada</Button>
                </ListItemText>
            </ListItem>
                <Divider></Divider>
            <ListItem button>
                <ListItemAvatar>
                    <Avatar>
                        R
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Roberto Gomez" secondary ={
                    <>
                    <Typography>Patente: KAV412</Typography>
                    <Typography>Automóvil: Volkswagen Gol Blanco</Typography>
                    <Typography>Horario: 16-18</Typography>
                    <Typography>Precio: $200</Typography>
                    <Typography color="primary">Penalidad: $0</Typography>
                    </>}>
                </ListItemText>
                <ListItemText>
                    <Button className= {classes.botonNoPagado}>No Pagada</Button>
                </ListItemText>
            </ListItem>
        </List>
    </main>
    );
}
 
export default ReservasHoy;