import React from 'react';
import Navbar from './../diseño/Navbar.js';
import { List, ListItemAvatar, ListItemText, Divider, makeStyles, Typography, ListItem, Avatar, Button } from '@material-ui/core';
import Buscar from './../diseño/Buscar.js';
import Paginacion from './../diseño/Paginacion.js';
import CheckIcon from '@material-ui/icons/Check';
import DoneAllIcon from '@material-ui/icons/DoneAll';
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
    botonValidarReserva: {
        backgroundColor: "#448aff",
        color: "#ffffff",
        float: "right",
        fontFamily: "Roboto Condensed, sans-serif",
        textTransform: "uppercase",
        marginLeft: "auto",
        alignContent: "auto",
        fontSize: 15,
        "&:hover":{
            backgroundColor: "#448aff",
        }
    },
    botonConcluirReserva: {
        backgroundColor: "#43a047",
        color: "#ffffff",
        float: "right",
        fontFamily: "Roboto Condensed, sans-serif",
        textTransform: "uppercase",
        marginLeft: "auto",
        alignContent: "auto",
        fontSize: 15,
        "&:hover":{
            backgroundColor: "#43a047",
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
                        <Typography>Vehículo: Volkswagen Gol</Typography>
                        <Typography>Precio: $100</Typography>
                        <Typography>Hora de ingreso: -</Typography>
                        <Typography>Lugar: 11</Typography>
                        </>}>
                    </ListItemText>
                    <ListItemText>
                        <Button
                        endIcon={<CheckIcon/>}
                        className= {classes.botonValidarReserva}>Validar</Button>
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
                        <Typography>Vehículo: Ford KA</Typography>
                        <Typography>Precio: $100</Typography>
                        <Typography>Hora de ingreso: -</Typography>
                        <Typography>Lugar: 16</Typography>
                        </>}>
                    </ListItemText>
                    <ListItemText>
                        <Button
                        endIcon={<CheckIcon/>}
                        className= {classes.botonValidarReserva}>Validar</Button>
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
                        <Typography>Vehículo: Volkswagen Gol</Typography>
                        <Typography>Horario: 16-18</Typography>
                        <Typography>Precio: $200</Typography>
                        <Typography>Hora de ingreso: -</Typography>
                        <Typography>Lugar: 14</Typography>
                        </>}>
                    </ListItemText>
                    <ListItemText>
                        <Button
                        endIcon={<CheckIcon/>}
                        className= {classes.botonValidarReserva}>Validar</Button>
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
                        <Typography>Vehículo: Volkswagen Gol</Typography>
                        <Typography>Precio: $100</Typography>
                        <Typography>Hora de ingreso: 19:26</Typography>
                        <Typography>Lugar: 13</Typography>
                        </>}>
                    </ListItemText>
                    <ListItemText>
                    <Button
                        endIcon={<DoneAllIcon/>}
                        className= {classes.botonConcluirReserva}>Concluir</Button>
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
                        <Typography>Vehículo: Ford KA</Typography>
                        <Typography>Precio: $100</Typography>
                        <Typography>Hora de ingreso: 18:23</Typography>
                        <Typography>Lugar: 17</Typography>
                        </>}>
                    </ListItemText>
                    <ListItemText>
                        <Button
                        endIcon={<DoneAllIcon/>}
                        className= {classes.botonConcluirReserva}>Concluir</Button>
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
                        <Typography>Vehículo: Volkswagen Gol</Typography>
                        <Typography>Precio: $200</Typography>
                        <Typography>Hora de ingreso: 16:50</Typography>
                        <Typography>Lugar: 1</Typography>
                        </>}>
                    </ListItemText>
                    <ListItemText>
                        <Button
                        endIcon={<DoneAllIcon/>}
                        className= {classes.botonConcluirReserva}>Concluir</Button>
                    </ListItemText>
                </ListItem>
            </List>
            <Paginacion/>
        </>
    );
}
 
export default ReservasHoy;