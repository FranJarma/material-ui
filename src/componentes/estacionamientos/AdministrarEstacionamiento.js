import React, { useContext, useState, useEffect } from 'react';
import { Button, Checkbox, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography,
Input, Chip, FormControlLabel, FormHelperText } from '@material-ui/core';
import SpinnerContext from '../../context/spinner/spinnerContext';
import CheckIcon from '@material-ui/icons/Check';
import DeleteIcon from '@material-ui/icons/Delete';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import * as CGeneral from '../../constantes/general/CGeneral';
import * as CEstacionamientos from '../../constantes/estacionamientos/CEstacionamientos';
import InputMask from 'react-input-mask';
import {useStyles} from './Styles';
import Toast from '../diseño/Toast';
import Swal from '../diseño/Swal';
import { FirebaseContext } from '../../firebase';
import {
    TimePicker,
  } from '@material-ui/pickers';
import traducirError from '../../firebase/errores';
import {usePlacesWidget} from "react-google-autocomplete";
//le pasamos como props la info del usuario seleccionado con el botón, la acción (registrar / modificar) y la función para cerrar el modal
const AdministrarEstacionamiento = ({estacionamientoCompleto, accion, cerrarModal}) => {
    const classes = useStyles();
    const spinnerContext = useContext(SpinnerContext);
    const { cargando } = spinnerContext;
    const { ref: materialRef } = usePlacesWidget({
        apiKey: "AIzaSyAfSelxd1TelyS5koQS5V0HU0yGMGf5SnE",
        onPlaceSelected: (ubicacion) => {
            let direccion = "";
            let numero = "";
            let provincia = "";
            let ciudad = "";
            let codigoPostal = "";
            for(const informacion of ubicacion.address_components){
                const campos = informacion.types[0];
                switch (campos) {
                    case "street_number":
                    {
                        numero = informacion.short_name;
                        break;
                    }
                    case "route": {
                        direccion = informacion.short_name;
                        break;
                    }
                    case "postal_code": {
                        codigoPostal = `${informacion.long_name}${codigoPostal}`;
                        break;
                    }
                    case "administrative_area_level_1": {
                        provincia = informacion.short_name;
                        break;
                    }
                    case "administrative_area_level_2": {
                        ciudad = informacion.short_name;
                        break;
                      }
                }
                console.log(direccion + " " + numero)
                guardarUbicacionEstacionamiento(
                    {
                        direccion: direccion + " " + numero,
                        provincia: provincia,
                        ciudad: ciudad,
                        codigoPostal: codigoPostal,
                        latitud: ubicacion.geometry.location.lat(),
                        longitud: ubicacion.geometry.location.lng()
                })
            }
        },
        options:{
            types: ["address"],
            componentRestrictions: { country: "arg" }
        }
      });
    //state para manejar el contenido de los inputs
    const [estacionamiento, guardarEstacionamiento] = useState({
        nombreCompleto: '',
        nSucursal: '',
        telefono: '',
        cuit: '',
        valoracion: 0,  

    });
    //state para manejar la ubicacion
    const [ubicacionEstacionamiento, guardarUbicacionEstacionamiento] = useState({
        direccion: '',
        provincia: '',
        ciudad: '',
        latitud: '',
        longitud: ''
    })
    const [dia, setearDia] = useState([]);

    const handleChangeDia = (event) => {
        setearDia(event.target.value);
    };
    //state para la hora de ingreso y salida
    const [horaApertura, setearHoraApertura] = useState(null);
    const handleCambiarHoraApertura = (horaApertura) => {
        setearHoraApertura(horaApertura);
    };
    const [horaCierre, setearHoraCierre] = useState(null);
    const handleCambiarHoraCierre = (horaCierre) => {
        setearHoraCierre(horaCierre);
    };
    //state para manejar el encargado al cambiar el elemento del select
    const [encargadoSeleccionado, setearEncargadoSeleccionado] = useState('');
    const handleChangeSelectEncargado = (event) => {
        setearEncargadoSeleccionado(event.target.value);
    };
    //states para guardar encargados ubicación y días
   const [encargados, guardarEncargados] = useState([]);
   const dias = ['Lunes','Martes','Miercoles','Jueves','Viernes','Sábado','Domingo'];

   const {firebase} = useContext(FirebaseContext);
   //use effect para que constantemente traiga las provincias, departamentos y encargados
   useEffect (() => {
       const obtenerEncargados = () => {
           try {
               firebase.db.collection('usuarios').orderBy('nombreCompleto', 'asc')
               .where("esEncargado","==", true)
               .onSnapshot(manejarSnapshot); 
           } catch (error) {
               Toast(error);
           }
       }
       obtenerEncargados();
   },[])
   function manejarSnapshot(snapshot){
       if (!snapshot) return;
       const encargados = snapshot.docs.map(doc => {
           return {
               id: doc.id,
               ...doc.data()
           }
       });
       guardarEncargados(encargados);
   }

    //guardamos el contenido del state en los inputs
    const { nombreCompleto, nSucursal, telefono, cuit, valoracion} = estacionamiento;

    //evento onChange
    const onChange = (e) => {
        guardarEstacionamiento({
            ...estacionamiento,
            [e.target.name] : e.target.value,
    });

        // usuarioCompleto solamente se trae desde props para eliminar o modificarlo
        /*
        if(usuarioCompleto) {
            if (e.target.value === usuarioCompleto.nombreUsuario){
                setearDeshabilitado(false);
            }
            else {
                setearDeshabilitado(true);
            }
        }
        */
    }
    //state para manejar los checkbox
    const [check, setCheck] = useState({
        horarioCorrido: false,
        todosLosDias: false
    });
    const handleChangeCheckBox = (event) => {
        setCheck({...check, [event.target.name] : event.target.checked})
    }
    const {horarioCorrido, todosLosDias} = check;
    //state para manejar las tarifas
    //state para manejar el botón de dar de baja
    /*
    const [deshabilitado, setearDeshabilitado] = useState(true);
    // use effect para cargar los campos al querer modificar un usuario
    */
    useEffect(()=>{
        if (estacionamientoCompleto){
            guardarEstacionamiento({
                nombreCompleto: estacionamientoCompleto.nombreCompleto,
                nSucursal: estacionamientoCompleto.nSucursal,
                ubicacion: estacionamientoCompleto.ubicacion,
                telefono: estacionamientoCompleto.telefono,
                cuit: estacionamientoCompleto.cuit,
                encargado: estacionamientoCompleto.encargado,
                horario: estacionamientoCompleto.horario,
                diasApertura: estacionamientoCompleto.diasApertura,
                tarifas: estacionamientoCompleto.tarifas
            })
            setCheck({
                horarioCorrido: estacionamientoCompleto.horarioCorrido,
                todosLosDias: estacionamientoCompleto.todosLosDias
            })
        }
    }, [guardarEstacionamiento])
    //función para registrar estacionamiento
    async function registrarEstacionamiento() {
        try {
            if(nombreCompleto === '' || telefono === '' || ubicacionEstacionamiento.direccion === ''
            || encargadoSeleccionado === ''|| cuit === '' || (!horarioCorrido && horaApertura === null)
            || (!horarioCorrido && horaCierre === null) || (!todosLosDias && dia.length === 0)){
                Toast(CGeneral.COMPLETE_TODOS_LOS_CAMPOS);
            }
            else if(horaApertura > horaCierre) {
                Toast(CEstacionamientos.HORARIO_CIERRE_MENOR_APERTURA);
            }
            //se utiliza la función includes para verificar si alguno de los dos campos tiene espacio en blanco
            else if(cuit.includes('_')){
                Toast(CGeneral.VALIDACION_CUIT)
            }
            else if(telefono.includes('_')){
                Toast(CGeneral.VALIDACION_TELEFONO)
            }
            else{
                //validar si están checkeados los checks de horarioCorrido y todosLosDías
                if(horarioCorrido && todosLosDias) {
                    await firebase.registrarEstacionamiento(nombreCompleto, nSucursal, ubicacionEstacionamiento,
                    telefono, cuit, 'Horario corrido', 'Abre todos los días', 0, encargadoSeleccionado, valoracion);
                }
                else if (todosLosDias){
                    await firebase.registrarEstacionamiento(nombreCompleto, nSucursal, ubicacionEstacionamiento,
                    telefono, cuit, `De: ${horaApertura.toTimeString().substr(0,5)} a ${horaCierre.toTimeString().substr(0,5)}`
                    , 'Abre todos los días', 0, encargadoSeleccionado, valoracion);
                }
                else if (horarioCorrido){
                    await firebase.registrarEstacionamiento(nombreCompleto, nSucursal, ubicacionEstacionamiento,
                    telefono, cuit, 'Horario corrido', dia, 0, encargadoSeleccionado, valoracion);
                }
                else {
                    await firebase.registrarEstacionamiento(nombreCompleto, nSucursal, ubicacionEstacionamiento,
                    telefono, cuit, `De: ${horaApertura.toTimeString().substr(0,5)} a ${horaCierre.toTimeString().substr(0,5)}`,
                    dia, 0, encargadoSeleccionado, valoracion);
                }
                Swal(CGeneral.OPERACION_COMPLETADA, CEstacionamientos.REGISTRO_EXITOSO);
                cerrarModal();
            }
        }
        catch (error) {
            console.log(error);
            Toast(traducirError(error.code))
        }
    }
    //función para modificar estacionamiento
    async function modificarEstacionamiento() {
    }
    //función para eliminar el estacionamiento seleccionado
    async function eliminarEstacionamiento() {
    }
    return ( 
    ((!cargando && accion === "Registrar") || (!cargando && accion === "Modificar")? 
    <>
        <form>
            <Grid container spacing={3}>
                <Grid item lg={6} xs={12}> 
                    <TextField
                        className = {classes.inputNuevoEstacionamiento}
                        fullWidth
                        type="text"
                        autoFocus
                        value={nombreCompleto}
                        name="nombreCompleto"
                        variant="outlined"
                        label={CGeneral.NOMBRE_COMPLETO}
                        onChange={onChange}
                    ></TextField>
                </Grid>
                <Grid item lg={3} xs={6}>
                    <InputMask
                    mask="99-99-999-999-9"
                    value={cuit}
                    onChange={onChange}
                    >
                        {() => <TextField
                            className = {classes.inputNuevoEstacionamiento}
                            type="text"
                            fullWidth
                            name="cuit"
                            variant="outlined"
                            label={CGeneral.CUIT}
                        />
                        }
                    </InputMask>
                </Grid>
                <Grid item lg={3} xs={6}>
                    <InputMask
                    mask="(+54) 9999999999"
                    value={telefono}
                    onChange={onChange}
                    >
                        {() => <TextField
                            className = {classes.inputNuevoEstacionamiento}
                            type="text"
                            fullWidth
                            name="telefono"
                            variant="outlined"
                            label={CGeneral.TELEFONO}
                        />
                        }
                    </InputMask>
                </Grid>
                <Grid item lg={12} xs={12}> 
                    <TextField
                        className = {classes.inputNuevoEstacionamiento}
                        fullWidth
                        type="text"
                        variant="outlined"
                        label="Ubicación"
                        inputRef={materialRef}
                    ></TextField>
                </Grid>
                <Grid item lg={6} xs={6}>
                    <TextField
                    fullWidth
                    disabled
                    value={ubicacionEstacionamiento.provincia}
                    variant="outlined"
                    label="Provincia"
                    >
                    </TextField>
                </Grid>
                <Grid item lg={6} xs={6}>
                    <TextField
                    fullWidth
                    disabled
                    value={ubicacionEstacionamiento.ciudad}
                    variant="outlined"
                    label="Ciudad/Localidad"
                    >
                    </TextField>
                </Grid>
                <Grid item lg={12} xs={12}>
                    <TextField
                    fullWidth
                    className={classes.inputNuevoEstacionamiento}
                    variant="outlined"
                    label="Encargado"
                    onChange={handleChangeSelectEncargado}
                    value={encargadoSeleccionado}
                    select
                    >
                    {encargados.map((encargado) => (
                        <MenuItem key={encargado.id} value={encargado.nombreCompleto}>
                            {encargado.nombreCompleto}
                        </MenuItem>
                    ))}
                    </TextField>
                </Grid>
            </Grid>
            <InputLabel><p style={{fontWeight: 'bold'}}>Tarifas:</p></InputLabel>
                <Grid container spacing={3}>
                    <Grid item md={3} xs={6}>
                        <InputMask
                        mask="9999"
                        onChange={onChange}
                        >
                            {() => <TextField
                                className = {classes.inputNuevoEstacionamiento}
                                type="text"
                                fullWidth
                                name="tarifas"
                                variant="outlined"
                                label="Camioneta"
                            />
                            }
                        </InputMask>
                    </Grid>
                    <Grid item md={3} xs={6}>
                        <InputMask
                        mask="9999"
                        onChange={onChange}
                        >
                            {() => <TextField
                                className = {classes.inputNuevoEstacionamiento}
                                type="text"
                                fullWidth
                                name="tarifas"
                                variant="outlined"
                                label="Auto"
                            />
                            }
                        </InputMask>
                    </Grid>
                    <Grid item md={3} xs={6}>
                        <InputMask
                        mask="9999"
                        onChange={onChange}
                        >
                            {() => <TextField
                                className = {classes.inputNuevoEstacionamiento}
                                type="text"
                                fullWidth
                                name="tarifas"
                                variant="outlined"
                                label="Motocicleta"
                            />
                            }
                        </InputMask>
                    </Grid>
                    <Grid item md={3} xs={6}>
                        <InputMask
                        mask="9999"
                        onChange={onChange}
                        >
                            {() => <TextField
                                className = {classes.inputNuevoEstacionamiento}
                                type="text"
                                fullWidth
                                name="tarifas"
                                variant="outlined"
                                label="Traffic"
                            />
                            }
                        </InputMask>
                    </Grid>
                </Grid>
            <InputLabel><p style={{fontWeight: 'bold'}}>Horarios:</p></InputLabel>
            <FormControlLabel
                control={<Checkbox color="primary" checked={horarioCorrido} onChange={handleChangeCheckBox}
                name="horarioCorrido" />}
                label="Horario corrido"
            />
            &nbsp;
            { !horarioCorrido ?
            <>
            <Grid container spacing={3}>
                <Grid item md={3} xs={6}>
                    <TimePicker
                        format="HH:mm"
                        ampm={false}
                        className={classes.inputNuevoEstacionamiento}
                        inputVariant="outlined"
                        value={horaApertura}
                        fullWidth
                        label="Hora de apertura"
                        onChange={handleCambiarHoraApertura}
                        margin="dense"
                    />
                </Grid>
                <Grid item md={3} xs={6}>
                    <TimePicker
                        format="HH:mm"
                        ampm={false}
                        className={classes.inputNuevoEstacionamiento}
                        inputVariant="outlined"
                        value={horaCierre}
                        fullWidth
                        label="Hora de cierre"
                        onChange={handleCambiarHoraCierre}
                        margin="dense"
                    />
                </Grid>
            </Grid>
            </>
            : ""}
            <InputLabel><p style={{fontWeight: 'bold'}}>Días de apertura:</p></InputLabel>
            <FormControlLabel
                control={<Checkbox color="primary" checked={todosLosDias} onChange={handleChangeCheckBox}
                name="todosLosDias" />}
                label="Todos los días"
            />
            &nbsp;
            { !todosLosDias ?
                <>
                <Grid item lg={6} xs={12}>
                <FormControl className={classes.formControl}>
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
                {dias.map((dia) => (
                    <MenuItem key={dia} value={dia}>
                    {dia}
                </MenuItem>
                    
                ))}
                </Select>
                <FormHelperText>Seleccione uno o varios</FormHelperText>
                </FormControl>
                </Grid>
                </>
            : ""}
            <Button style={{marginTop: '2rem'}} onClick={accion === "Registrar" ? registrarEstacionamiento : modificarEstacionamiento}
            endIcon={accion === "Registrar" ? <CheckIcon/> : <AssignmentTurnedInIcon/>}
            className={classes.botonAgregar}>{accion === "Registrar" ? "Agregar" : "Modificar"}</Button>
        </form>
    </>
    :
    <Grid item lg={12}>
        <TextField
            className={classes.inputDarDeBaja}
            type="text"
            fullWidth
            autoFocus
            variant="outlined"
            label={CGeneral.NOMBRE_USUARIO}
            onChange={onChange}
        ></TextField>
        <Button onClick={eliminarEstacionamiento}
        fullWidth
        endIcon={<DeleteIcon/>}
        className={classes.botonDarDeBajaModal}>Dar de baja</Button>
    </Grid>)
);
}
export default AdministrarEstacionamiento;