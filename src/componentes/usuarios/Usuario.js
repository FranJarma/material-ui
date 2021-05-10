import React, {useState} from 'react';
import {Typography, Button, Avatar, Grid, Card, CardActionArea, CardContent } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import {useStyles} from './Styles';
import AdministrarUsuario from './AdministrarUsuario';

const Usuario = ({usuario}) => {
    const classes = useStyles();
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
                            <AdministrarUsuario usuarioCompleto={usuario} accion="Modificar"
                            cerrarModal={handleClickCerrarModalModificar}
                            />
                            </DialogContent>
                        </Dialog>
                        <Dialog style={{zIndex: 1}} maxWidth={'md'} open={modalDarDeBaja}
                        onClose={handleClickCerrarModalDarDeBaja}
                        aria-labelledby="form-dialog-title">
                            <div style={{backgroundColor: '#ef5350'}}>
                                <Typography className={classes.tituloModal} id="form-dialog-title"
                                >Eliminar usuario
                                <Typography onClick={handleClickCerrarModalDarDeBaja}
                                className={classes.botonCerrarModal}
                                >X</Typography>
                                </Typography>
                            </div>
                            <DialogContent>
                            &nbsp;
                            <DialogContentText> Para eliminar el usuario, por favor ingrese el nombre de usuario:
                                <p style={{fontWeight: 'bold', textAlign: 'center'}}>{usuario.nombreUsuario}</p>
                            </DialogContentText>
                            <AdministrarUsuario usuarioCompleto={usuario} accion="Eliminar"
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
export default Usuario;
