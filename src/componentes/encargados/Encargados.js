import React, {useState, useContext} from 'react';
import Navbar from '../diseño/Navbar.js';
import { makeStyles, Typography, Button, Select, Avatar, MenuItem, Grid, TextField, Fab, Card, CardActionArea, CardContent } from '@material-ui/core';
import Paginacion from '../diseño/Paginacion.js';
import CheckIcon from '@material-ui/icons/Check';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import Footer from '../diseño/Footer.js';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PaginacionContext from './../../context/paginacion/paginacionContext';

import SpinnerContext from '../../context/spinner/spinnerContext.js';
import Spinner from '../diseño/Spinner.js';

const useStyles = makeStyles((theme) => ({
    titulo: {
        fontFamily: "Roboto Condensed, sans-serif",
        textTransform: "uppercase",
        fontSize: 25,
        textAlign: "center"
    },
    cartaEncargados: {
        flexGrow: 1,
        marginBottom: "1rem",
        boxShadow: "0 2px 3px rgba(0,0,0,0.25), 0 0 3px rgba(0,0,0,0.22)",
        backgroundColor: theme.palette.background.paper,
        marginLeft: "1rem",
        marginRight: "1rem"
    },
    select: {
        '&:after': {
            borderColor: "#4db6ac",
        }
    },
    botonAsignarEstacionamiento: {
        backgroundColor: "#448aff",
        color: "#ffffff",
        fontFamily: "Roboto Condensed, sans-serif",
        textTransform: "uppercase",
        fontSize: 15,
        marginTop: "1rem",
        [theme.breakpoints.down('xs')]:{
            width: "100%"
        },
        "&:hover":{
            backgroundColor: "#448aff",
        }
    },
    botonDarDeBaja: {
        backgroundColor: "#ff1744",
        color: "#FFFFFF",
        fontFamily: "Roboto Condensed, sans-serif",
        textTransform: "uppercase",
        fontSize: 15,
        marginTop: "1rem",
        [theme.breakpoints.up('xs')]:{
            marginLeft: "1rem"
        },
        [theme.breakpoints.down('xs')]:{
            width: "100%",
            marginLeft: 0
        },
        "&:hover":{
            backgroundColor: "#ff1744",
        }

    },
    botonCancelar: {
        color: "#000000",
        fontFamily: "Roboto Condensed, sans-serif",
        textTransform: "uppercase",
        marginLeft: "auto",
        marginTop: "1rem",
        fontSize: 15,
        alignContent: "auto"
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
        [theme.breakpoints.up('md')]:{
            marginLeft: "5rem"
        },
        fontWeight: "bold",
        padding: "0.1rem",
        fontSize: 16,
    },
    campos: {
        fontFamily: "Roboto Condensed, sans-serif",
        color: "#9e9e9e",
        [theme.breakpoints.up('md')]:{
            marginLeft: "0.5rem",
        },
        fontSize: 15,
        display: "flex",
        flexWrap: "wrap"
    },
    input: {
        "& .MuiFormLabel-root.Mui-focused": {
            color: "#448aff"
        },
        "& .MuiInput-underline:after": {
            borderBottomColor: "#448aff"
        },
    },
    inputDarDeBaja: {
        "& .MuiFormLabel-root.Mui-focused": {
            color: "#ff1744"
        },
        "& .MuiInput-underline:after": {
            borderBottomColor: "#ff1744"
        },
    },
    avatar: {
        width: "4rem",
        height: "4rem"
    },
    botonAgregarEstacionamiento: {
        backgroundColor: "#43a047",
        fontFamily: "Roboto Condensed, sans-serif",
        float:"right",
        marginTop: "1rem",
        marginRight: "1rem",
        color: "#FFFFFF",
        "&:hover": {
            backgroundColor: "#43a047"
        }
    },
    cantidad: {
        fontFamily: "Roboto Condensed, sans-serif",
        color: "#448aff",
        fontSize: 18,
        textTransform: "uppercase",
        marginLeft: "1rem",
        fontWeight: "bold",
        marginBottom: "2rem"
    },
}));

const Encargados = () => {
    const classes = useStyles();
    //states para validar y concluir reservas y para el select de las playas de setacionamiento
    const [abrirModalValidar, setAbrirModalValidar] = useState(false);
    const handleClickAbrirModalValidar = () => {
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
        //states para agregar nuevo encargado
        const [abrirModalNuevoEncargado, setAbrirModalNuevoEncargado] = useState(false);
        const handleClickAbrirModalNuevoEncargado = () => {
            setAbrirModalNuevoEncargado(true);
        };
        const handleClickCerrarModalNuevoEncargado = () => {
            setAbrirModalNuevoEncargado(false);
        };
    const [playa, setearPlaya] = useState([]);

    const handleChangePlaya = (event) => {
        setearPlaya(event.target.value);
    };

    const encargados = [
        {
            id: 0,
            nombreCompleto: 'Francisco Jarma',
            avatar: 'FJ',
            nombreUsuario: 'fjarma24',
            dni: '40.524.512',
            email: 'pancho24.1997@gmail.com',
            playa: 'Playa de estacionamiento del Convento'
        },
        {
            id: 1,
            nombreCompleto: 'Roberto Rodriguez',
            avatar: 'RR',
            nombreUsuario: 'rrodriguez81',
            dni: '35.152.123',
            email: 'rrodirguez@gmail.com',
            playa: 'Playa de estacionamiento del Carmen'
        },
        {
            id: 2,
            nombreCompleto: 'Ramiro Godinez',
            avatar: 'RG',
            nombreUsuario: 'rgodinez123',
            dni: '27.154.222',
            email: 'rgodinez@gmail.com',
            playa: 'Playa de estacionamiento el Solar Grande'
        },
    ];
    const playas = [
        {
            id: 0,
            nombre: "Playa de estacionamiento del Convento"
        },
        {
            id: 1,
            nombre: "Playa de estacionamiento del Carmen"
        },
        {
            id: 3,
            nombre: "Playa de estacionamiento el Solar Grande"
        },
    ];
    //context de paginación y spinner
    const paginacionContext = useContext(PaginacionContext);
    const { pagina, itemsPorPagina } = paginacionContext;
    const spinnerContext = useContext(SpinnerContext);
    const { cargando } = spinnerContext;

    return (
        (!cargando ? 
        <>
            <Navbar/>
            <Typography className={classes.titulo}>Administración de encargados de estacionamientos</Typography>
             &nbsp;
                <Fab className={classes.botonAgregarEstacionamiento} onClick={handleClickAbrirModalNuevoEncargado} aria-label="add">
                    <AddIcon /> 
                </Fab>
                &nbsp;
                <Typography className={classes.cantidad}>Total de encargados: {encargados.length}</Typography>
                    {encargados.slice((pagina-1)* itemsPorPagina, pagina*itemsPorPagina).map(encargado =>(
                    <>
                    <Card className = {classes.cartaEncargados}>
                        <CardActionArea>
                            <CardContent key={encargado.id}>
                                <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                                    <Avatar className={classes.avatar}>{encargado.avatar}</Avatar>
                                    <Typography className={classes.nombreCompleto}>{encargado.nombreCompleto}</Typography>
                                </div>
                                <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                                    <Typography className={classes.camposTitulos}>Usuario: </Typography>
                                    <Typography className={classes.campos}>{encargado.nombreUsuario}</Typography>
                                </div>
                                <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                                    <Typography className={classes.camposTitulos}>DNI: </Typography>
                                    <Typography className={classes.campos}>{encargado.dni}</Typography>
                                </div>
                                <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                                    <Typography className={classes.camposTitulos}>Email: </Typography>
                                    <Typography className={classes.campos}>{encargado.email}</Typography>
                                </div>
                                <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                                    <Typography className={classes.camposTitulos}>Playa de estacionamiento:</Typography>
                                    <Typography className={classes.campos}>{encargado.playa}</Typography>
                                </div>
                                <Button
                                endIcon={<AssignmentTurnedInIcon/>}
                                className= {classes.botonAsignarEstacionamiento}
                                onClick={handleClickAbrirModalValidar}>
                                Asignar estacionamiento
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
                    </>
                    ))}
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
                            <Button onClick={handleClickCerrarModalValidar} endIcon={<CheckIcon/>} className={classes.botonAsignarEstacionamiento}>Asignar</Button>
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
                    <Dialog open={abrirModalNuevoEncargado} onClose={handleClickAbrirModalNuevoEncargado} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Agregar nuevo encargado</DialogTitle>
                        <DialogContent>
                        <DialogContentText> Ingrese datos. Una vez ingresados se enviará un email al correo ingresado con los datos del nuevo encargado.</DialogContentText>
                        <Grid container spacing={1}>
                            <Grid item xs={12} lg={12}>
                                <TextField autoFocus className={classes.input} fullWidth label="Nombre"></TextField>
                            </Grid>
                            <Grid item xs={12} lg={12}>
                                <TextField className={classes.input} fullWidth label="DNI"></TextField>
                            </Grid>
                            <Grid item xs={12} lg={12}>
                                <TextField className={classes.input} fullWidth label="Email"></TextField>
                            </Grid>
                            <Grid item xs={12} lg={12}>
                                <TextField className={classes.input} fullWidth label="Usuario"></TextField>
                            </Grid>
                            <Grid item xs={12} lg={12}>
                                <TextField className={classes.input} fullWidth label="Contraseña"></TextField>
                            </Grid>
                        </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClickCerrarModalNuevoEncargado} endIcon={<CheckIcon/>} className={classes.botonAsignarEstacionamiento}>Agregar</Button>
                            <Button onClick={handleClickCerrarModalNuevoEncargado} className={classes.botonCancelar}>Cancelar</Button>
                        </DialogActions>
                    </Dialog>
            <Paginacion lista={encargados}/>
            <Footer/>
        </>
    : <Spinner></Spinner>)
    );
}
 
export default Encargados;