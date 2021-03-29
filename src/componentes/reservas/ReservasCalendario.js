import React, {useState} from 'react';
import Navbar from './../diseño/Navbar.js';
import { List, ListItemAvatar, ListItemText, Divider, makeStyles,
Typography, ListItem, Avatar, Button } from '@material-ui/core';
import Buscar from './../diseño/Buscar.js';
import Alert from '@material-ui/lab/Alert';
import Paginacion from './../diseño/Paginacion.js';
import {
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Footer from '../diseño/Footer.js';


const useStyles = makeStyles((theme) => ({
    titulo: {
        fontFamily: "Roboto Condensed, sans-serif",
        textTransform: "uppercase",
        fontSize: 25,
        textAlign: "center"
    },
    container: {
        [theme.breakpoints.up('lg')]: {
            marginLeft: "20rem"
        },
    },
    inputFecha: {
        width: "20rem",
        fontFamily: "Roboto Condensed, sans-serif",
        height:"3rem",
        [theme.breakpoints.down('md')]:{
            marginLeft: "2rem"
        },
        "& .MuiFormLabel-root.Mui-focused": {
            color: "#4db6ac"
        },
        "& .MuiInput-underline:after": {
            borderBottomColor: "#4db6ac"
        },
    },
    cartaReservas: {
        flexGrow: 1,
        paddingLeft: 20,
        backgroundColor: theme.palette.background.paper,
        boxShadow: "0 2px 3px rgba(0,0,0,0.25), 0 0 3px rgba(0,0,0,0.22)",
        [theme.breakpoints.up('lg')]: {
            marginLeft: "20rem",
            marginRight: "1rem"
        },
        [theme.breakpoints.up('md')]: {
            marginLeft: "20rem",
            marginRight: "1rem"
        },
    },
    botonConsultar: {
        backgroundColor: "#4db6ac",
        color: "#ffffff",
        fontFamily: "Roboto Condensed, sans-serif",
        textTransform: "uppercase",
        marginLeft: "0.5rem",
        fontSize: 15,
        marginTop: "0.7rem",
        "&:hover":{
            backgroundColor: "#4db6ac",
        }
    },
    alerta:{
        position: "relative",
        [theme.breakpoints.up('lg')]: {
            marginLeft: "20rem",
            marginRight: "1rem"
        },
        [theme.breakpoints.down('md')]: {
            marginLeft: "1rem",
            marginRight: "1rem"
        },
        borderRadius: 0
    },
}));

const ReservasCalendario = () => {
    const [fechaSeleccionada, handleCambiarFecha] = useState(new Date());
    const classes = useStyles();
    return (
        <>  
            <Navbar/>
            <Typography className={classes.titulo}>Calendario de reservas</Typography>
            &nbsp;
            <Alert className={classes.alerta} severity="info" variant="filled">En esta pantalla usted podrá ver todas aquellas reservas hechas en una fecha determinada
            por usuarios registrados.
            </Alert>
            &nbsp;
            <form className={classes.container}>
            <KeyboardDatePicker
                className={classes.inputFecha}
                id="date-picker-dialog"
                label="Por favor seleccione una fecha"
                format="dd/MM/yyyy"
                disableFuture
                value={fechaSeleccionada}
                onChange={handleCambiarFecha}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
            />
        <Button className= {classes.botonConsultar}>Consultar</Button>
            </form>
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
                        <Typography>Hora de ingreso: -</Typography>
                        <Typography>Lugar: 13</Typography>
                        </>}>
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
                        <Typography>Lugar: 17</Typography>
                        </>}>
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
                        <Typography>Lugar: 1</Typography>
                        </>}>
                    </ListItemText>
                </ListItem>
            </List>
            <Paginacion/>
            <Footer/>
        </>
    );
}
 
export default ReservasCalendario;