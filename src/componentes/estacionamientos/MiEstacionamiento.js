import React, {useState, useEffect, useContext} from 'react';
import {FirebaseContext} from './../../firebase/';
import Navbar from '../diseño/Navbar.js';
import { 
Typography, Button, TextField, Grid, Card, Link, TextareaAutosize } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import Footer from '../diseño/Footer.js';

import InputMask from 'react-input-mask';
import * as CGeneral from '../../constantes/general/CGeneral';
import {useStyles} from './Styles';
import * as CEstacionamientos from '../../constantes/estacionamientos/CEstacionamientos';
import Toast from '../diseño/Toast';
import Swal from '../diseño/Swal';
import traducirError from '../../firebase/errores';
import {usePlacesWidget} from "react-google-autocomplete";
import Mapa from './../mapas/Mapa';
import FileUploader from 'react-firebase-file-uploader';

const MiEstacionamiento = () => {
    const {usuario, firebase} = useContext(FirebaseContext);
    const [estacionamientoInfo, guardarEstacionamientoInfo] = useState({
        nombreCompleto: '',
        cuit: '',
        telefono: '',
        ubicacion: {
            direccion: '',
            provincia: '',
            ciudad: '',
            latitud: 0,
            longitud: 0
        },
        descripcion: '',
    });
    const [mapa, mostrarMapa] = useState(false);
    const handleChangeMostrarMapa = () => {
        if(mapa === true) {
            mostrarMapa(false);
        }
        else {
            mostrarMapa(true);
        }
    }
    const {nombreCompleto, cuit, telefono, ubicacion, descripcion } = estacionamientoInfo;
    //state de la imagen para subir a storage
    const [nombreImagen, guardarNombre] = useState('');
    const [subiendo, guardarSubiendo] = useState(false);
    const [progreso, guardarProgreso] = useState(0);
    const [urlImagen, guardarUrlImagen] = useState('');
    //funciones para dichos states
    const handleUploadStart = () => {
        guardarProgreso(0);
        guardarSubiendo(true);
    }
    const handleProgress = progreso => guardarProgreso(progreso);
    const handleUploadError = error => {
        guardarSubiendo(error);
        Toast(error);
    }
    const handleUploadSuccess = nombre => {
        guardarProgreso(100);
        guardarSubiendo(false);
        guardarNombre(nombre);
        firebase.storage
        .ref('estacionamientos')
        .child(nombre)
        .getDownloadURL()
        .then(url => {
            guardarUrlImagen(url)
        });
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
        guardarEstacionamientoInfo(resultado[0]);
        console.log(resultado[0]);
    }
    //función para modificar estacionamiento
    async function modificarEstacionamiento() {
        try {
            if(nombreCompleto === '' || cuit === '' || telefono === ''){
                Toast(CGeneral.COMPLETE_TODOS_LOS_CAMPOS);
            }
            //se utiliza la función includes para verificar si alguno de los dos campos tiene espacio en blanco
            else if(cuit.includes('_')){
                Toast(CGeneral.VALIDACION_CUIT)
            }
            else if(telefono.includes('_')){
                Toast(CGeneral.VALIDACION_TELEFONO)
            }
            else {
                //solo se puede modificar el teléfono, cuit, la descripción y la URl de la imagen
                await firebase.modificarMiEstacionamiento(estacionamientoInfo.id, nombreCompleto,
                telefono, cuit, descripcion, urlImagen);
            }
            Swal(CGeneral.OPERACION_COMPLETADA, CEstacionamientos.ESTACIONAMIENTO_MODIFICADO);
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
        <Typography className={classes.titulo}>Mi estacionamiento</Typography>
        &nbsp;
        <Card className={classes.cartaMiEstacionamiento}>
        &nbsp;
        <Typography style={{fontWeight: 'bold', fontFamily: 'Roboto Condensed', marginBottom: '1rem', marginTop: '1rem'}}>Datos del estacionamiento:</Typography>
            <Grid container spacing={3}>
                <Grid item lg={4} xs={12}>
                <TextField
                className={classes.inputMiEstacionamiento}
                label="Nombre Completo"
                autoFocus
                name="nombreCompleto"
                variant="outlined"
                fullWidth
                value={nombreCompleto}
                onChange={onChange}
                />
                </Grid>
                <Grid item lg={4} xs={12}>
                <InputMask
                    mask="99-99-999-999-9"
                    value={cuit}
                    onChange={onChange}
                    >
                        {() => <TextField
                            className = {classes.inputMiEstacionamiento}
                            type="text"
                            fullWidth
                            name="cuit"
                            variant="outlined"
                            label={CGeneral.CUIT}
                        />
                        }
                    </InputMask>
                </Grid>
                <Grid item lg={4} xs={12}>
                    <InputMask
                    mask="(+54) 9999999999"
                    value={telefono}
                    onChange={onChange}
                    >
                        {() => <TextField
                            className = {classes.inputMiEstacionamiento}
                            type="text"
                            fullWidth
                            name="telefono"
                            variant="outlined"
                            label={CGeneral.TELEFONO}
                        />
                        }
                    </InputMask>
                </Grid>
                </Grid>
                <Grid container spacing={3}>
                <Grid item lg={12}>
                    <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                        <Typography style={{fontWeight: 'bold', fontFamily: 'Roboto Condensed', marginBottom: '1rem',
                        marginRight: '1rem', marginTop: '1rem'}}>Imagen:</Typography>
                        <FileUploader
                        accept="image/*"
                        name="urlImagen"
                        randomizeFilename
                        storageRef={firebase.storage.ref("estacionamientos")}
                        onUploadStart={handleUploadStart}
                        onUploadError={handleUploadError}
                        onUploadSuccess={handleUploadSuccess}
                        onProgress={handleProgress}
                        >
                        </FileUploader>
                    </div>
                </Grid>
                </Grid>
                <Typography style={{fontWeight: 'bold', fontFamily: 'Roboto Condensed', marginBottom: '1rem', marginTop: '1rem'}}>Ubicación:</Typography>
                <Grid container spacing={3}>
                <Grid item lg={6} xs={12}> 
                    <TextField
                        className = {classes.inputMiEstacionamiento}
                        fullWidth
                        type="text"
                        value={ubicacion.direccion}
                        variant="filled"
                        label="Dirección"
                        disabled
                    ></TextField>
                </Grid>
                <Grid item lg={3} xs={6}> 
                    <TextField
                        className = {classes.inputMiEstacionamiento}
                        fullWidth
                        type="text"
                        value={ubicacion.provincia}
                        variant="filled"
                        label="Provincia"
                        disabled
                    ></TextField>
                </Grid>
                <Grid item lg={3} xs={6}> 
                    <TextField
                        className = {classes.inputMiEstacionamiento}
                        fullWidth
                        type="text"
                        value={ubicacion.ciudad}
                        variant="filled"
                        label="Ciudad"
                        disabled
                    ></TextField>
                </Grid>
                <Link
                className={classes.mostrarMapa}
                onClick={handleChangeMostrarMapa}
                value={mapa}
                >
                {!mapa ? "Mostrar mapa" : "Ocultar Mapa"}
                </Link>
                { mapa ? 
                <Grid item lg={12}>
                    <Mapa containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    isMarkerShown
                    lat={ubicacion.latitud}
                    lng={ubicacion.longitud}
                    nombre={nombreCompleto}
                    >
                    </Mapa>
                </Grid>
                : ""}
            </Grid>
            <Grid container spacing={3}>
                <Grid item lg={12}>
                        <Typography style={{fontWeight: 'bold', fontFamily: 'Roboto Condensed', marginBottom: '1rem',
                        marginRight: '1rem', marginTop: '1rem'}}>Ingrese una descripción (servicios adicionales, abre feriados, etc):</Typography>
                        <TextareaAutosize
                        name="descripcion"
                        value={descripcion}
                        placeholder="Por ej: Servicios de lavado y calibrado de gomas, abro feriados (Max. 100 palabras)"
                        className={classes.inputMiEstacionamiento}
                        rowsMin={5}
                        maxLength={100}
                        onChange={onChange}
                        style={{width: "100%"}}
                        >
                        </TextareaAutosize>
                </Grid>
                </Grid>
            &nbsp;
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
 
export default MiEstacionamiento;