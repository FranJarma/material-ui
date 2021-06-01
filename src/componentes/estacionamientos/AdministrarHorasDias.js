import React, {useState, useEffect, useContext} from 'react';
import {FirebaseContext} from './../../firebase/';
import Navbar from '../diseño/Navbar.js';
import { 
Typography, Button, TextField, Grid, Card, FormHelperText, FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox } from '@material-ui/core';
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
    const {usuario, firebase} = useContext(FirebaseContext);
    const [estacionamientoInfo, guardarEstacionamientoInfo] = useState({
        id: '',
        diasApertura: [],
        horaApertura: '',
        horaCierre: '',
        horarioCorrido: false,
        todosLosDias: false
    });
    const {id, diasApertura, horario, horarioCorrido, todosLosDias } = estacionamientoInfo;

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

    const handleChangeCheckBox = (e) => {
        setState({
            ...state,
            [e.target.name] : e.target.checked
        })
    }
    //evento onChange
    const onChange = (e) => {
        guardarEstacionamientoInfo({
            ...estacionamientoInfo,
            [e.target.name] : e.target.value
        });
    };

    useEffect(()=>{
        const obtenerInfoEstacionamiento = () => {
            try {
                firebase.db.collection('estacionamientos')
                .where('encargado','==', usuario.uid)
                .onSnapshot(manejarSnapshot);
            } catch (error) {
                console.log(error);
            }
        }
        obtenerInfoEstacionamiento();
        },[])
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
            diasApertura: resultado[0].diasApertura,
            horaApertura: resultado[0].horaApertura,
            horaCierre: resultado[0].horaCierre,
            todosLosDias: resultado[0].todosLosDias,
            horarioCorrido: resultado[0].horarioCorrido
        });
        console.log(resultado[0]);
    }
    //función para modificar estacionamiento
    async function modificarEstacionamiento() {
        try {
            if(diasApertura === '')
            {
                Toast(CGeneral.COMPLETE_TODOS_LOS_CAMPOS);
            }
            else {
                /*solo se puede modificar el teléfono, cuit, la descripción, la URl de la imagen
                y las tarifas*/
                await firebase.modificarMiEstacionamiento(id);
                console.log(id);
                Swal(CGeneral.OPERACION_COMPLETADA, CEstacionamientos.ESTACIONAMIENTO_MODIFICADO);
            }
        }
        catch (error) {
            console.log(error.code);
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
                <Grid item lg={4}>
                    <FormControlLabel
                        style={{paddingTop: 10 }}
                        control={<Checkbox color="primary" checked={lunes} onChange={handleChangeCheckBox} name="lunes" />}
                        label="Lunes"
                    />
                </Grid>
                { lunes ?
                <>
                <Grid item lg={4} sm={6} xs={12}>
                    <TimePicker
                        format="HH:mm"
                        ampm={false}
                        className={classes.inputNuevoEstacionamiento}
                        inputVariant="outlined"
                        fullWidth
                        label="Apertura"
                        margin="dense"
                    />
                </Grid>
                <Grid item lg={4} sm={6} xs={12}>
                    <TimePicker
                        format="HH:mm"
                        ampm={false}
                        className={classes.inputNuevoEstacionamiento}
                        inputVariant="outlined"
                        fullWidth
                        label="Cierre"
                        margin="dense"
                    />
                </Grid>
                </>
                : ""}
            </Grid>
            <Grid container spacing={2}>
                <Grid item lg={4}>
                    <FormControlLabel
                    style={{paddingTop: 10 }}
                    control={<Checkbox color="primary"  checked={martes} onChange={handleChangeCheckBox} name="martes" />}
                    label="Martes"
                    />
                </Grid>
                {martes ?
                <>
                <Grid item lg={4} sm={6} xs={12}>
                    <TimePicker
                        format="HH:mm"
                        ampm={false}
                        className={classes.inputNuevoEstacionamiento}
                        inputVariant="outlined"
                        fullWidth
                        label="Apertura"
                        margin="dense"
                    />
                </Grid>
                <Grid item lg={4} sm={6} xs={12}>
                    <TimePicker
                        format="HH:mm"
                        ampm={false}
                        className={classes.inputNuevoEstacionamiento}
                        inputVariant="outlined"
                        fullWidth
                        label="Cierre"
                        margin="dense"
                    />
                </Grid>
                </>
                : ""}
            </Grid>
            <Grid container spacing={2}>
                <Grid item lg={4}>
                    <FormControlLabel
                    style={{paddingTop: 10 }}
                    control={<Checkbox color="primary" checked={miercoles} onChange={handleChangeCheckBox} name="miercoles" />}
                    label="Miercoles"
                    />
                </Grid>
                {miercoles ?
                <>
                <Grid item lg={4} sm={6} xs={12}>
                    <TimePicker
                        format="HH:mm"
                        ampm={false}
                        className={classes.inputNuevoEstacionamiento}
                        inputVariant="outlined"
                        fullWidth
                        label="Apertura"
                        margin="dense"
                    />
                </Grid>
                <Grid item lg={4} sm={6} xs={12}>
                    <TimePicker
                        format="HH:mm"
                        ampm={false}
                        className={classes.inputNuevoEstacionamiento}
                        inputVariant="outlined"
                        fullWidth
                        label="Cierre"
                        margin="dense"
                    />
                </Grid>
                </>
                : ""}
            </Grid>
            <Grid container spacing={2}>
                <Grid item lg={4}>
                    <FormControlLabel
                    style={{paddingTop: 10 }}
                    control={<Checkbox color="primary" checked={jueves} onChange={handleChangeCheckBox} name="jueves" />}
                    label="Jueves"
                    />
                </Grid>
                {jueves ?
                <>
                <Grid item lg={4} sm={6} xs={12}>
                    <TimePicker
                        format="HH:mm"
                        ampm={false}
                        className={classes.inputNuevoEstacionamiento}
                        inputVariant="outlined"
                        fullWidth
                        label="Apertura"
                        margin="dense"
                    />
                </Grid>
                <Grid item lg={4} sm={6} xs={12}>
                    <TimePicker
                        format="HH:mm"
                        ampm={false}
                        className={classes.inputNuevoEstacionamiento}
                        inputVariant="outlined"
                        fullWidth
                        label="Cierre"
                        margin="dense"
                    />
                </Grid>
                </>
                : "" }
            </Grid>
            <Grid container spacing={2}>
                <Grid item lg={4}>
                    <FormControlLabel
                    style={{paddingTop: 10 }}
                    control={<Checkbox color="primary" checked={viernes} onChange={handleChangeCheckBox} name="viernes" />}
                    label="Viernes"
                    />
                </Grid>
                {viernes ?
                <>
                <Grid item lg={4} sm={6} xs={12}>
                    <TimePicker
                        format="HH:mm"
                        ampm={false}
                        className={classes.inputNuevoEstacionamiento}
                        inputVariant="outlined"
                        fullWidth
                        label="Apertura"
                        margin="dense"
                    />
                </Grid>
                <Grid item lg={4} sm={6} xs={12}>
                    <TimePicker
                        format="HH:mm"
                        ampm={false}
                        className={classes.inputNuevoEstacionamiento}
                        inputVariant="outlined"
                        fullWidth
                        label="Cierre"
                        margin="dense"
                    />
                </Grid>
                </>
                : ""}
            </Grid>
            <Grid container spacing={2}>
                <Grid item lg={4}>
                    <FormControlLabel
                    style={{paddingTop: 10 }}
                    control={<Checkbox color="primary" checked={sabado} onChange={handleChangeCheckBox} name="sabado" />}
                    label="Sabado"
                    />
                </Grid>
                {sabado ? 
                <>
                <Grid item lg={4} sm={6} xs={12}>
                    <TimePicker
                        format="HH:mm"
                        ampm={false}
                        className={classes.inputNuevoEstacionamiento}
                        inputVariant="outlined"
                        fullWidth
                        label="Apertura"
                        margin="dense"
                    />
                </Grid>
                <Grid item lg={4} sm={6} xs={12}>
                    <TimePicker
                        format="HH:mm"
                        ampm={false}
                        className={classes.inputNuevoEstacionamiento}
                        inputVariant="outlined"
                        fullWidth
                        label="Cierre"
                        margin="dense"
                    />
                </Grid>
                </>
                : "" }
            </Grid>
            <Grid container spacing={2}>
                <Grid item lg={4}>
                    <FormControlLabel
                    style={{paddingTop: 10 }}
                    control={<Checkbox color="primary" checked={domingo} onChange={handleChangeCheckBox} name="domingo" />}
                    label="Domingo"
                    />
                </Grid>
                {domingo ?
                <>
                <Grid item lg={4} sm={6} xs={12}>
                    <TimePicker
                        format="HH:mm"
                        ampm={false}
                        className={classes.inputNuevoEstacionamiento}
                        inputVariant="outlined"
                        fullWidth
                        label="Apertura"
                        margin="dense"
                    />
                </Grid>
                <Grid item lg={4} sm={6} xs={12}>
                    <TimePicker
                        format="HH:mm"
                        ampm={false}
                        className={classes.inputNuevoEstacionamiento}
                        inputVariant="outlined"
                        fullWidth
                        label="Cierre"
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