import React, {useState} from 'react';
import { Typography, Button, Card, Grid, CardActionArea, CardContent, Avatar, Chip
 } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import {useStyles} from './Styles';
import * as CEstacionamientos from './../../constantes/estacionamientos/CEstacionamientos';
import AdministrarEstacionamiento from './AdministrarEstacionamiento';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import CallIcon from '@material-ui/icons/Call';
import StarIcon from '@material-ui/icons/Star';
import NotListedLocationIcon from '@material-ui/icons/NotListedLocation';
const EstacionamientoCliente = ({estacionamiento}) => {
    //states para los modals
    const [modalDarDeBaja, setAbrirModalDarDeBaja] = useState(false);
    const handleClickAbrirModalDarDeBaja = () => {
        setAbrirModalDarDeBaja(true);
    };
    const handleClickCerrarModalDarDeBaja = () => {
        setAbrirModalDarDeBaja(false);
    };
    const [modalModificar, setAbrirModalModificar] = useState(false);
    const handleClickAbrirModalModificar= () => {
        setAbrirModalModificar(true);
    };
    const handleClickCerrarModalModificar = () => {
        setAbrirModalModificar(false);
    };
    const classes = useStyles();
    return ( 
        <>
        <Grid container>
            <Grid item lg={3} xs={12}>
                <Card className={classes.cartaEstacionamientosCliente}>
                        <img className={classes.imagen} src={estacionamiento.urlImagen}></img>
                        <Typography style={{textAlign: 'center'}} className={classes.nombreCompleto}>{estacionamiento.nombreCompleto}</Typography>
                        <div style={{display: 'flex', textAlign: 'center'}}><StarIcon style={{color:"#4db6ac"}}/><Typography style={{textAlign:'center'}} className={classes.campos}>{estacionamiento.valoracion}</Typography></div>
                        <div style={{display: 'flex', textAlign: 'center'}}><LocationOnIcon style={{color:"#4db6ac"}}/><Typography style={{textAlign:'center'}} className={classes.campos}>{estacionamiento.ubicacion.provincia} | {estacionamiento.ubicacion.direccion}</Typography></div>
                        <div style={{display: 'flex', textAlign: 'center'}}><CallIcon style={{color:"#4db6ac"}}/><Typography style={{textAlign:'center'}} className={classes.campos}>{estacionamiento.telefono}</Typography></div>
                        <div style={{textAlign: 'center'}}><Chip style={{marginTop: '1rem'}} label={estacionamiento.descripcion}></Chip></div>
                        <CardContent>
                            <Button
                            className={classes.botonVerUbicacion}>
                            <NotListedLocationIcon/>
                            Ver ubicación
                            </Button>
                            <Button
                            className={classes.botonReservar}>
                            Reservar acá
                            </Button>
                        </CardContent>
                </Card>
            </Grid>
        </Grid>
        </>
        );
}
 
export default EstacionamientoCliente;