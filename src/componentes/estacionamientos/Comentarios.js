import React from 'react';
import Navbar from '../diseño/Navbar.js';
import { Card, CardContent, makeStyles, Typography, Avatar, Button } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Footer from '../diseño/Footer.js';
import { Rating } from '@material-ui/lab';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';

const useStyles = makeStyles((theme) => ({
    titulo: {
        fontFamily: "Roboto Condensed, sans-serif",
        textTransform: "uppercase",
        fontSize: 25,
        textAlign: "center"
    },
    valoracion: {
        fontFamily: "Roboto Condensed, sans-serif",
        color: "#448aff",
        fontSize: 20,
        textTransform: "uppercase",
        marginLeft: "1rem",
        fontWeight: "bold"
    },
    mostrarTodas: {
        fontFamily: "Roboto Condensed, sans-serif",
        color: "#448aff",
        fontSize: 12,
        marginLeft: "1rem",
        fontWeight: "bold"
    },
    cartaComentarios: {
        flexGrow: 1,
        marginBottom: "1rem",
        boxShadow: "0 2px 3px rgba(0,0,0,0.25), 0 0 3px rgba(0,0,0,0.22)",
        backgroundColor: theme.palette.background.paper,
        marginLeft: "1rem",
        marginRight: "1rem"
    },
    alerta:{
        position: "relative",
        marginLeft: "1rem",
        marginRight: "1rem",
        borderRadius: 0
    },
    comentario: {
        fontFamily: "Roboto Condensed, sans-serif",
        marginLeft: "0.5rem",
        fontSize: 16
    },
    observaciones: {
        fontFamily: "Roboto Condensed, sans-serif",
        color: "#9e9e9e",
        marginLeft: "0.5rem",
        fontSize: 16
    },
    cantidad: {
        fontFamily: "Roboto Condensed, sans-serif",
        color: "#9e9e9e",
        marginLeft: "1rem",
        fontSize: 14
    },
    votosPositivos: {
        color: "#4db6ac"
    },
    votosNegativos: {
        color: "#ff1744"
    }
}));

const Comentarios = () => {
    const classes = useStyles();
    const comentarios = [
        {
            id: 0,
            comentario: "Espectacular",
            estrellas: 5,
            observaciones: "El servicio ofrecido es de lo mejor que se puede encontrar. Mucho orden y limpieza en el establecimiento, cabe aclarar que tuve que cambiar el día de mi reserva y lo pudieron hacer sin problemas",
            votosPositivos: 24,
            votosNegativos: 1
        },
        {
            id: 1,
            comentario: "Muy buena atención",
            estrellas: 4,
            observaciones: "Muy buen servicio, teniendo en cuenta la cantidad de lugares disponibles",
            votosPositivos: 21,
            votosNegativos: 4
        },
        {
            id: 2,
            comentario: "Satisfecho con el servicio ofrecido",
            estrellas: 3,
            observaciones: "Podrían haber más lugares para estacionar mi bicicleta",
            votosPositivos: 18,
            votosNegativos: 11
        },
        {
            id: 3,
            comentario: "Regular",
            estrellas: 2,
            observaciones: "Descontento porque no funciona bien la aplicación para realizar las reservas",
            votosPositivos: 20,
            votosNegativos: 15

        },
        {
            id: 4,
            comentario: "Bueno",
            estrellas: 3,
            votosPositivos: 21,
            votosNegativos: 8
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
            <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
            <Typography className={classes.valoracion}>Promedio General: {sum/5}
            </Typography>
            <Rating
                style={{marginLeft: "1rem"}}
                readOnly
                precision={0.5}
                value={sum/5}
            >
            </Rating>
            </div>

            <Typography className={classes.cantidad}>de un total de: {comentarios.length} comentarios</Typography>
             &nbsp;
                {comentarios.map(comentario =>(
                <>
                <Card className = {classes.cartaComentarios}>
                    <CardContent  key={comentario.id}>
                    <>
                    <Rating
                    style={{marginLeft: "0.3rem"}}
                    readOnly
                    value={comentario.estrellas}
                    ></Rating>
                    <Typography className={classes.comentario}>{comentario.comentario}</Typography>
                    <Typography className={classes.observaciones}>{comentario.observaciones}</Typography>
                    <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                        <Button disabled startIcon={<ThumbUpAltIcon className={classes.votosPositivos} />}>{comentario.votosPositivos}</Button>
                        <Button disabled startIcon={<ThumbDownAltIcon className={classes.votosNegativos}/>}>{comentario.votosNegativos}</Button>
                    </div>
                    </>
                    </CardContent>
                </Card>
                </>
                ))}
            &nbsp;
            <Button className={classes.mostrarTodas}>Mostrar todas las valoraciones</Button>
            <Footer/>
        </>
    );
}
 
export default Comentarios;