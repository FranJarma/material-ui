import React, {useState, useEffect, useContext} from 'react';
import {FirebaseContext} from './../../firebase/';
import Navbar from '../diseño/Navbar.js';
import { 
Typography, Button, Grid, Card, FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox, CardActionArea, CardContent, FormHelperText } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import Footer from '../diseño/Footer.js';
import * as CGeneral from '../../constantes/general/CGeneral';
import {useStyles} from './Styles';
import * as CEstacionamientos from '../../constantes/estacionamientos/CEstacionamientos';
import Toast from '../diseño/Toast';
import Swal from '../diseño/Swal';
import traducirError from '../../firebase/errores';
import { TimePicker } from '@material-ui/pickers';

const AdministrarHorasDias = () => {
    const {firebase} = useContext(FirebaseContext);
    let band = 1;
    const [estacionamientoInfo, guardarEstacionamientoInfo] = useState({
        id: '',
        horarios: [{
            apertura: '',
            cierre: '',
            dia: ''
        }]
    })
    const {id, horarios } = estacionamientoInfo;

    const [state, setState] = useState({
        lunes: false,
        martes: false,
        miercoles: false,
        jueves: false,
        viernes: false,
        sabado: false,
        domingo: false
    });
    const { lunes, martes, miercoles, jueves, viernes, sabado, domingo } = state;
    //state para las horas de apertura y cierre
    const [aperturaLunes, setearAperturaLunes] = useState(new Date());
    const [aperturaMartes, setearAperturaMartes] = useState(new Date());
    const [aperturaMiercoles, setearAperturaMiercoles] = useState(new Date());
    const [aperturaJueves, setearAperturaJueves] = useState(new Date());
    const [aperturaViernes, setearAperturaViernes] = useState(new Date());
    const [aperturaSabado, setearAperturaSabado] = useState(new Date());
    const [aperturaDomingo, setearAperturaDomingo] = useState(new Date());
    const [cierreLunes, setearCierreLunes] = useState(new Date());
    const [cierreMartes, setearCierreMartes] = useState(new Date());
    const [cierreMiercoles, setearCierreMiercoles] = useState(new Date());
    const [cierreJueves, setearCierreJueves] = useState(new Date());
    const [cierreViernes, setearCierreViernes] = useState(new Date());
    const [cierreSabado, setearCierreSabado] = useState(new Date());
    const [cierreDomingo, setearCierreDomingo] = useState(new Date());

    const handleCambiarAperturaLunes = (aperturaLunes) => {
        setearAperturaLunes(aperturaLunes);
    };
    const handleCambiarCierreLunes = (cierreLunes) => {
        setearCierreLunes(cierreLunes);
    };
    const handleCambiarAperturaMartes = (aperturaMartes) => {
        setearAperturaMartes(aperturaMartes);
    };
    const handleCambiarCierreMartes = (cierreMartes) => {
        setearCierreMartes(cierreMartes);
    };
    const handleCambiarAperturaMiercoles = (aperturaMiercoles) => {
        setearAperturaMiercoles(aperturaMiercoles);
    };
    const handleCambiarCierreMiercoles = (cierreMiercoles) => {
        setearCierreMiercoles(cierreMiercoles);
    };
    const handleCambiarAperturaJueves = (aperturaJueves) => {
        setearAperturaJueves(aperturaJueves);
    };
    const handleCambiarCierreJueves = (cierreJueves) => {
        setearCierreJueves(cierreJueves);
    };
    const handleCambiarAperturaViernes = (aperturaViernes) => {
        setearAperturaViernes(aperturaViernes);
    };
    const handleCambiarCierreViernes = (cierreViernes) => {
        setearCierreViernes(cierreViernes);
    };
    const handleCambiarAperturaSabado = (aperturaSabado) => {
        setearAperturaSabado(aperturaSabado);
    };
    const handleCambiarCierreSabado = (cierreSabado) => {
        setearCierreSabado(cierreSabado);
    };
    const handleCambiarAperturaDomingo = (aperturaDomingo) => {
        setearAperturaDomingo(aperturaDomingo);
    };
    const handleCambiarCierreDomingo = (cierreDomingo) => {
        setearCierreDomingo(cierreDomingo);
    };
    
    const handleChangeCheckBox = (e) => {
        setState({
            ...state,
            [e.target.name] : e.target.checked
        })
    }

    useEffect(()=>{
        async function obtenerInfoEstacionamiento () {
            try {
                await firebase.db.collection('estacionamientos')
                .where('encargado','==', localStorage.getItem('usuario'))
                .onSnapshot(manejarSnapshot);
            } catch (error) {
                console.log(error);
            }
        }
        obtenerInfoEstacionamiento();
        },[guardarEstacionamientoInfo])
        function manejarSnapshot(snapshot){
        if (!snapshot) return;
        const resultado = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        });
        guardarEstacionamientoInfo({
            id: resultado[0].id,
            horarios: resultado[0].horarios
        });
        console.log(resultado[0].horarios);
    }
    //función para modificar estacionamiento
    async function modificarEstacionamiento() {
        try {
            if(!lunes && !martes && !miercoles && !jueves && !viernes && !sabado && !domingo)
            {
                Toast(CGeneral.SELECCIONE_DIAS);
            }
            else if ((aperturaLunes > cierreLunes) || (aperturaMartes > cierreMartes) || (aperturaMiercoles > cierreMiercoles)
            || (aperturaJueves > cierreJueves) || (aperturaViernes > cierreViernes) || (aperturaSabado > cierreSabado)
            || (aperturaDomingo > cierreDomingo) ) {
                Toast(CEstacionamientos.HORARIO_CIERRE_MENOR_APERTURA)
            }
            else {
                await firebase.modificarHorarios(id, aperturaLunes.toTimeString(), aperturaMartes.toTimeString(), aperturaMiercoles.toTimeString(),
                aperturaJueves.toTimeString(), aperturaViernes.toTimeString(), aperturaSabado.toTimeString(), aperturaDomingo.toTimeString(), cierreLunes.toTimeString(), cierreMartes.toTimeString(), cierreMiercoles.toTimeString(), cierreJueves.toTimeString(),
                cierreViernes.toTimeString(), cierreSabado.toTimeString(), cierreDomingo.toTimeString());
                console.log(id);
                Swal(CGeneral.OPERACION_COMPLETADA, CEstacionamientos.ESTACIONAMIENTO_MODIFICADO);
                }

            }
        catch (error) {
            console.log(error);
            Toast(traducirError(error.code))
        }
    }
    const classes = useStyles();
    return ( 
        <>  
        <Navbar/>
        <Typography className={classes.titulo}>Horarios y días de apertura</Typography>
        &nbsp;
        <Card className={classes.cartaMiEstacionamiento}>
        &nbsp;
        <Typography style={{fontWeight: 'bold', fontFamily: 'Roboto Condensed', marginBottom: '1rem', marginTop: '1rem'}}>Seleccione días de la semana y horas de apertura y cierre</Typography>
            <FormControl component="fieldset" className={classes.formControl}>
            <FormGroup>
            <Grid container spacing={2}>
                <Grid item lg={2}>
                    <FormControlLabel
                        style={{paddingTop: 10 }}
                        control={<Checkbox color="primary" checked={lunes} onChange={handleChangeCheckBox} name="lunes" />}
                        label="Lunes"
                    />
                </Grid>
                { lunes ?
                <>
                <Grid item lg={3} xs={12}>
                    <TimePicker
                        className={classes.inputNuevoEstacionamiento}
                        inputVariant="outlined"
                        minutesStep={5}
                        fullWidth
                        label="Apertura"
                        value={aperturaLunes}
                        onChange={handleCambiarAperturaLunes}
                        margin="dense"
                    />
                </Grid>
                <Grid item lg={3} xs={12}>
                    <TimePicker
                        className={classes.inputNuevoEstacionamiento}
                        inputVariant="outlined"
                        minutesStep={5}
                        fullWidth
                        label="Cierre"
                        value={cierreLunes}
                        onChange={handleCambiarCierreLunes}
                        margin="dense"
                    />
                </Grid>
                </>
                : ""}
            </Grid>
            <Grid container spacing={2}>
                <Grid item lg={2}>
                    <FormControlLabel
                    style={{paddingTop: 10 }}
                    control={<Checkbox color="primary"  checked={martes} onChange={handleChangeCheckBox} name="martes" />}
                    label="Martes"
                    />
                </Grid>
                {martes ?
                <>
                <Grid item lg={3} xs={12}>
                    <TimePicker
                        className={classes.inputNuevoEstacionamiento}
                        inputVariant="outlined"
                        minutesStep={5}
                        fullWidth
                        label="Apertura"
                        value={aperturaMartes}
                        onChange={handleCambiarAperturaMartes}
                        margin="dense"
                    />
                </Grid>
                <Grid item lg={3} xs={12}>
                    <TimePicker
                        className={classes.inputNuevoEstacionamiento}
                        inputVariant="outlined"
                        minutesStep={5}
                        fullWidth
                        label="Cierre"
                        value={cierreMartes}
                        onChange={handleCambiarCierreMartes}
                        margin="dense"
                    />
                </Grid>
                </>
                : ""}
            </Grid>
            <Grid container spacing={2}>
                <Grid item lg={2}>
                    <FormControlLabel
                    style={{paddingTop: 10 }}
                    control={<Checkbox color="primary" checked={miercoles} onChange={handleChangeCheckBox} name="miercoles" />}
                    label="Miercoles"
                    />
                </Grid>
                {miercoles ?
                <>
                <Grid item lg={3} xs={12}>
                    <TimePicker
                        className={classes.inputNuevoEstacionamiento}
                        inputVariant="outlined"
                        minutesStep={5}
                        fullWidth
                        label="Apertura"
                        value={aperturaMiercoles}
                        onChange={handleCambiarAperturaMiercoles}
                        margin="dense"
                    />
                </Grid>
                <Grid item lg={3} xs={12}>
                    <TimePicker
                        className={classes.inputNuevoEstacionamiento}
                        inputVariant="outlined"
                        minutesStep={5}
                        fullWidth
                        label="Cierre"
                        value={cierreMiercoles}
                        onChange={handleCambiarCierreMiercoles}
                        margin="dense"
                    />
                </Grid>
                </>
                : ""}
            </Grid>
            <Grid container spacing={2}>
                <Grid item lg={2}>
                    <FormControlLabel
                    style={{paddingTop: 10 }}
                    control={<Checkbox color="primary" checked={jueves} onChange={handleChangeCheckBox} name="jueves" />}
                    label="Jueves"
                    />
                </Grid>
                {jueves ?
                <>
                <Grid item lg={3} xs={12}>
                    <TimePicker
                        className={classes.inputNuevoEstacionamiento}
                        inputVariant="outlined"
                        minutesStep={5}
                        fullWidth
                        label="Apertura"
                        value={aperturaJueves}
                        onChange={handleCambiarAperturaJueves}
                        margin="dense"
                    />
                </Grid>
                <Grid item lg={3} xs={12}>
                    <TimePicker
                        className={classes.inputNuevoEstacionamiento}
                        inputVariant="outlined"
                        minutesStep={5}
                        fullWidth
                        label="Cierre"
                        value={cierreJueves}
                        onChange={handleCambiarCierreJueves}
                        margin="dense"
                    />
                </Grid>
                </>
                : "" }
            </Grid>
            <Grid container spacing={2}>
                <Grid item lg={2}>
                    <FormControlLabel
                    style={{paddingTop: 10 }}
                    control={<Checkbox color="primary" checked={viernes} onChange={handleChangeCheckBox} name="viernes" />}
                    label="Viernes"
                    />
                </Grid>
                {viernes ?
                <>
                <Grid item lg={3} xs={12}>
                    <TimePicker
                        className={classes.inputNuevoEstacionamiento}
                        inputVariant="outlined"
                        minutesStep={5}
                        fullWidth
                        label="Apertura"
                        value={aperturaViernes}
                        onChange={handleCambiarAperturaViernes}
                        margin="dense"
                    />
                </Grid>
                <Grid item lg={3} xs={12}>
                    <TimePicker
                        className={classes.inputNuevoEstacionamiento}
                        inputVariant="outlined"
                        minutesStep={5}
                        fullWidth
                        label="Cierre"
                        value={cierreViernes}
                        onChange={handleCambiarCierreViernes}
                        margin="dense"
                    />
                </Grid>
                </>
                : ""}
            </Grid>
            <Grid container spacing={2}>
                <Grid item lg={2}>
                    <FormControlLabel
                    style={{paddingTop: 10 }}
                    control={<Checkbox color="primary" checked={sabado} onChange={handleChangeCheckBox} name="sabado" />}
                    label="Sabado"
                    />
                </Grid>
                {sabado ? 
                <>
                <Grid item lg={3} xs={12}>
                    <TimePicker
                        className={classes.inputNuevoEstacionamiento}
                        inputVariant="outlined"
                        minutesStep={5}
                        fullWidth
                        label="Apertura"
                        value={aperturaSabado}
                        onChange={handleCambiarAperturaSabado}
                        margin="dense"
                    />
                </Grid>
                <Grid item lg={3} xs={12}>
                    <TimePicker
                        className={classes.inputNuevoEstacionamiento}
                        inputVariant="outlined"
                        minutesStep={5}
                        fullWidth
                        label="Cierre"
                        value={cierreSabado}
                        onChange={handleCambiarCierreSabado}
                        margin="dense"
                    />
                </Grid>
                </>
                : "" }
            </Grid>
            <Grid container spacing={2}>
                <Grid item lg={2}>
                    <FormControlLabel
                    style={{paddingTop: 10 }}
                    control={<Checkbox color="primary" checked={domingo} onChange={handleChangeCheckBox} name="domingo" />}
                    label="Domingo"
                    />
                </Grid>
                {domingo ?
                <>
                <Grid item lg={3} xs={12}>
                    <TimePicker
                        className={classes.inputNuevoEstacionamiento}
                        inputVariant="outlined"
                        minutesStep={5}
                        fullWidth
                        label="Apertura"
                        value={aperturaDomingo}
                        onChange={handleCambiarAperturaDomingo}
                        margin="dense"
                    />
                </Grid>
                <Grid item lg={3} xs={12}>
                    <TimePicker
                        className={classes.inputNuevoEstacionamiento}
                        inputVariant="outlined"
                        minutesStep={5}
                        fullWidth
                        label="Cierre"
                        value={cierreDomingo}
                        onChange={handleCambiarCierreDomingo}
                        margin="dense"
                    />
                </Grid>
                </>
                : "" }
            </Grid>
            </FormGroup>
        </FormControl>
            <Button
                onClick={modificarEstacionamiento}
                endIcon={<CheckIcon/>}
                className= {classes.botonModificarDatosMiEstacionamiento}>Modificar datos
            </Button>
        </Card>
        &nbsp;
        <Footer/>
    </>
     );
}
 
export default AdministrarHorasDias;