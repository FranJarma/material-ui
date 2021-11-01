import { Card, CardActionArea, CardContent, Grid, List, ListItem, ListItemIcon, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import NavbarCliente from './diseño/NavbarCliente';
import {makeStyles} from '@material-ui/core';
import Footer from './diseño/Footer';
import encargado from './../imagenes/encargado.jpg';
import maps from './../imagenes/maps.jpg';
import maps2 from './../imagenes/maps2.jpg';
import responsive from './../imagenes/responsive.jpg';
import pagos from './../imagenes/pagos.jpg';
import mercadopago from './../imagenes/mercadopago.png';
import seguridad from './../imagenes/seguridad.jpg';
import argentina from './../imagenes/argentina.jpg';

import TodayIcon from '@material-ui/icons/Today';
import StoreMallDirectoryIcon from '@material-ui/icons/StoreMallDirectory';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import NotListedLocationIcon from '@material-ui/icons/NotListedLocation';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

const useStyles = makeStyles(theme => ({
    titulo: {
        fontFamily: "Roboto Condensed",
        fontWeight: "bold",
        fontSize: 35,
        textTransform: "uppercase",
        marginLeft: "1.5rem",
        textAlign: "center"
    },
    tituloCarta: {
        fontFamily: "sans-serif",
        fontSize: 20,
        textAlign: "center"
    },
    descripcionCarta: {
        fontFamily: "sans-serif",
        fontSize: 16,
        textAlign: 'justify',
        color: "#A9A9A9",
        marginTop: "1.5rem"
    },
    subtitulo: {
        fontFamily: "Roboto Condensed",
        fontSize: 18,
        marginLeft: "1.5rem",
        marginRight: "1.5rem",
        textAlign: "center"
    },
    cartaLanding: {
        marginLeft: "1.5rem",
        marginRight: "1.5rem",
        marginTop: "1rem",
    },
    icono: {
        color: "#4db6ac",
    },
    imagen: {
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        height: "400px",
        width: '100%'
    }
}));

const Landing = () => {
    const classes = useStyles();
    useEffect(()=> {
        localStorage.removeItem('infoPersona');
        localStorage.removeItem('infoReserva');
        localStorage.removeItem('fecha');
    },[]);
    const infoCarta = [
        {
            titulo: '¿Es encargado?',
            tareas: [
                {
                    descripcion: 'Gestionar las reservas del día y todas las que se realizaron con anterioridad. Puede cambiar fechas de reservas e ingresar pagos de las mismas.',
                    icono: <TodayIcon/>
                },
                {
                    descripcion: 'Gestionar la información de tu estacionamiento, con ubicación georeferenciada. Puedes administrar cada uno de los lugares de tu estacionamiento, tarifas y horarios de apertura.',
                    icono: <StoreMallDirectoryIcon/>
                },
                {
                    descripcion: 'Llevar un seguimiento de tu estacionamiento, ingresos mensuales y anuales para poder ayudar a la toma de decisiones.',
                    icono: <EqualizerIcon/>
                }
            ],
            imagen: encargado
        },
        {
            titulo: '¿Es conductor?',
            tareas: [
                {
                    descripcion: 'Buscar todas las playas de estacionamiento registradas según su valoración, ubicación más cercana, etc',
                    icono: <NotListedLocationIcon/>
                },
                {
                    descripcion: 'Realizar la reserva en la playa que más le convenga y generar un ticket para presentar como comprobante de la misma.',
                    icono: <ConfirmationNumberIcon/>
                },
                {
                    descripcion: 'Realizar el pago correspondiente totalmente de forma virtual con tarjeta de crédito, débito o también puede elegir pagar con efectivo en el establecimiento. Todo esto sin necesidad de moverse de donde está.',
                    icono: <MonetizationOnIcon/>
                }
            ],
            imagen: maps
        }
    ];
    const caracteristicas = [
        {
            titulo: 'Adaptable a cualquier dispositivo',
            imagen: responsive,
            link: 'https://devcode.la/blog/que-es-responsive-web-design/'
        },
        {
            titulo: 'Disponible para playas de estacionamiento en toda Argentina',
            imagen: argentina,
        },
        {
            titulo: 'Pagos online',
            imagen: pagos,
            link: 'https://debitoor.es/glosario/pago-online'
        },
        {
            titulo: 'Seguridad',
            imagen: seguridad,
            link: 'https://definicion.de/seguridad-informatica/#:~:text=La%20seguridad%20inform%C3%A1tica%20es%20una,la%20inviolabilidad%20de%20un%20sistema.'
        },
        {
            titulo: 'Mercado pago',
            imagen: mercadopago,
            link: 'https://www.mercadopago.com.ar/link-de-pago-plugins-y-plataformas-checkout?matt_tool=74490554&matt_word=&gclid=Cj0KCQjw2tCGBhCLARIsABJGmZ6iRy2GLyKFazeCcETOpxekD9GIjqQSiEd9I_EFMgkzWEsgzs_LkJIaApflEALw_wcB'
        },
        {
            titulo: 'Google maps',
            imagen: maps2,
            link: 'https://www.google.com.ar/maps'
        }
    ]
    return (
        <>
        <NavbarCliente></NavbarCliente>
        <Typography className={classes.titulo}>¿Necesita lugar para estacionar?</Typography>
        <p className={classes.subtitulo}>Parking app es un sistema web a medida para la reserva y gestión de playas de estacionamiento ubicadas en diferentes partes de Argentina.
        Usted podrá acceder a la información de dichas playas, asimismo podrá realizar la reserva del lugar que más le guste.</p>
        <Grid container spacing={2}>
            {infoCarta.map((carta => (
                <Grid item lg={6} xs={12}>
                    <Card className={classes.cartaLanding}>
                        <CardActionArea>
                            <img alt= "" className={classes.imagen} src={carta.imagen}/>
                            <CardContent className={classes.tituloCarta}>
                                <Typography className={classes.tituloCarta}>
                                {carta.titulo}
                                </Typography>
                                <List>
                                    <ListItem className={classes.descripcionCarta}>
                                    <ListItemIcon className={classes.icono}>{carta.tareas[0].icono}</ListItemIcon>
                                    {carta.tareas[0].descripcion}
                                    </ListItem>
                                    <ListItem className={classes.descripcionCarta}>
                                    <ListItemIcon className={classes.icono}>{carta.tareas[1].icono}</ListItemIcon>
                                    {carta.tareas[1].descripcion}
                                    </ListItem>
                                    <ListItem className={classes.descripcionCarta}>
                                    <ListItemIcon className={classes.icono}>{carta.tareas[2].icono}</ListItemIcon>
                                    {carta.tareas[2].descripcion}
                                    </ListItem>
                                </List>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            )
            ))}
        </Grid>
        <div style={{marginTop: '3.5rem'}}></div>
        <Typography className={classes.titulo}>Características principales</Typography>
        <Grid container spacing={2}>
            {caracteristicas.map((caracteristica => (
                <Grid item lg={4} xs={12}>
                    <a style={{textDecoration: 'none'}} href={caracteristica.link}>
                        <Card className={classes.cartaLanding}>
                            <CardActionArea>
                                <img alt="" className={classes.imagen} src={caracteristica.imagen}/>
                                <CardContent className={classes.tituloCarta}>
                                    <Typography className={classes.subtitulo}>
                                    {caracteristica.titulo}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </a>
                </Grid>
            )
            ))}
        </Grid>
        <Footer></Footer>
        </>
    );
}
 
export default Landing;