import React, {useState, useEffect, useContext} from 'react';
import {FirebaseContext} from './../../firebase/';
import Navbar from '../diseño/Navbar.js';
import { 
Typography, Button, TextField, Grid, Card, Link } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import Footer from '../diseño/Footer.js';

import InputMask from 'react-input-mask';
import * as CGeneral from '../../constantes/general/CGeneral';
import {useStyles} from './Styles';
import * as CAuth from '../../constantes/auth/CAuth';
import Toast from '../diseño/Toast';
import Swal from '../diseño/Swal';
import traducirError from '../../firebase/errores';
import {usePlacesWidget} from "react-google-autocomplete";
import Mapa from './../mapas/Mapa';

const MiEstacionamiento = () => {
    const {usuario, firebase} = useContext(FirebaseContext);
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

    const [estacionamientoInfo, guardarEstacionamientoInfo] = useState({
        nombreCompleto: '',
        cuit: '',
        diasApertura: '',
        encargado: '',
        horario: '',
        lugares: '',
        tarifas: '',
        telefono: '',
        ubicacion: {
            direccion: '',
            provincia: '',
            ciudad: '',
            latitud: 0,
            longitud: 0
        },
        valoracion: '',
        horarioCorrido: false
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
    //state para manejar la ubicacion
    const [ubicacionEstacionamiento, guardarUbicacionEstacionamiento] = useState({
        direccion: '',
        provincia: '',
        ciudad: '',
        latitud: '',
        longitud: ''
    });
    const {nombreCompleto, cuit, diasApertura, encargado, horario, horarioCorrido, lugares, tarifas, telefono,
    ubicacion, valoracion } = estacionamientoInfo;
    //evento onChange
    const onChange = (e) => {
        guardarEstacionamientoInfo({
            ...estacionamientoInfo,
            [e.target.name] : e.target.value
    })};
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
                <Typography style={{fontWeight: 'bold', fontFamily: 'Roboto Condensed', marginBottom: '1rem', marginTop: '1rem'}}>Ubicación:</Typography>
                <Grid container spacing={3}>
                <Grid item lg={6} xs={12}> 
                    <TextField
                        className = {classes.inputMiEstacionamiento}
                        fullWidth
                        type="text"
                        value={ubicacion.direccion}
                        variant="outlined"
                        label="Dirección"
                        inputRef={materialRef}
                    ></TextField>
                </Grid>
                <Grid item lg={3} xs={6}> 
                    <TextField
                        className = {classes.inputMiEstacionamiento}
                        fullWidth
                        type="text"
                        value={ubicacion.provincia}
                        variant="outlined"
                        label="Provincia"
                        inputRef={materialRef}
                    ></TextField>
                </Grid>
                <Grid item lg={3} xs={6}> 
                    <TextField
                        className = {classes.inputMiEstacionamiento}
                        fullWidth
                        type="text"
                        value={ubicacion.ciudad}
                        variant="outlined"
                        label="Ciudad"
                        inputRef={materialRef}
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
            &nbsp;
            <Button
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