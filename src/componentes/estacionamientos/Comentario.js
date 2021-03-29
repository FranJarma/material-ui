import React from 'react';
import Navbar from './../diseño/Navbar.js';
import { List, ListItemAvatar, ListItemText, Divider, makeStyles, Typography, ListItem, Avatar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Footer from '../diseño/Footer.js';
import { Rating } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
    titulo: {
        fontFamily: "Roboto Condensed, sans-serif",
        textTransform: "uppercase",
        fontSize: 25,
        textAlign: "center"
    },
    valoracion: {
        fontFamily: "Roboto Condensed, sans-serif",
        fontSize: 25,
        [theme.breakpoints.up('lg')]: {
            marginLeft: "20rem",
            marginRight: "1rem"
        },
        [theme.breakpoints.down('md')]: {
            marginLeft: "1rem",
            marginRight: "1rem"
        },
    },
    cartaComentarios: {
        flexGrow: 1,
        paddingLeft: 20,
        boxShadow: "0 2px 3px rgba(0,0,0,0.25), 0 0 3px rgba(0,0,0,0.22)",
        backgroundColor: theme.palette.background.paper,
        [theme.breakpoints.up('lg')]: {
            marginLeft: "20rem",
            marginRight: "1rem"
        },
        [theme.breakpoints.down('md')]: {
            marginLeft: "1rem",
            marginRight: "1rem"
        },
    },
    alerta:{
        position: "relative",
        [theme.breakpoints.up('lg')]: {
            marginLeft: "20rem",
            marginRight: "1rem"
        },
        [theme.breakpoints.down('md')]: {
            marginLeft: "1rem",
            marginRight: "1rem"
        },
        borderRadius: 0
    },
}));

const Comentario = () => {
    const classes = useStyles();
    const comentarios = [
        {
            id: 0,
            comentario: "Muy buen servicio",
            estrellas: 5,
            cliente: "Francisco Jarma",
            avatar: "FJ"
        },
        {
            id: 1,
            comentario: "Muy buena atención",
            estrellas: 4,
            cliente: "Juan Lopez",
            avatar: "JL"
        },
        {
            id: 2,
            comentario: "Satisfecho con el servicio ofrecido",
            estrellas: 3,
            cliente: "Jorge Gonzales",
            avatar: "JG"
        },
        {
            id: 3,
            comentario: "Podrían mejorar en la limpieza",
            estrellas: 2,
            cliente: "Esteban Andrada",
            avatar: "EA"
        },
        {
            id: 4,
            comentario: "Satisfecho pero podría haber un poco más de espacio para poder guardar mi bicicleta",
            estrellas: 3,
            cliente: "Micaela Rodriguez",
            avatar: "MR"
        },
    ];
    const sum = comentarios
    .map(item => item.estrellas)
    .reduce((prev, curr) => prev + curr, 0);
    return (
        <>
            <Navbar/>
            <Typography className={classes.titulo}>Comentarios y valoraciones</Typography>
            &nbsp;
            <Alert className={classes.alerta} severity="info" variant="filled">En esta pantalla podrá ver todos los comentarios y valoraciones hechos por los usuarios.
            </Alert>
             &nbsp;
            <List className = {classes.cartaComentarios}>
                {comentarios.map(comentario =>(
                <>
                <ListItem key={comentario.id}>
                    <ListItemAvatar>
                        <Avatar>
                            {comentario.avatar}
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={comentario.cliente} secondary={
                        <>
                        <Typography>{comentario.comentario}</Typography>
                        <Rating
                        readOnly
                        value={comentario.estrellas}
                        ></Rating>
                        </>
                    }>
                    </ListItemText>
                </ListItem>
            <Divider></Divider>
                </>
                ))}
            </List>
            &nbsp;
            <Typography className={classes.valoracion}>Valoración General: {sum/5}</Typography>
            <Footer/>
        </>
    );
}
 
export default Comentario;