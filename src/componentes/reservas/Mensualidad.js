import React, { useState, useContext } from 'react';
import { Typography, TextField, Button, Card, CardContent, Grid } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CheckIcon from '@material-ui/icons/Check';
import * as CGeneral from './../../constantes/general/CGeneral';
import { FirebaseContext } from '../../firebase';
import {useStyles} from './Styles';
import swal from './../diseño/Swal';
import Toast from '../diseño/Toast';
import traducirError from '../../firebase/errores';

const Mensualidad = ({mensualidad, estacionamiento, mensualidades}) => {
    const classes = useStyles();
    const [abrirModalMensualidad, setAbrirModalMensualidad] = useState(false);
    const handleChangeModalMensualidad = () => {
        setAbrirModalMensualidad(!abrirModalMensualidad);
    }
    const [infoMensualidad, setInfoMensualidad] = useState({
        precio: 2500
    });
    const {precio} = infoMensualidad;
    const onChange= (e) => {
        setInfoMensualidad({
            ...infoMensualidad,
            [e.target.name] : e.target.value
        })
    }
    const {firebase} = useContext(FirebaseContext);
    //funciones de firebase
    async function otorgarMensualidad (id) {
        try {
            firebase.db.collection('mensualidades').doc(id).update({
                estado: "Otorgada",
                total: precio
            });
            swal(CGeneral.OPERACION_COMPLETADA, "La mensualidad ha sido otorgada");
            setAbrirModalMensualidad(false);
        } catch (error) {
            Toast(traducirError(error.code));
        }
    }
    //funciones de firebase
    async function revocarMensualidad (id) {
        try {
            firebase.db.collection('mensualidades').doc(id).update({
                estado: "Revocada",
                total: 0
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
                            <Typography className={classes.campos}>{mensualidad.horaIngreso} - {mensualidad.horaSalida}</Typography>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                            <Typography className={classes.camposTitulos}>Observaciones: </Typography>
                            <Typography className={classes.campos}>{mensualidad.observaciones}</Typography>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                            <Typography className={classes.camposTitulos}>Estado: </Typography>
                            <Typography className={classes.campos}>{mensualidad.estado}</Typography>
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
                        onClick={() => revocarMensualidad(mensualidad.id)}
                        >
                        Revocar
                        </Button>}
                        <Dialog open={abrirModalMensualidad} onClose={handleChangeModalMensualidad} aria-labelledby="form-dialog-title">
                                <DialogTitle id="form-dialog-title">Otorgar Mensualidad</DialogTitle>
                                <DialogContent>
                                    <Grid container>
                                        <Grid item xs={12} md={12} sm={12} lg={12} xl={12}>
                                            <TextField
                                            variant="outlined"
                                            label="Ingrese precio total"
                                            type="number"
                                            name="precio"
                                            value={precio}
                                            onChange={onChange}>
                                            </TextField>
                                        </Grid>
                                    </Grid>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={() => otorgarMensualidad(mensualidad.id)} endIcon={<CheckIcon/>} className={classes.botonValidarReserva}>Confirmar</Button>
                                    <Button onClick={handleChangeModalMensualidad} className={classes.botonCancelar}>{CGeneral.CANCELAR}</Button>
                                </DialogActions>
                            </Dialog>
                    </CardContent>
            </Card>
        </Grid>
    );
}
 
export default Mensualidad;