import React, {useState, useEffect, useContext} from 'react';
import Navbar from '../diseño/Navbar.js';
import { makeStyles, Typography, Button, Select, InputLabel, Input, Chip, Checkbox,
MenuItem, Grid, TextField, Fab, Card, CardActionArea, CardContent, InputAdornment } from '@material-ui/core';
import Paginacion from '../diseño/Paginacion.js';
import CheckIcon from '@material-ui/icons/Check';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import MotorcycleIcon from '@material-ui/icons/Motorcycle';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';
import {
    KeyboardTimePicker,
  } from '@material-ui/pickers';
import Footer from '../diseño/Footer.js';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PaginacionContext from './../../context/paginacion/paginacionContext';
import SpinnerContext from '../../context/spinner/spinnerContext.js';
import Spinner from '../diseño/Spinner.js';
import {useStyles} from './Styles';

const Estacionamientos = () => {
    const classes = useStyles();
        //states para los campos de fechas y horas y para los días de la semana y para las provincias
        const [horaApertura, setearHoraIngreso] = useState(new Date());
        const handleCambiarHoraApertura = (horaApertura) => {
            setearHoraIngreso(horaApertura);
        };
        const [horaCierre, setearHoraCierre] = useState(new Date());
        const handleCambiarHoraCierre = (horaCierre) => {
            setearHoraCierre(horaCierre);
        };
    
        const [dia, setearDia] = useState([]);
    
        const handleChangeDia = (event) => {
            setearDia(event.target.value);
        };
        
        const [provincias, setearProvincias] = useState([]);
        const dias = [
            'Lunes',
            'Martes',
            'Miercoles',
            'Jueves',
            'Viernes',
            'Sábado',
            'Domingo',
        ];
        //state para manejar la provincia seleccionada al cambiar el elemento del select
        const [provinciaSeleccionada, setearProvinciaSeleccionada] = useState([]);
        const handleChangeSelectProvincia = (event) => {
            setearProvinciaSeleccionada(event.target.value);
        };
        //state para manejar los checkbox
        var [state, setState] = useState({
            todosLosDias: false,
            horarioCorrido: false,
            automovil: false,
            camioneta: false,
            camion: false,
            bicicleta: false,
            motocicleta: false
        });
        const handleChangeCheckBox = (event) => {
            setState({
                ...state,
                [event.target.name]: event.target.checked
            });
        }
        const {
            todosLosDias,
            horarioCorrido,
            automovil,
            camioneta,
            camion,
            bicicleta,
            motocicleta
        } = state;
        //función para consultar a la api de provincias y traer los datos
        useEffect(()=>{
            axios.get(`https://infra.datos.gob.ar/catalog/modernizacion/dataset/7/distribution/7.2/download/provincias.json`)
            .then(res => {
                const resultado = res.data;
                setearProvincias(resultado.provincias);
                console.log(resultado);
            });
        },[setearProvincias]);
        //state para el modal de dar de baja
        const [abrirModalDarDeBaja, setAbrirModalDarDeBaja] = useState(false);
        const handleClickAbrirModalDarDeBaja = () => {
            setAbrirModalDarDeBaja(true);
        };
        const handleClickCerrarModalDarDeBaja = () => {
            setAbrirModalDarDeBaja(false);
        };
        //states para agregar nueva playa
        const [abrirModalNuevaPlaya, setAbrirModalNuevaPlaya] = useState(false);
        const handleClickAbrirModalNuevaPlaya = () => {
            setAbrirModalNuevaPlaya(true);
        };
        const handleClickCerrarModalNuevoEncargado = () => {
            setAbrirModalNuevaPlaya(false);
        };

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
            <Typography className={classes.titulo}>Administración de playas de estacionamientos</Typography>
             &nbsp;
                <Fab className={classes.botonAgregarPlaya} onClick={handleClickAbrirModalNuevaPlaya} aria-label="add">
                    <AddIcon /> 
                </Fab>
                &nbsp;
                <Typography className={classes.cantidad}>Total de playas: {playas.length}</Typography>
                    {playas.slice((pagina-1)* itemsPorPagina, pagina*itemsPorPagina).map(playa =>(
                    <>
                    <Card className = {classes.cartaEncargados}>
                        <CardActionArea>
                            <CardContent key={playa.id}>
                                <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                                    <Typography className={classes.camposTitulos}>Nombre:</Typography>
                                    <Typography className={classes.campos}>{playa.nombre}</Typography>
                                </div>
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
                    <Dialog fullScreen open={abrirModalNuevaPlaya} onClose={handleClickAbrirModalNuevaPlaya} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Agregar nueva playa de estacionamiento</DialogTitle>
                        <DialogContent>
                        <DialogContentText> Ingrese datos de la playa de estacionamiento a agregar. Una vez finalizado, se enviará una confirmación al encargado seleccionado.</DialogContentText>
                        <Typography className={classes.subtitulos}>Datos de la playa de estacionamiento</Typography>
                        &nbsp;
                            <Grid container spacing={3}>
                                <Grid item sm={12} xs={12}>
                                <TextField
                                className={classes.input}
                                label="Nombre Completo"
                                variant="standard"
                                fullWidth
                                autoFocus
                                value="Playa de estacionamiento del convento"
                                />
                                </Grid>
                                <Grid item sm={11} xs={11}>
                                <InputLabel className={classes.labelSelect}>Provincia</InputLabel>
                                <Select
                                className={classes.select}
                                value={provinciaSeleccionada}
                                displayEmpty
                                onChange={handleChangeSelectProvincia}
                                variant="standard"
                                fullWidth
                                >
                                <MenuItem value="" disabled>Seleccione</MenuItem>
                                {provincias.map((provincia) => (
                                    <MenuItem key={provincia.id} value={provincia.nombre}>
                                        {provincia.nombre}
                                    </MenuItem>
                                ))}
                                </Select>
                                </Grid>
                                <Grid item sm={6} xs={6} >
                                <TextField
                                className={classes.input}
                                label="N° de teléfono"
                                variant="standard"
                                value="4224256"
                                fullWidth
                                />
                                </Grid>
                                <Grid item sm={6} xs={6} >
                                <TextField
                                className={classes.input}
                                label="CUIT"
                                variant="standard"
                                value="25405245125"
                                fullWidth
                                />
                                </Grid>
                            </Grid>
                            &nbsp;
                        <Typography className={classes.subtitulos}>Horarios y fechas</Typography>
                        &nbsp;
                            <Grid container spacing={3}>
                                { !horarioCorrido ?
                                <>
                                <Grid item sm={6} xs={6} >
                                <KeyboardTimePicker
                                className={classes.input}
                                fullWidth
                                label="Apertura"
                                value={horaApertura}
                                onChange={handleCambiarHoraApertura}
                                KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                }}
                                />  
                                </Grid>
                                <Grid item sm={6} xs={6} >
                                <KeyboardTimePicker
                                className={classes.input}
                                fullWidth
                                label="Cierre"
                                value={horaCierre}
                                onChange={handleCambiarHoraCierre}
                                KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                }}
                                />
                                </Grid>
                                </>
                                : ""}
                                <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                                    <Checkbox color="primary" name="horarioCorrido" onChange={handleChangeCheckBox}></Checkbox>
                                    <Typography className={classes.subtitulos}>Horario corrido</Typography>
                                </div>
                                { !todosLosDias ?
                                <>
                                <Grid item sm={11} xs={11}>
                                <InputLabel className={classes.labelSelect}>Días de apertura (Seleccione uno o varios)</InputLabel>
                                <Select
                                fullWidth
                                className={classes.select}
                                displayEmpty
                                multiple
                                value={dia}
                                onChange={handleChangeDia}
                                input={<Input/>}
                                renderValue={(selected) => (
                                    <div className={classes.chips}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} className={classes.chip} />
                                    ))}
                                    </div>
                                )}
                                >
                                <MenuItem value="" disabled>Seleccione uno o varios</MenuItem>
                                {dias.map((dia) => (
                                    <MenuItem key={dia} value={dia}>
                                    {dia}
                                    </MenuItem>
                                    
                                ))}
                                </Select>
                                </Grid>
                                </>
                                : ""}
                                <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                                    <Checkbox color="primary" name="todosLosDias" onChange={handleChangeCheckBox}></Checkbox>
                                    <Typography className={classes.subtitulos}>Todos los días</Typography>
                                </div>  
                            </Grid>
                        &nbsp;
                        <Typography className={classes.subtitulos}>Ubicación</Typography>
                            <Grid container spacing={3}>
                                <Grid item sm={11} xs={11}>
                                <Select
                                fullWidth
                                className={classes.select}
                                />
                                </Grid>
                            </Grid>
                            &nbsp;
                            <Typography className={classes.subtitulos}>Vehículos aceptados</Typography>
                            &nbsp;
                            <Grid container spacing={3}>
                                <Grid item xs={11} md={4}>
                                <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                                    <Checkbox color="primary" onChange={handleChangeCheckBox} className={classes.checkBox} checked={automovil} name="automovil"/>
                                    <Typography className={classes.subtitulos}>Automóvil</Typography>
                                </div>
                                { automovil ?
                                <TextField
                                className={classes.input}
                                label="Ingrese tarifa"
                                variant="standard"
                                fullWidth
                                name="automovil"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                        <DriveEtaIcon />
                                        </InputAdornment>
                                    ),
                                    }}
                                />
                                : ""}
                                </Grid>
                                <Grid item xs={11} md={4}>
                                <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                                    <Checkbox color="primary" onChange={handleChangeCheckBox} className={classes.checkBox} checked={camioneta} name="camioneta"/>
                                    <Typography className={classes.subtitulos}>Camioneta</Typography>
                                </div>
                                { camioneta ?
                                <TextField
                                className={classes.input}
                                label="Ingrese tarifa"
                                variant="standard"
                                fullWidth
                                name="camioneta"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                        <DriveEtaIcon />
                                        </InputAdornment>
                                    ),
                                    }}
                                />
                                : ""}
                                </Grid>
                                <Grid item xs={11} md={3}>
                                <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                                    <Checkbox color="primary" onChange={handleChangeCheckBox} className={classes.checkBox} checked={camion} name="camion"/>
                                    <Typography className={classes.subtitulos}>Camión</Typography>
                                </div>
                                { camion ? 
                                <TextField
                                className={classes.input}
                                label="Ingrese tarifa"
                                variant="standard"
                                fullWidth
                                name="camion"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                        <LocalShippingIcon />
                                        </InputAdornment>
                                    ),
                                    }}
                                />
                                : "" }
                                </Grid>
                                <Grid item xs={11} md={4}>
                                <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                                    <Checkbox color="primary" onChange={handleChangeCheckBox} className={classes.checkBox} checked={bicicleta} name="bicicleta"/>
                                    <Typography className={classes.subtitulos}>Bicicleta</Typography>
                                </div>
                                {bicicleta ?
                                <TextField
                                className={classes.input}
                                label="Ingrese tarifa"
                                variant="standard"
                                fullWidth
                                name="bicicleta"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                        <DirectionsBikeIcon />
                                        </InputAdornment>
                                    ),
                                    }}
                                />
                                : ""}
                                </Grid>
                                <Grid item xs={11} md={4}>
                                <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                                    <Checkbox color="primary" onChange={handleChangeCheckBox} className={classes.checkBox} checked={motocicleta} name="motocicleta"/>
                                    <Typography className={classes.subtitulos}>Motocicleta</Typography>
                                </div>
                                { motocicleta ?
                                <TextField
                                className={classes.input}
                                label="Ingrese tarifa"
                                variant="standard"
                                fullWidth
                                name="motocicleta"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                        <MotorcycleIcon />
                                        </InputAdornment>
                                    ),
                                    }}
                                />
                                : ""}
                                </Grid>
                            </Grid>
                            &nbsp;
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClickCerrarModalNuevoEncargado} endIcon={<CheckIcon/>} className={classes.botonAgregar}>Agregar</Button>
                            <Button onClick={handleClickCerrarModalNuevoEncargado} className={classes.botonCancelar}>Cancelar</Button>
                        </DialogActions>
                    </Dialog>
            <Paginacion lista={playas}/>
            <Footer/>
        </>
    : <Spinner></Spinner>)
    );
}
 
export default Estacionamientos;