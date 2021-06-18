import React, { useState } from 'react';
import NavbarCliente from '../diseño/NavbarCliente';
import { useStyles } from './Styles';
import { Button, Card, CardContent, Tab, Tabs, Typography } from '@material-ui/core';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import StoreMallDirectoryIcon from '@material-ui/icons/StoreMallDirectory';
import PaymentIcon from '@material-ui/icons/Payment';
import CheckIcon from '@material-ui/icons/Check';

import {useLocation} from 'react-router-dom';
import Toast from './../diseño/Toast';
import * as CGeneral from './../../constantes/general/CGeneral';
import TabPersona from './TabPersona';
import TabLugares from './TabLugares';
import TabReserva from './TabReserva';
import TabPagos from './TabPagos';
import Swal from '../diseño/Swal';
import useLocalStorageState from 'use-local-storage-state';
const NuevaReserva = () => {
    const location = useLocation();
    const { estacionamiento } = location.state;
    const classes = useStyles();
    const [tab, setTab] = useState(0);
    const handleChange = (event, nuevoTab) => {
        setTab(nuevoTab);
    };
    async function confirmarReserva () {
        if (JSON.parse(localStorage.getItem('infoPersona')).nombreCompleto === ""
        || JSON.parse(localStorage.getItem('infoPersona')).dni === ""
        || JSON.parse(localStorage.getItem('infoPersona')).email === ""
        || JSON.parse(localStorage.getItem('infoPersona')).telefono === ""
        || JSON.parse(localStorage.getItem('infoPersona')).marcaVehiculo === ""
        || JSON.parse(localStorage.getItem('infoPersona')).tipoVehiculo === ""
        || JSON.parse(localStorage.getItem('infoPersona')).patenteVehiculo === ""
        || JSON.parse(localStorage.getItem('fecha')) === ""
        || JSON.parse(localStorage.getItem('infoReserva')).hora === ""
        ) {
            Toast(CGeneral.COMPLETE_TODOS_LOS_CAMPOS);
        }
        else {
            Swal(CGeneral.OPERACION_COMPLETADA, 'Reserva registrada correctamente');
        }
    } 
    return (
        <>
        <NavbarCliente/>
        {tab !== 4 ?
        <Typography style={{color: "#000000", fontHeight: 'bold'}} className={classes.tituloModal}>Nueva Reserva en: {estacionamiento.nombreCompleto}</Typography>
        :<Typography style={{color: "#000000", fontHeight: 'bold'}} className={classes.tituloModal}>Confirmar reserva en: {estacionamiento.nombreCompleto}</Typography>}
        <Card className={classes.cartaReservas}>
            <CardContent>
            <Tabs
            TabIndicatorProps={{style: {background:'#4db6ac'}}}
            className={classes.tabs}
            variant="fullWidth"
            value={tab}
            onChange={handleChange}
            >
            <Tab className={classes.tab} icon={<PersonPinIcon />} label="Datos personales"></Tab>
            <Tab className={classes.tab} icon={<StoreMallDirectoryIcon/>} label="Datos de la reserva"></Tab>
            <Tab className={classes.tab} icon={<StoreMallDirectoryIcon/>} label="Lugares"></Tab>
            <Tab className={classes.tab} icon={<PaymentIcon/>} label="Datos del pago"></Tab>
            <Tab className={classes.tab} icon={<CheckIcon/>} label="Confirmar Reserva"></Tab>
            </Tabs>
            <br/>
            {tab === 0 ? <div><TabPersona estacionamiento={estacionamiento}/></div>
            : tab === 1 ? <div><TabReserva estacionamiento={estacionamiento}/></div>
            : tab === 2 ?
            <div>
                <>
                <div style={{textAlign: 'center'}}>
                    <label for="botonDisponible">Disponible</label>
                    <button name="botonDisponible" style={{borderRadius: 5, margin: 5 , width: 30, height: 30, backgroundColor: "#4db6ac", color: "#FFFFFF", borderColor: "#000000", border: 10, cursor: 'pointer', marginRight: '1rem'}}></button>
                    <label for="botonNoDisponible">No disponible</label>
                    <button name="botonNoDisponible"style={{borderRadius: 5, margin: 5 , width: 30, height: 30, backgroundColor: "red", borderColor: "red", border: 10, cursor: 'pointer', marginRight: '1rem'}} disabled></button>
                </div>
                <TabLugares estacionamiento= {estacionamiento.id}
                cantidadLugares={estacionamiento.lugares.length}
                lugares={estacionamiento.lugares}>
                </TabLugares>
                </>
            </div>
            : tab === 3 ? <div><TabPagos/></div>
            :
            <>
            <Typography className={classes.subtitulos}>Datos personales: </Typography>
            <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                <Typography className={classes.campos}>Nombre completo: </Typography>
                <Typography className={classes.campos}>{JSON.parse(localStorage.getItem('infoPersona')).nombreCompleto}</Typography>
            </div>
            <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                <Typography className={classes.campos}>DNI: </Typography>
                <Typography className={classes.campos}>{JSON.parse(localStorage.getItem('infoPersona')).dni}</Typography>
            </div>
            <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                <Typography className={classes.campos}>Email: </Typography>
                <Typography className={classes.campos}>{JSON.parse(localStorage.getItem('infoPersona')).email}</Typography>
            </div>
            <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                <Typography className={classes.campos}>Teléfono: </Typography>
                <Typography className={classes.campos}>{JSON.parse(localStorage.getItem('infoPersona')).telefono}</Typography>
            </div>
            <Typography className={classes.subtitulos}>Datos del vehículo: </Typography>
            <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                <Typography className={classes.campos}>Tipo: </Typography>
                <Typography className={classes.campos}>{JSON.parse(localStorage.getItem('infoPersona')).tipoVehiculo.split('&')[0]}</Typography>
            </div>
            <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                <Typography className={classes.campos}>Marca: </Typography>
                <Typography className={classes.campos}>{JSON.parse(localStorage.getItem('infoPersona')).marcaVehiculo}</Typography>
            </div>
            <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                <Typography className={classes.campos}>Patente: </Typography>
                <Typography className={classes.campos}>{JSON.parse(localStorage.getItem('infoPersona')).patenteVehiculo}</Typography>
            </div>
            <Typography className={classes.subtitulos}>Otros datos: </Typography>
            <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                <Typography className={classes.campos}>Fecha: </Typography>
                <Typography className={classes.campos}>{JSON.parse(localStorage.getItem('fecha'))}</Typography>
            </div>
            <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                <Typography className={classes.campos}>Hora: </Typography>
                <Typography className={classes.campos}>{JSON.parse(localStorage.getItem('infoReserva')).hora}</Typography>
            </div>
            <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                <Typography className={classes.campos}>Lugar: </Typography>
                <Typography className={classes.campos}>d</Typography>
            </div>
            <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                <Typography className={classes.campos}>Monto a pagar: </Typography>
                <Typography className={classes.campos}> $ {JSON.parse(localStorage.getItem('infoPersona')).tipoVehiculo.split('&')[1]}</Typography>
            </div>
            <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                <Typography className={classes.campos}>Forma de pago: </Typography>
                <Typography className={classes.campos}>d</Typography>
            </div>
            <div style={{textAlign: 'center'}}>
                <Button onClick={confirmarReserva} className={classes.botonSiguiente}>Confirmar Reserva</Button>
            </div>
            </>
            }
            </CardContent>
        </Card>
        <div style={{float: 'right', marginRight: '1rem'}}>
            <Button disabled={tab === 0 ? true : false} onClick={()=>setTab(tab-1)} onChange={handleChange}>Anterior</Button>
            <Button onClick={()=>setTab(tab+1)} style={{display: tab ===4 ? "none" : ""}} value={tab} className={classes.botonSiguiente}>Siguiente</Button>
        </div>
        </>
    );
}
 
export default NuevaReserva;