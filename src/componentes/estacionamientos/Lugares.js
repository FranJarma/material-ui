import React, {useState, useContext} from 'react';
import Navbar from './../diseño/Navbar.js';
import { makeStyles, Typography, Fab, Button, Card, CardContent, TextField, Grid } from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import Alert from '@material-ui/lab/Alert';
import Paginacion from './../diseño/Paginacion.js';
import CheckIcon from '@material-ui/icons/Check';
import AddIcon from '@material-ui/icons/Add';
import ForwardIcon from '@material-ui/icons/Forward';
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

const Lugares = () => {
    const classes = useStyles();
    //states para agregar nuevo lugar
    const [abrirModalNuevoLugar, setAbrirModalNuevoLugar] = useState(false);
    const handleClickAbrirModalNuevoLugar = () => {
        setAbrirModalNuevoLugar(true);
    };
    const handleClickCerrarModalNuevoLugar = () => {
        setAbrirModalNuevoLugar(false);
    };
    const lugares = [
        {
            id: 0,
            codigo: "A2B2-SDZX-661S-1ASA",
            nombre: "Lugar 1",
            descripcion: "Se encuentra junto a la entrada, del lado izquierdo",
            ocupado: 0
        },
        {
            id: 1,
            codigo: "1235-W846-ZXC2-F111",
            nombre: "Lugar 2",
            descripcion: "",
            ocupado: 1
        },
        {
            id: 2,
            codigo: "AASD-B241-ZXC5-6123",
            nombre: "Lugar 3",
            descripcion: "",
            ocupado: 1
        },
        {
            id: 3,
            codigo: "829A-LPS1-ZXC2-5462",
            nombre: "Lugar 4",
            descripcion: "",
            ocupado: 0
        },
        {
            id: 4,
            codigo: "123Z-1235-ZCAS-ÑPOA",
            nombre: "Lugar 5",
            descripcion: "",
            ocupado: 0
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
            <Typography className={classes.titulo}>Administrar lugares de mi estacionamiento</Typography>
            &nbsp;
            <Alert className={classes.alerta} severity="info" variant="filled">En esta pantalla usted podrá administrar todos los lugares disponibles dentro de su playa de estacionamiento. Además podrá liberar aquellos lugares que se encuentren ocupados en caso de necesitarlo.
            </Alert>
            <Fab className={classes.botonAgregarLugar} onClick={handleClickAbrirModalNuevoLugar} aria-label="add">
                <AddIcon /> 
            </Fab>
             &nbsp;
             <Typography className={classes.cantidad}>Total de lugares: {lugares.length}</Typography>
                {lugares.slice((pagina-1)* itemsPorPagina, pagina*itemsPorPagina).map(lugar =>(
                    <>
                    <Card className = {classes.cartaLugares}>
                        <CardActionArea>
                            <CardContent key={lugar.id}>
                                <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                                    <Typography className={classes.camposTitulos}>Codigo: </Typography>
                                    <Typography className={classes.campos}>{lugar.codigo}</Typography>
                                </div>
                                <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                                    <Typography className={classes.camposTitulos}>Nombre: </Typography>
                                    <Typography className={classes.campos}>{lugar.nombre}</Typography>
                                </div>
                                {lugar.descripcion ?
                                <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                                    <Typography className={classes.camposTitulos}>Descripción: </Typography>
                                    <Typography className={classes.campos}>{lugar.descripcion}</Typography>
                                </div>
                                : ""}
                                { lugar.ocupado ?
                                <>
                                <Button className={classes.ocupado}>Ocupado</Button>
                                <Button
                                endIcon={<ForwardIcon/>}
                                className= {classes.botonLiberarLugar}
                                >
                                Liberar lugar
                                </Button>
                                </>
                                : ""}
                            </CardContent>
                        </CardActionArea>
                    </Card>
                    </>
                    ))}
            <Dialog open={abrirModalNuevoLugar} onClose={handleClickCerrarModalNuevoLugar} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Agregar nuevo lugar</DialogTitle>
                <DialogContent>
                <DialogContentText> Ingrese nombre y descripción</DialogContentText>
                <Grid container spacing={1}>
                    <Grid item xs={12} lg={12}>
                        <TextField autoFocus className={classes.input} fullWidth label="Nombre"></TextField>
                    </Grid>
                    <Grid item xs={12} lg={12}>
                        <TextField className={classes.input} fullWidth label="Descripción"></TextField>
                    </Grid>
                </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClickCerrarModalNuevoLugar} endIcon={<CheckIcon/>} className={classes.botonConfirmar}>Agregar</Button>
                    <Button onClick={handleClickCerrarModalNuevoLugar} className={classes.botonCancelar}>Cancelar</Button>
                </DialogActions>
            </Dialog>
            {lugares.length > 0 ? <Paginacion lista={lugares}/> : ""}
            <Footer/>
        </>
    : <Spinner></Spinner>)
    );
}
 
export default Lugares;