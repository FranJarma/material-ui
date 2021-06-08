import { Typography } from '@material-ui/core';
import React from 'react';
import NavbarCliente from './../diseño/NavbarCliente';
import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    titulo: {
        fontFamily: "Roboto Condensed, Sans-serif",
        fontWeight: "bold",
        fontSize: 18,
        marginLeft: "1.5rem"
    }
}));

const EncontrarEstacionamiento = () => {
    const classes = useStyles();
    return (
    <>
    <NavbarCliente/>
        <Typography className={classes.titulo}>1500 estacionamientos encontrados en Argentina</Typography>
    </>
    );
}
 
export default EncontrarEstacionamiento;