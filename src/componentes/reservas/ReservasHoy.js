import React from 'react';
import Navbar from './../diseño/Navbar.js';
import { List, ListItemAvatar, ListItemText, Divider, makeStyles, Typography, ListItem, Avatar, Button } from '@material-ui/core';
import Buscar from './../diseño/Buscar.js';
import Paginacion from './../diseño/Paginacion.js';

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
        backgroundColor: "#448aff",
        color: "#ffffff",
        float: "right",
        fontFamily: "Roboto Condensed, sans-serif",
        textTransform: "uppercase",
        fontSize: 15,
        "&:hover":{
            backgroundColor: "#448aff",
        }
    },
    botonNoPagado: {
        backgroundColor: "#ff9800",
        color: "#ffffff",
        float: "right",
        fontFamily: "Roboto Condensed, sans-serif",
        textTransform: "uppercase",
        fontSize: 15,
        "&:hover":{
            backgroundColor: "#ff9800",
        }
    },
}));

const ReservasHoy = () => {
    const classes = useStyles();
    return (
        <>  
            <Navbar/>
            <Typography className={classes.titulo}>Reservas del día de hoy</Typography>
            &nbsp;
            <List className = {classes.cartaReservas}>
            <Buscar/>
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
                        <Typography>Lugar: 11</Typography>
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
                        <Typography>Lugar: 16</Typography>
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
                        <Typography>Lugar: 14</Typography>
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
                        <Typography>Lugar: 13</Typography>
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
                        <Typography>Lugar: 17</Typography>
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
                        <Typography>Lugar: 1</Typography>
                        </>}>
                    </ListItemText>
                    <ListItemText>
                        <Button className= {classes.botonNoPagado}>No Pagada</Button>
                    </ListItemText>
                </ListItem>
            </List>
            <Paginacion/>
        </>
    );
}
 
export default ReservasHoy;