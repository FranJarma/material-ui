import React, { useState, useContext } from 'react';
import { Typography, TextField, Button, Card, CardContent, Grid, MenuItem, FormHelperText } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CheckIcon from '@material-ui/icons/Check';
import * as CGeneral from './../../constantes/general/CGeneral';
import * as CReservas from './../../constantes/reservas/CReservas';
import { FirebaseContext } from '../../firebase';
import {useStyles} from './Styles';
import swal from './../diseño/Swal';
import Toast from '../diseño/Toast';
import traducirError from '../../firebase/errores';

const Mensualidad = ({mensualidad, estacionamiento, mensualidades}) => {
    const classes = useStyles();
    //state para el lugar
    const [lugar, setLugar] = useState('');
    const onChangeLugar = e => {
        setLugar(e.target.value)
    }
    const [abrirModalMensualidad, setAbrirModalMensualidad] = useState(false);
    const handleChangeModalMensualidad = () => {
        setAbrirModalMensualidad(!abrirModalMensualidad);
    }

    const {firebase} = useContext(FirebaseContext);
    //funciones de firebase
    const otorgarMensualidad = (id) => {
        try {
            firebase.db.collection('mensualidades').doc(id).update({
                estado: "Otorgada"
            });
            swal(CGeneral.OPERACION_COMPLETADA, "La mensualidad ha sido otorgada");
            setAbrirModalMensualidad(false);
        } catch (error) {
            Toast(traducirError(error.code));
        }
    }
    //funciones de firebase
    const revocarMensualidad = (id) => {
        try {
            firebase.db.collection('mensualidades').doc(id).update({
                estado: "Revocada"
            });
            swal(CGeneral.OPERACION_COMPLETADA, "La mensualidad ha sido revocada");
            setAbrirModalMensualidad(false);
        } catch (error) {
            Toast(traducirError(error.code));
        }
    }
    //funciones de firebase
    return ( 
        <Grid item xs={12} lg={4}>
            <Card id="lista" className = {classes.cartaReservas}>
                    <CardContent key={mensualidad.id}>
                        <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                            <Typography className={classes.camposTitulos}>Nombre de la persona: </Typography>
                            <Typography className={classes.campos}>{mensualidad.usuario.nombreCompleto}</Typography>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                            <Typography className={classes.camposTitulos}>Días solicitados:  </Typography>
                            <Typography className={classes.campos}>{mensualidad.diasSolicitados.join(',')}</Typography>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                            <Typography className={classes.camposTitulos}>Horario solicitado:  </Typography>
                            <Typography className={classes.campos}>{mensualidad.horarioSolicitado[0]} - {mensualidad.horarioSolicitado[1]}</Typography>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                            <Typography className={classes.camposTitulos}>Observaciones: </Typography>
                            <Typography className={classes.campos}>{mensualidad.observaciones}</Typography>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                            <Typography className={classes.camposTitulos}>Estado: </Typography>
                            <Typography className={classes.campos}>{mensualidad.estado}</Typography>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                            <Typography className={classes.camposTitulos}>Precio por mes: </Typography>
                                <Typography className={classes.campos}>$ {estacionamiento.tarifas[0].valor * mensualidad.diasSolicitados.length * (mensualidad.horarioSolicitado[1].split(":")[0] - mensualidad.horarioSolicitado[0].split(":")[0])}</Typography>
                        </div>
                        <br/>
                        {mensualidad.estado !== "Otorgada" ?
                        <Button
                        className= {classes.botonConsultar}
                        onClick={handleChangeModalMensualidad}
                        >
                        Otorgar
                        </Button>
                        : <Button
                        color="secondary"
                        variant="contained"
                        onClick={()=>revocarMensualidad(mensualidad.id)}
                        >
                        Revocar
                        </Button>}
                        <Dialog open={abrirModalMensualidad} onClose={handleChangeModalMensualidad} aria-labelledby="form-dialog-title">
                                <DialogTitle id="form-dialog-title">Otorgar Mensualidad</DialogTitle>
                                <DialogContent>
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
                                    <Button onClick={()=> otorgarMensualidad(mensualidad.id)} endIcon={<CheckIcon/>} className={classes.botonValidarReserva}>Confirmar</Button>
                                    <Button onClick={handleChangeModalMensualidad} className={classes.botonCancelar}>{CGeneral.CANCELAR}</Button>
                                </DialogActions>
                            </Dialog>
                    </CardContent>
            </Card>
        </Grid>
    );
}
 
export default Mensualidad;