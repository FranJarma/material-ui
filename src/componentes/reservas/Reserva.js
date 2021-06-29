import React, { useState, useContext, useEffect } from 'react';
import { makeStyles, Typography, TextField, Button, Card, CardContent, Grid, Divider, MenuItem, FormHelperText } from '@material-ui/core';
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
import {useStyles} from './Styles';
import swal from './../diseño/Swal';

const Reserva = ({reserva, estacionamiento, reservas}) => {
    const classes = useStyles();
    //state para el lugar
    const [lugar, setLugar] = useState('');
    const onChangeLugar = e => {
        setLugar(e.target.value)
    }
    useEffect(()=>{
        if (reserva.lugar) {
            setLugar(reserva.lugar)
        }
    },[setLugar])
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
                lugar: lugar,
                estado: `${CReservas.VALIDADA}`
            });
            swal(CGeneral.OPERACION_COMPLETADA, CReservas.LA_RESERVA_HA_SIDO_VALIDADA);
            setAbrirModalValidar(false);
        } catch (error) {
            console.log(error);
        }
    }

    const concluirReserva = (id) => {
        console.log(estacionamiento.id, lugar)
        try {
            firebase.db.collection('reservas').doc(id).update({
                horaSalida: horaSalida.toTimeString().substr(0,5),
                estado: `${CReservas.CONCLUIDA}`
            })
            .then(
                firebase.liberarLugar(estacionamiento.id, lugar)
            );
            swal(CGeneral.OPERACION_COMPLETADA, CReservas.LA_RESERVA_HA_SIDO_CONCLUIDA);
            setAbrirModalConcluir(false);
        } catch(error){
            console.log(error);
        }
    }
    return ( 
        <Grid item xs={12} lg={4}>
            <Card id="lista" className = {classes.cartaReservas}>
                    <CardContent key={reserva.id}>
                        <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                            <Typography className={classes.camposTitulos}>Código: </Typography>
                            <Typography className={classes.campos}>{reserva.id}</Typography>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                            <Typography className={classes.camposTitulos}>Nombre de la persona: </Typography>
                            <Typography className={classes.campos}>{reserva.usuario.nombreCompleto}</Typography>
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
                            <Typography className={classes.camposTitulos}>Observaciones: </Typography>
                            <Typography className={classes.campos}>{reserva.observaciones}</Typography>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                            <Typography className={classes.camposTitulos}>Lugar: </Typography>
                            <Typography className={classes.campos}>{reserva.lugar}</Typography>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                            <Typography className={classes.camposTitulos}>Hora de Ingreso: </Typography>
                            <Typography className={classes.campos}>{reserva.horaIngreso}</Typography>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                            <Typography className={classes.camposTitulos}>Hora de Salida: </Typography>
                            <Typography className={classes.campos}>{reserva.horaSalida}</Typography>
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
                                <FormHelperText style={{marginLeft:'1.5rem'}}>Seleccione lugar</FormHelperText>
                                <TextField
                                variant="standard"
                                fullWidth
                                name="lugar"
                                value={lugar}
                                onChange={onChangeLugar}
                                className={classes.inputLugar}
                                select
                                >
                                {estacionamiento.lugares.map((lugar) => (
                                <MenuItem
                                disabled={lugar.ocupado === true || lugar.estado === 'deshabilitado' ? true : false}
                                key={lugar.numero}
                                name={lugar.numero}
                                value={lugar.numero}>
                                {lugar.numero} {lugar.ocupado === true ? `- Ocupado ` : lugar.estado === 'deshabilitado' ? "- Deshabilitado" : ""}
                                </MenuItem>
                                ))}
                                </TextField>
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
            </Card>
        </Grid>
    );
}
 
export default Reserva;