import React, { useContext } from 'react';
import Navbar from './diseño/Navbar';
import Footer from './diseño/Footer';
import * as CGeneral from './../constantes/general/CGeneral';
import { Typography, makeStyles } from '@material-ui/core';
import Spinner from './diseño/Spinner';
import SpinnerContext from '../context/spinner/spinnerContext';

const useStyles = makeStyles(theme => ({
    titulo: {
        fontFamily: "Roboto Condensed, sans-serif",
        textTransform: "uppercase",
        fontSize: 30,
        textAlign: 'center'
    }
}));

const Home = () => {
    const classes = useStyles();
    const spinnerContext = useContext(SpinnerContext);
    const { cargando } = spinnerContext;
    return (
    (!cargando ?
    <>
    <Navbar></Navbar>
    <Typography className={classes.titulo}>{CGeneral.BIENVENIDO}</Typography>
    <Footer></Footer>
    </>
    : <Spinner></Spinner>
    ));
}
 
export default Home;