import React, {useState} from 'react';
import Navbar from './../diseño/Navbar.js';
import { makeStyles, Typography, Fab, Button, Card, CardContent, TextField, Grid } from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import Alert from '@material-ui/lab/Alert';
import Paginacion from './../diseño/Paginacion.js';
import CheckIcon from '@material-ui/icons/Check';
import AddIcon from '@material-ui/icons/Add';
import Footer from '../diseño/Footer.js';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles((theme) => ({
    titulo: {
        fontFamily: "Roboto Condensed, sans-serif",
        textTransform: "uppercase",
        fontSize: 25,
        textAlign: "center"
    },
    cartaLugares: {
        flexGrow: 1,
        marginBottom: "1rem",
        boxShadow: "0 2px 3px rgba(0,0,0,0.25), 0 0 3px rgba(0,0,0,0.22)",
        backgroundColor: theme.palette.background.paper,
        marginLeft: "1rem",
        marginRight: "1rem"
    },
    botonAgregarLugar: {
        backgroundColor: "#43a047",
        float:"right",
        marginTop: "1rem",
        marginRight: "1rem",
        color: "#FFFFFF",
        "&:hover": {
            backgroundColor: "#43a047"
        }
    },
    botonCancelar: {
        color: "#000000",
        fontFamily: "Roboto Condensed, sans-serif",
        textTransform: "uppercase",
        marginTop: "1rem",
        marginLeft: "auto",
        alignContent: "auto"
    },
    alerta:{
        position: "relative",
        marginLeft: "1rem",
        marginRight: "1rem",
        borderRadius: 0
    },
    input: {
        "& .MuiFormLabel-root.Mui-focused": {
            color: "#43a047"
        },
        "& .MuiInput-underline:after": {
            borderBottomColor: "#43a047"
        },
    },
    camposTitulos: {
        fontFamily: "Roboto Condensed, sans-serif",
        color: "#9e9e9e",
        fontWeight: "bold",
        padding: "0.1rem",
        fontSize: 16,
    },
    campos: {
        fontFamily: "Roboto Condensed, sans-serif",
        color: "#9e9e9e",
        fontSize: 15,
        display: "flex",
        flexWrap: "wrap"
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
            descripcion: "Se encuentra junto a la entrada, del lado izquierdo"
        },
        {
            id: 1,
            codigo: "1235-W846-ZXC2-F111",
            nombre: "Lugar 2",
            descripcion: ""
        },
        {
            id: 2,
            codigo: "AASD-B241-ZXC5-6123",
            nombre: "Lugar 3",
            descripcion: ""
        },
        {
            id: 3,
            codigo: "829A-LPS1-ZXC2-5462",
            nombre: "Lugar 4",
            descripcion: ""
        },
        {
            id: 4,
            codigo: "123Z-1235-ZCAS-ÑPOA",
            nombre: "Lugar 5",
            descripcion: ""
        },
    ];
    return (
        <>
            <Navbar/>
            <Typography className={classes.titulo}>Administrar lugares de mi estacionamiento</Typography>
            &nbsp;
            <Alert className={classes.alerta} severity="info" variant="filled">En esta pantalla usted podrá administrar todos los lugares disponibles dentro de su playa de estacionamiento.
            </Alert>
            <Fab className={classes.botonAgregarLugar} onClick={handleClickAbrirModalNuevoLugar} aria-label="add">
                <AddIcon /> 
            </Fab>
             &nbsp;
             <Typography className={classes.cantidad}>Total de lugares: {lugares.length}</Typography>
                    {lugares.map(lugar =>(
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
                            </CardContent>
                        </CardActionArea>
                    </Card>
                    </>
                    ))}
            <Paginacion/>
            <Dialog open={abrirModalNuevoLugar} onClose={handleClickCerrarModalNuevoLugar} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Agregar nuevo lugar</DialogTitle>
                <DialogContent>
                <DialogContentText> Ingrese nombre y descripción</DialogContentText>
                <Grid container spacing={1}>
                    <Grid item lg={12}>
                        <TextField autoFocus className={classes.input} fullWidth label="Nombre"></TextField>
                    </Grid>
                    <Grid item lg={12}>
                        <TextField className={classes.input} fullWidth label="Descripción"></TextField>
                    </Grid>
                </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClickCerrarModalNuevoLugar} endIcon={<CheckIcon/>} className={classes.botonAgregarLugar}>Agregar</Button>
                    <Button onClick={handleClickCerrarModalNuevoLugar} className={classes.botonCancelar}>Cancelar</Button>
                </DialogActions>
            </Dialog>
            <Footer/>
        </>
    );
}
 
export default Lugares;