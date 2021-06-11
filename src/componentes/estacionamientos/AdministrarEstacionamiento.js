import React, { useContext, useState, useEffect } from 'react';
import { Button, Checkbox, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography,
Input, Chip, FormControlLabel, FormHelperText, InputAdornment } from '@material-ui/core';
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
import traducirError from '../../firebase/errores';
import {usePlacesWidget} from "react-google-autocomplete";
//le pasamos como props la info del usuario seleccionado con el botón, la acción (registrar / modificar) y la función para cerrar el modal
const AdministrarEstacionamiento = ({estacionamientoCompleto, accion, cerrarModal}) => {
    console.log(estacionamientoCompleto)
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
        nombreEstacionamientoDarDeBaja: '',
        nSucursal: '',
        telefono: '',
        cuit: '',
        cantidadLugares: '',
    });
    //state para manejar la ubicacion
    const [ubicacionEstacionamiento, guardarUbicacionEstacionamiento] = useState({
        direccion: '',
        provincia: '',
        ciudad: '',
        latitud: '',
        longitud: ''
    })
    //state para manejar el botón de dar de baja
    const [deshabilitado, setearDeshabilitado] = useState(true);
    //state para manejar el encargado al cambiar el elemento del select
    const [encargadoSeleccionado, setearEncargadoSeleccionado] = useState('');
    const handleChangeSelectEncargado = (event) => {
        setearEncargadoSeleccionado(event.target.value);
    };
    //states para guardar encargados ubicación y días
   const [encargados, guardarEncargados] = useState([]);

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
    const { nombreCompleto, nombreEstacionamientoDarDeBaja, nSucursal, telefono, cuit, cantidadLugares } = estacionamiento;

    //evento onChange
    const onChange = (e) => {
        guardarEstacionamiento({
            ...estacionamiento,
            [e.target.name] : e.target.value,
    });

    // estacionamientoCompleto solamente se trae desde props para eliminar o modificarlo
    if(estacionamientoCompleto) {
        if (e.target.value === estacionamientoCompleto.nombreCompleto){
            setearDeshabilitado(false);
        }
        else {
            setearDeshabilitado(true);
        }
    }
    }

    // use effect para cargar los campos al querer modificar un usuario
    useEffect(()=>{
        if (estacionamientoCompleto){
            guardarEstacionamiento({
                nombreCompleto: estacionamientoCompleto.nombreCompleto,
                nSucursal: estacionamientoCompleto.nSucursal,
                ubicacion: estacionamientoCompleto.ubicacion,
                telefono: estacionamientoCompleto.telefono,
                cuit: estacionamientoCompleto.cuit,
                cantidadLugares: estacionamientoCompleto.lugares.length,
            })
            guardarUbicacionEstacionamiento({
                direccion: estacionamientoCompleto.ubicacion.direccion,
                provincia: estacionamientoCompleto.ubicacion.provincia,
                ciudad: estacionamientoCompleto.ubicacion.ciudad,
                latitud: estacionamientoCompleto.ubicacion.latitud,
                longitud: estacionamientoCompleto.ubicacion.longitud
            })
            setearEncargadoSeleccionado(estacionamientoCompleto.encargado);
        }
    }, [])
    //función para registrar estacionamiento
    async function registrarEstacionamiento() {
        const lugares = [];
        try {
            if(nombreCompleto === '' || telefono === '' || nSucursal === '' || ubicacionEstacionamiento.direccion === '' || encargadoSeleccionado === ''|| cuit === '' || cantidadLugares === ''){
                Toast(CGeneral.COMPLETE_TODOS_LOS_CAMPOS);
            }
            //se utiliza la función includes para verificar si alguno de los dos campos tiene espacio en blanco
            else if(cuit.includes('_')){
                Toast(CGeneral.VALIDACION_CUIT)
            }
            else if(telefono.includes('_')){
                Toast(CGeneral.VALIDACION_TELEFONO)
            }
            else{
                //armar array con objetos de lugares
                for(var i=1; i<cantidadLugares; i++){
                    let lugar = {
                        "numero": i+1,
                        "ocupado": false,
                        "estado": "habilitado"
                    }
                    lugares.push(lugar);
                }
                //solo damos de alta el estacionamiento, las tarifas y lugares corren por cada encargado
                await firebase.registrarEstacionamiento(nombreCompleto, nSucursal, ubicacionEstacionamiento,
                telefono, cuit, lugares, encargadoSeleccionado);
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
        const lugares = [];
        try {
            if(nombreCompleto === '' || telefono === '' || ubicacionEstacionamiento.direccion === ''
            || encargadoSeleccionado === ''|| cuit === '' || cantidadLugares === ''){
                Toast(CGeneral.COMPLETE_TODOS_LOS_CAMPOS);
            }
            //se utiliza la función includes para verificar si alguno de los dos campos tiene espacio en blanco
            else if(cuit.includes('_')){
                Toast(CGeneral.VALIDACION_CUIT)
            }
            else if(telefono.includes('_')){
                Toast(CGeneral.VALIDACION_TELEFONO)
            }
            else{
                //armar array con objetos de lugares
                for(var i=0; i<cantidadLugares; i++){
                      let lugar = {
                        "numero": i+1,
                        "ocupado": false,
                        "estado": "habilitado"
                    }
                    lugares.push(lugar);
                }
                await firebase.modificarEstacionamiento(estacionamientoCompleto.id, nombreCompleto, nSucursal, ubicacionEstacionamiento,
                telefono, cuit, lugares, encargadoSeleccionado);
                Swal(CGeneral.OPERACION_COMPLETADA, CEstacionamientos.ESTACIONAMIENTO_MODIFICADO);
                cerrarModal();
                }
        }
        catch (error) {
            console.log(error);
            Toast(traducirError(error.code))
        }
    }
    //función para eliminar el estacionamiento seleccionado
    async function eliminarEstacionamiento() {
        try {
            await firebase.eliminarEstacionamiento(estacionamientoCompleto.id);
            cerrarModal();
            Swal(CGeneral.OPERACION_COMPLETADA, CEstacionamientos.ESTACIONAMIENTO_ELIMINADO);
        } catch (error) {
            console.log(error);
            Toast(traducirError(error.code))
        }
    }
    return ( 
    ((!cargando && accion === "Registrar") || (!cargando && accion === "Modificar")? 
    <>
        <form>
        <Typography style={{fontWeight: 'bold', fontFamily: 'Roboto Condensed', marginBottom: '1rem', marginTop: '1rem'}}>Datos del estacionamiento:</Typography>
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
                <Grid item lg={4} xs={12}> 
                    <TextField
                        className = {classes.inputNuevoEstacionamiento}
                        fullWidth
                        type="text"
                        defaultValue={estacionamientoCompleto ? 
                        estacionamientoCompleto.ubicacion.direccion : ''}
                        variant="outlined"
                        label="Ubicación"
                        inputRef={materialRef}
                    ></TextField>
                </Grid>
                <Grid item lg={4} xs={12}>
                    <TextField
                    fullWidth
                    className={classes.inputNuevoEstacionamiento}
                    variant="outlined"
                    label="Seleccione un encargado"
                    onChange={handleChangeSelectEncargado}
                    value={encargadoSeleccionado}
                    select
                    >
                    {encargados.map((encargado) => (
                        <MenuItem key={encargado.uid} name={encargado.nombreCompleto}
                        value={encargado.uid}>
                        {encargado.nombreCompleto} <FormHelperText> - {encargado.email}</FormHelperText>
                        </MenuItem>
                    ))}
                    </TextField>
                </Grid>
                <Grid item lg={2} xs={12}>
                    <TextField
                    fullWidth
                    type="number"
                    className={classes.inputNuevoEstacionamiento}
                    variant="outlined"
                    onChange={onChange}
                    label="Cantidad de lugares"
                    value={cantidadLugares}
                    name="cantidadLugares"
                    >
                    </TextField>
                </Grid>
                <Grid item lg={2} xs={12}>
                    <TextField
                    fullWidth
                    type="number"
                    className={classes.inputNuevoEstacionamiento}
                    variant="outlined"
                    onChange={onChange}
                    label="N° de sucursal"
                    value={nSucursal}
                    name="nSucursal"
                    >
                    </TextField>
                </Grid>
            </Grid>
            &nbsp;
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
            value={nombreEstacionamientoDarDeBaja}
            name="nombreEstacionamientoDarDeBaja"
            variant="outlined"
            label={CGeneral.NOMBRE_USUARIO}
            onChange={onChange}
        ></TextField>
        <Button onClick={eliminarEstacionamiento}
        fullWidth
        disabled = {deshabilitado ? true : false}
        endIcon={<DeleteIcon/>}
        className={classes.botonDarDeBajaModal}>Dar de baja</Button>
    </Grid>)
);
}
export default AdministrarEstacionamiento;