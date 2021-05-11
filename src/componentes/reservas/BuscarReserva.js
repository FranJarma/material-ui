import React, {useContext, useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../diseño/Navbar.js';
import { makeStyles, Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Paginacion from '../diseño/Paginacion.js';
import Footer from '../diseño/Footer.js';
import PaginacionContext from '../../context/paginacion/paginacionContext';
import SpinnerContext from '../../context/spinner/spinnerContext.js';
import Spinner from '../diseño/Spinner.js';
import * as CReservas from './../../constantes/reservas/CReservas';
import Reserva from './Reserva.js';
import {useStyles} from './Styles';

const BuscarReserva = () => {
    const classes = useStyles();
    const reservas = [
        {
            id: 0,
            codigo: "A156-125Q-X123-WQAS2",
            avatar: "FJ",
            nombreCompleto: "Francisco Jarma",
            patente: "LZY450",
            marca: "Volkswagen",
            horaReserva: "10:48",
            tipo: "Auto",
            precio: "$100",
            horaIngreso: "",
            horaSalida: "",
            observaciones: "Llegaré 5 minutos tarde",
            lugar: "11"
        },
        {
            id: 1,
            codigo: "B1S5-A53ZW-DJ65-Q286",
            avatar: "JL",
            nombreCompleto: "Juan Lopez",
            patente: "ASD123",
            horaReserva: "10:52",
            marca: "Peugeot",
            tipo: "Auto",
            precio: "$100",
            horaIngreso: "19:20",
            horaSalida: "",
            observaciones: "Automóvil color azul",
            lugar: "1"
        },
    ];
    //state para guardar los registros filtrados
    const [resultado, guardarResultado] = useState([]);
    //context de paginación y spinner
    const paginacionContext = useContext(PaginacionContext);
    const { pagina, itemsPorPagina } = paginacionContext;
    const spinnerContext = useContext(SpinnerContext);
    const { cargando } = spinnerContext;
    const history = useHistory();

    useEffect(()=>{
        guardarResultado(reservas);
        const search = history.location.search;
        const parametroBusqueda = search.split('=')[1];
        const reservasFiltradas = reservas.filter(reserva => {
            return (
                reserva.nombreCompleto.toLowerCase().includes(parametroBusqueda) ||
                reserva.patente.toLowerCase().includes(parametroBusqueda)
            )
        });
        guardarResultado(reservasFiltradas);
    },[guardarResultado, history.location.search]);

    return (
        (!cargando ? 
        <>
            <Navbar/>
            <Typography className={classes.titulo}>{CReservas.RESERVAS_HOY}</Typography>
            &nbsp;
            <Alert className={classes.alerta} severity="info" variant="filled">{CReservas.ALERTA_PRINCIPAL}
             <ul>
                 <li>{CReservas.SUB_ALERTA1}</li>
                 <li>{CReservas.SUB_ALERTA2}</li>
            </ul>
            </Alert>
             &nbsp;
            <Typography className={classes.cantidad}>{resultado.length > 0 ? `${CReservas.TOTAL_RESERVAS_ENCONTRADAS} ${resultado.length}` : `${CReservas.NO_SE_ENCONTRARON_RESERVAS}`}</Typography>
                {resultado.slice((pagina-1)* itemsPorPagina, pagina*itemsPorPagina).map(reserva =>(
                    <Reserva key={reserva.id} reserva={reserva}/>
                    ))}
                {resultado.length > 0 ? <Paginacion lista={resultado}/>: ""}
            <Footer/>
        </>
    : <Spinner></Spinner>)
    );
}
export default BuscarReserva;