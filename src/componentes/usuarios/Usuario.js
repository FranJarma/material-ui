import React, {useState} from 'react';
import {Typography, Button, Avatar, Grid, TextField, Card, CardActionArea, CardContent } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useStyles} from './Styles';
import NuevoUsuario from './NuevoUsuario';

const Usuario = ({usuario}) => {
    const classes = useStyles();
    //states para los modals
    const [abrirModalDarDeBaja, setAbrirModalDarDeBaja] = useState(false);
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


    return ( 
    <>
        <Grid item xs={12} lg={4}>
            <Card className = {classes.cartaUsuarios}>
                <CardActionArea>
                    <CardContent key={usuario.uid}>
                        <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                            <Avatar className={classes.avatar}>{usuario.avatar}</Avatar>
                            <Typography className={classes.nombreCompleto}>{usuario.nombreCompleto}</Typography>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                            <Typography className={classes.camposTitulos}>Usuario: </Typography>
                            <Typography className={classes.campos}>{usuario.nombreUsuario}</Typography>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                            <Typography className={classes.camposTitulos}>DNI: </Typography>
                            <Typography className={classes.campos}>{usuario.dni}</Typography>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                            <Typography className={classes.camposTitulos}>Email: </Typography>
                            <Typography className={classes.campos}>{usuario.email}</Typography>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                            <Typography className={classes.camposTitulos}>Teléfono: </Typography>
                            <Typography className={classes.campos}>{usuario.telefono}</Typography>
                        </div>
                        { usuario.esEncargado ? 
                            <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                                <Typography className={classes.camposTitulos}> </Typography>
                            </div>
                        : "" }
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
                                >Modificar usuario
                                <Typography onClick={handleClickCerrarModalModificar}
                                className={classes.botonCerrarModal}
                                >X</Typography>
                                </Typography>
                            </div>
                            <DialogContent>
                            &nbsp;
                            <DialogContentText> Ingrese los datos que desea modificar</DialogContentText>
                            <NuevoUsuario usuarioCompleto={usuario} accion="Modificar"
                            cerrarModal={handleClickCerrarModalModificar}
                            />
                            </DialogContent>
                        </Dialog>
                        <Dialog open={abrirModalDarDeBaja} onClose={handleClickCerrarModalDarDeBaja}
                        aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title">Dar de baja</DialogTitle>
                            <DialogContent>
                            <DialogContentText> Para dar de baja el estacionamiento, escriba el nombre completo en el siguiente cuadro de texto:</DialogContentText>
                            <Grid container spacing={1}>
                                <Grid item xs={12} lg={12}>
                                    <TextField autoFocus className={classes.inputDarDeBaja} fullWidth label="Nombre"></TextField>
                                </Grid>
                            </Grid>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClickCerrarModalDarDeBaja} disabled endIcon={<DeleteIcon/>} className={classes.botonDarDeBaja}>Dar de baja</Button>
                                <Button onClick={handleClickCerrarModalDarDeBaja} className={classes.botonCancelar}>Cancelar</Button>
                            </DialogActions>
                        </Dialog>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
        </>
     );
}
 
export default Usuario;
