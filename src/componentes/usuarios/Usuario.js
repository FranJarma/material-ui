import React, {useState} from 'react';
import {Typography, Button, Select, Avatar, MenuItem, Grid, TextField, Fab, Card, CardActionArea, CardContent } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import DeleteIcon from '@material-ui/icons/Delete';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useStyles} from './Styles';

const Usuario = ({usuario}) => {
    const classes = useStyles();
    //states para validar y concluir reservas y para el select de las playas de setacionamiento
    const [abrirModalValidar, setAbrirModalValidar] = useState(false);
    const handleClickAbrirModalModificar = () => {
        setAbrirModalValidar(true);
    };
    const handleClickCerrarModalValidar = () => {
        setAbrirModalValidar(false);
    };
    const [abrirModalDarDeBaja, setAbrirModalDarDeBaja] = useState(false);
    const handleClickAbrirModalDarDeBaja = () => {
        setAbrirModalDarDeBaja(true);
    };
    const handleClickCerrarModalDarDeBaja = () => {
        setAbrirModalDarDeBaja(false);
    };

    const [playa, setearPlaya] = useState([]);
    const playas =[]
    const handleChangePlaya = (event) => {
        setearPlaya(event.target.value);
    };

    return ( 
        <>
            &nbsp;
            <Card className = {classes.cartausuarios}>
                <CardActionArea>
                    <CardContent>
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
                        endIcon={<AssignmentTurnedInIcon/>}
                        className= {classes.botonModificarDatos}
                        onClick={handleClickAbrirModalModificar}>
                        Modificar Datos
                        </Button>
                        <Button
                        endIcon={<DeleteIcon/>}
                        className= {classes.botonDarDeBaja}
                        onClick={handleClickAbrirModalDarDeBaja}>
                        Dar de baja
                        </Button>
                    </CardContent>
                </CardActionArea>
            </Card>
        <Dialog open={abrirModalValidar} onClose={handleClickCerrarModalValidar} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Asignar estacionamiento</DialogTitle>
            <DialogContent>
            <DialogContentText> Para asignar una playa de estacionamiento, seleccione una de la lista:</DialogContentText>
            <Select
            fullWidth
            displayEmpty
            value={playa}
            onChange={handleChangePlaya}
            className={classes.select}
            >
            <MenuItem value="" disabled>Seleccione</MenuItem>
            {playas.map((playa) => (
                <MenuItem key={playa.id} value={playa.nombre}>
                {playa.nombre}
                </MenuItem>
            ))}
            </Select>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClickCerrarModalValidar} endIcon={<CheckIcon/>} className={classes.botonModificarDatos}>Asignar</Button>
                <Button onClick={handleClickCerrarModalValidar} className={classes.botonCancelar}>Cancelar</Button>
            </DialogActions>
        </Dialog>
        <Dialog open={abrirModalDarDeBaja} onClose={handleClickCerrarModalDarDeBaja} aria-labelledby="form-dialog-title">
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
        </>
     );
}
 
export default Usuario;
