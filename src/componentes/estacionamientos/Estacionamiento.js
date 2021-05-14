import React, {useState} from 'react';
import { Typography, Button, Card, Grid, CardActionArea, CardContent, Avatar } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import {useStyles} from './Styles';
import * as CEstacionamientos from './../../constantes/estacionamientos/CEstacionamientos';
import AdministrarEstacionamiento from './AdministrarEstacionamiento';

const Estacionamiento = ({estacionamiento}) => {
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
        <Grid item xs={12} lg={4}>
            <Card className = {classes.cartaEstacionamientos}>
                <CardActionArea>
                    <CardContent key={estacionamiento.uid}>
                        <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                            <Avatar className={classes.avatar}>{estacionamiento.avatar}</Avatar>
                            <Typography className={classes.nombreCompleto}>{estacionamiento.nombreCompleto}</Typography>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                            <Typography className={classes.camposTitulos}>Telefono: </Typography>
                            <Typography className={classes.campos}>{estacionamiento.telefono}</Typography>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                            <Typography className={classes.camposTitulos}>Horario: </Typography>
                            <Typography className={classes.campos}>{estacionamiento.horario}</Typography>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                            <Typography className={classes.camposTitulos}>Días de apertura: </Typography>
                            <Typography className={classes.campos}>{estacionamiento.diasApertura.toString()}</Typography>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                            <Typography className={classes.camposTitulos}>Valoración: </Typography>
                            <Typography className={classes.campos}>{estacionamiento.valoracion}</Typography>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                            <Typography className={classes.camposTitulos}>Dirección: </Typography>
                            <Typography className={classes.campos}>{estacionamiento.ubicacion.direccion}</Typography>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                            <Typography className={classes.camposTitulos}>Provincia: </Typography>
                            <Typography className={classes.campos}>{estacionamiento.ubicacion.provincia}</Typography>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                            <Typography className={classes.camposTitulos}>Ciudad: </Typography>
                            <Typography className={classes.campos}>{estacionamiento.ubicacion.ciudad}</Typography>
                        </div>
                        <Button
                        onClick={handleClickAbrirModalModificar}
                        endIcon={<AssignmentTurnedInIcon/>}
                        className= {classes.botonModificarDatos}
                        >
                        Modificar Datos
                        </Button>
                        <Button
                        endIcon={<DeleteIcon/>}
                        className= {classes.botonDarDeBaja}
                        onClick={handleClickAbrirModalDarDeBaja}>
                        Dar de baja
                        </Button>
                        <Dialog style={{zIndex: 1}} maxWidth={'md'} open={modalModificar}
                        onClose={handleClickCerrarModalModificar}
                        aria-labelledby="form-dialog-title">
                            <div style={{backgroundColor: '#43a047'}}>
                                <Typography className={classes.tituloModal} id="form-dialog-title"
                                >Modificar estacionamiento
                                <Typography onClick={handleClickCerrarModalModificar}
                                className={classes.botonCerrarModal}
                                >X</Typography>
                                </Typography>
                            </div>
                            <DialogContent>
                            &nbsp;
                            <DialogContentText>{CEstacionamientos.MODIFICAR_ESTACIONAMIENTO_MODAL} </DialogContentText>
                            <AdministrarEstacionamiento estacionamientoCompleto={estacionamiento} accion="Modificar"
                            cerrarModal={handleClickCerrarModalModificar}
                            />
                            </DialogContent>
                        </Dialog>
                        <Dialog style={{zIndex: 1}} maxWidth={'md'} open={modalDarDeBaja}
                        onClose={handleClickCerrarModalDarDeBaja}
                        aria-labelledby="form-dialog-title">
                            <div style={{backgroundColor: '#ef5350'}}>
                                <Typography className={classes.tituloModal} id="form-dialog-title"
                                >Eliminar estacionamiento
                                <Typography onClick={handleClickCerrarModalDarDeBaja}
                                className={classes.botonCerrarModal}
                                >X</Typography>
                                </Typography>
                            </div>
                            <DialogContent>
                            &nbsp;
                            <DialogContentText> {CEstacionamientos.ELIMINAR_ESTACIONAMIENTO_MODAL}
                                <p style={{fontWeight: 'bold', textAlign: 'center'}}>{estacionamiento.nombreCompleto}</p>
                            </DialogContentText>
                            <AdministrarEstacionamiento estacionamientoCompleto={estacionamiento} accion="Eliminar"
                            cerrarModal={handleClickCerrarModalDarDeBaja}
                            />
                            </DialogContent>
                        </Dialog>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
        </>
        );
}
 
export default Estacionamiento;