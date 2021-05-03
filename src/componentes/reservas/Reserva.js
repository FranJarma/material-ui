import React, { useState, useContext } from 'react';
import { makeStyles, Typography, Avatar, Button, Card, CardContent, Grid } from '@material-ui/core';
import {
    TimePicker,
  } from '@material-ui/pickers';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CheckIcon from '@material-ui/icons/Check';
import UpdateIcon from '@material-ui/icons/Update';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import CardActionArea from '@material-ui/core/CardActionArea';
import * as CGeneral from './../../constantes/general/CGeneral';
import * as CReservas from './../../constantes/reservas/CReservas';
import { FirebaseContext } from '../../firebase';
import swal from './../diseño/Swal';

const useStyles = makeStyles((theme) => ({
    cartaReservas: {
        flexGrow: 1,
        marginBottom: "1rem",
        boxShadow: "0 2px 3px rgba(0,0,0,0.25), 0 0 3px rgba(0,0,0,0.22)",
        backgroundColor: theme.palette.background.paper,
        marginLeft: "1rem",
        marginRight: "1rem"
    },
    inputHoraIngreso: {
        fontFamily: "Roboto Condensed, sans-serif",
        "& .MuiFormLabel-root.Mui-focused": {
            color: "#448aff"
        },
        "& .MuiInput-underline:after": {
            borderBottomColor: "#448aff"
        },
    },
    inputHoraSalida: {
        fontFamily: "Roboto Condensed, sans-serif",
        "& .MuiFormLabel-root.Mui-focused": {
            color: "#43a047"
        },
        "& .MuiInput-underline:after": {
            borderBottomColor: "#43a047"
        },
    },
    botonValidarReserva: {
        backgroundColor: "#448aff",
        color: "#ffffff",
        marginLeft: "5rem",
        marginTop: "1rem",
        textAlign: "center",
        fontFamily: "Roboto Condensed, sans-serif",
        textTransform: "uppercase",
        fontSize: 15,
        "&:hover":{
            backgroundColor: "#448aff",
        }
    },
    botonCancelar: {
        color: "#000000",
        fontFamily: "Roboto Condensed, sans-serif",
        textTransform: "uppercase",
        marginTop: "1rem",
        marginLeft: "auto",
        alignContent: "auto"
    },
    botonConcluirReserva: {
        backgroundColor: "#43a047",
        color: "#ffffff",
        fontFamily: "Roboto Condensed, sans-serif",
        textTransform: "uppercase",
        marginLeft: "5rem",
        marginTop: "1rem",
        fontSize: 15,
        "&:hover":{
            backgroundColor: "#43a047",
        }
    },
    nombreCompleto: {
        fontFamily: "Roboto Condensed, sans-serif",
        color: "#448aff",
        fontSize: 18,
        textTransform: "uppercase",
        fontWeight: "bold",
        marginLeft: "1rem"
    },
    camposTitulos: {
        fontFamily: "Roboto Condensed, sans-serif",
        color: "#9e9e9e",
        marginLeft: "5rem",
        fontWeight: "bold",
        padding: "0.1rem",
        fontSize: 16,
    },
    campos: {
        fontFamily: "Roboto Condensed, sans-serif",
        color: "#9e9e9e",
        marginLeft: "0.5rem",
        fontSize: 15,
        display: "flex",
        flexWrap: "wrap"
    },
    avatar: {
        width: "4rem",
        height: "4rem"
    },
    icono: {
        color: "#9e9e9e",
        marginLeft: "5rem",
        width: "1rem",
        height: "1rem"
    }
}));

const Reserva = ({reserva}) => {
    const classes = useStyles();
    //state para la hora de ingreso y salida
    const [horaIngreso, setearHoraIngreso] = useState(new Date());
    const handleCambiarHoraIngreso = (horaIngreso) => {
        setearHoraIngreso(horaIngreso);
    };
    const [horaSalida, setearHoraSalida] = useState(new Date());
    const handleCambiarHoraSalida = (horaSalida) => {
        setearHoraSalida(horaSalida);
    };
    //states para validar y concluir reservas
    const [abrirModalValidar, setAbrirModalValidar] = useState(false);
    const handleClickAbrirModalValidar = () => {
        setAbrirModalValidar(true);
    };
    const handleClickCerrarModalValidar = () => {
        setAbrirModalValidar(false);
    };
    const [abrirModalConcluir, setAbrirModalConcluir] = useState(false);
    const handleClickAbrirModalConcluir = () => {
        setAbrirModalConcluir(true);
    };
    const handleClickCerrarModalConcluir = () => {
        setAbrirModalConcluir(false);
    };
    const {firebase} = useContext(FirebaseContext);
    //funciones de firebase
    const validarReserva = (id) => {
        try {
            firebase.db.collection('reservas').doc(id).update({
                horaIngreso: horaIngreso.toTimeString().substr(0,5),
                estado: `${CReservas.VALIDADA}`
            });
            swal(CGeneral.OPERACION_COMPLETADA, CReservas.LA_RESERVA_HA_SIDO_VALIDADA);
            setAbrirModalValidar(false);
        } catch (error) {
            console.log(error);
        }
    }

    const concluirReserva = (id) => {
        try {
            firebase.db.collection('reservas').doc(id).update({
                horaSalida: horaSalida.toTimeString().substr(0,5),
                estado: `${CReservas.CONCLUIDA}`
            //CUANDO EXISTE LA COLECCIÓN LUGARES, HABRÍA QUE DESOCUPARLO
            });
            swal(CGeneral.OPERACION_COMPLETADA, CReservas.LA_RESERVA_HA_SIDO_CONCLUIDA);
            setAbrirModalConcluir(false);
        } catch(error){
            console.log(error);
        }
    }
    return ( 
        <Grid item xs={12} lg={4}>
            <Card id="lista" className = {classes.cartaReservas}>
                <CardActionArea>
                    <CardContent key={reserva.id}>
                        <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                            <Avatar className={classes.avatar}>{reserva.avatar}</Avatar>
                            <Typography className={classes.nombreCompleto}>{reserva.nombreCompleto}</Typography>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                            <Typography className={classes.camposTitulos}>Código: </Typography>
                            <Typography className={classes.campos}>{reserva.codigo}</Typography>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                            <Typography className={classes.camposTitulos}>Lugar: </Typography>
                            <Typography className={classes.campos}>{reserva.lugar}</Typography>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                            <Typography className={classes.camposTitulos}>Marca del vehículo: </Typography>
                            <Typography className={classes.campos}>{reserva.marcaVehiculo}</Typography>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                            <Typography className={classes.camposTitulos}>Patente del vehículo:</Typography>
                            <Typography className={classes.campos}>{reserva.patenteVehiculo}</Typography>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                            <Typography className={classes.camposTitulos}>Tipo de vehículo:</Typography>
                            <Typography className={classes.campos}>{reserva.tipoVehiculo}</Typography>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                            <Typography className={classes.camposTitulos}>Precio:</Typography>
                            <Typography className={classes.campos}>${reserva.precio}</Typography>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                            <Typography className={classes.camposTitulos}>Hora de Ingreso: </Typography>
                            <Typography className={classes.campos}>{reserva.horaIngreso}</Typography>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                            <Typography className={classes.camposTitulos}>Hora de Salida: </Typography>
                            <Typography className={classes.campos}>{reserva.horaSalida}</Typography>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                            <Typography className={classes.camposTitulos}>Observaciones: </Typography>
                            <Typography className={classes.campos}>{reserva.observaciones}</Typography>
                        </div>
                            {reserva.estado !== `${CReservas.CONCLUIDA}` ?
                            <>
                            <Button
                            endIcon={reserva.estado !== CReservas.VALIDADA ?<CheckIcon/>:<UpdateIcon/>}
                            className= {classes.botonValidarReserva} onClick={handleClickAbrirModalValidar}>
                            {reserva.estado !== CReservas.VALIDADA ?`${CReservas.VALIDAR}`:`${CGeneral.MODIFICAR}`}
                            </Button>
                            <Dialog open={abrirModalValidar} onClose={handleClickCerrarModalValidar} aria-labelledby="form-dialog-title">
                                <DialogTitle id="form-dialog-title">{reserva.estado !== CReservas.VALIDADA
                                ?`${CReservas.VALIDAR_RESERVA}`:`${CReservas.MODIFICAR_HORA_INGRESO}`}</DialogTitle>
                                <DialogContent>
                                <DialogContentText>{CReservas.PARA_VALIDAR_RESERVA}</DialogContentText>
                                <TimePicker
                                    className={classes.inputHoraIngreso}
                                    autoFocus
                                    ampm={false}
                                    value={horaIngreso}
                                    fullWidth
                                    label="Hora de ingreso"
                                    onChange={handleCambiarHoraIngreso}
                                    margin="dense"
                                />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={()=> validarReserva(reserva.id)} endIcon={<CheckIcon/>} className={classes.botonValidarReserva}>{CReservas.VALIDAR}</Button>
                                    <Button onClick={handleClickCerrarModalValidar} className={classes.botonCancelar}>{CGeneral.CANCELAR}</Button>
                                </DialogActions>
                            </Dialog>
                            : { reserva.estado === CReservas.VALIDADA ?
                            <Button
                                endIcon={<DoneAllIcon/>}
                                className= {classes.botonConcluirReserva}
                                onClick={handleClickAbrirModalConcluir}>
                                {CReservas.CONCLUIR}
                            </Button>
                            : ""}
                            <Dialog open={abrirModalConcluir} onClose={handleClickCerrarModalConcluir} aria-labelledby="form-dialog-title">
                                <DialogTitle id="form-dialog-title">{CReservas.CONCLUIR_RESERVA}</DialogTitle>
                                <DialogContent>
                                <DialogContentText>{CReservas.PARA_CONCLUIR_RESERVA}</DialogContentText>
                                <TimePicker
                                    className={classes.inputHoraSalida}
                                    autoFocus
                                    ampm={false}
                                    value={horaSalida}
                                    fullWidth
                                    label="Hora de salida"
                                    onChange={handleCambiarHoraSalida}
                                    margin="dense"
                                />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={() => concluirReserva(reserva.id)} endIcon={<DoneAllIcon/>} className={classes.botonConcluirReserva}>{CReservas.CONCLUIR}</Button>
                                    <Button onClick={handleClickCerrarModalConcluir} className={classes.botonCancelar}>{CGeneral.CANCELAR}</Button>
                                </DialogActions>
                            </Dialog>
                            </>
                            : ""}
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    );
}
 
export default Reserva;