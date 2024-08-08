import React, { useContext } from 'react';
import { Card, CardContent, Typography, Button, Divider } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import Paginacion from './../diseño/Paginacion.js';
import PaginacionContext from './../../context/paginacion/paginacionContext';
import Spinner from '../diseño/Spinner.js';
import SpinnerContext from '../../context/spinner/spinnerContext.js';
import {useStyles} from './Styles';

const Comentarios = ({comentarios}) => {
    const classes = useStyles();
    //context de paginación y spinner
    const paginacionContext = useContext(PaginacionContext);
    const { pagina, itemsPorPagina } = paginacionContext;
    const spinnerContext = useContext(SpinnerContext);
    const { cargando } = spinnerContext;
    return (
        (!cargando ? 
        <>
            &nbsp;
            <Card className = {classes.cartaComentarios}>
            {comentarios ? comentarios.slice((pagina-1)* itemsPorPagina, pagina*itemsPorPagina).map(comentario =>(
            <>
                <CardContent  key={comentario.id}>
                <>
                <Typography className={classes.observaciones}>{comentario.contenido}</Typography>
                <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                    <Button startIcon={<ThumbUpAltIcon className={classes.votosPositivos} />}>{comentario.votosPositivos}</Button>
                    <Button startIcon={<ThumbDownAltIcon className={classes.votosNegativos}/>}>{comentario.votosNegativos}</Button>
                </div>
                </>
                </CardContent>
                <Divider></Divider>
            </>
            )):""}
        </Card>
        &nbsp;
        {comentarios ? <Paginacion lista={comentarios}/> : ""}
        </>
    : <Spinner></Spinner>)
    );
}
 
export default Comentarios;