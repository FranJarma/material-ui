import React, {useState, useContext, useEffect} from 'react';
import { Typography, Button, Card, Grid, CardContent, Chip, TextareaAutosize, CardActionArea
 } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import {useStyles} from './Styles';
import * as CEstacionamientos from './../../constantes/estacionamientos/CEstacionamientos';
import * as CGeneral from './../../constantes/general/CGeneral';
import Mapa from './../mapas/Mapa.js';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import CallIcon from '@material-ui/icons/Call';
import StarIcon from '@material-ui/icons/Star';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Rating } from '@material-ui/lab';
import Toast from '../diseño/Toast';
import Swal from '../diseño/Swal';
import { FirebaseContext } from '../../firebase';
 
const EstacionamientoCliente = ({estacionamiento}) => {
    const { firebase } = useContext(FirebaseContext);
    //states para los modals
    const [modalVerMas, setAbrirModalVerMas] = useState(false);
    const handleClickAbrirModalVerMas= () => {
        setPuntuacion('');
        setInfo('');
        setAbrirModalVerMas(true);
    };
    const handleClickCerrarModalVerMas = () => {
        setPuntuacion('');
        setInfo('');
        setAbrirModalVerMas(false);
    };
    //state para rating
    const [puntuacion, setPuntuacion] = useState('');
    //state para input de comentario
    const [info, setInfo] = useState({
        comentario: ''
    });
    const {comentario} = info;
    const onChange = (e) => {
        setInfo({
            ...info,
            [e.target.name] : e.target.value});
    }

    const classes = useStyles();
    //función de firebase para registrar puntuación
    async function registrarPuntuacion () {
        //valoracion = sum(puntuaciones)/len(puntuacions)
        try {
            if (comentario === "" || puntuacion === "") {
                Toast(CEstacionamientos.INGRESE_COMENTARIO);
            }
            else {
                await firebase.registrarPuntuacion(estacionamiento.id, comentario, parseFloat(puntuacion));
                Swal(CGeneral.OPERACION_COMPLETADA, CEstacionamientos.COMENTARIO_REGISTRADO);
                setAbrirModalVerMas(false);
            }
        } catch (error) {
            console.log(error);
            Toast(error.code);
        }
    }
    return ( 
        <>
            <Link style={{textDecoration: 'none'}} to={{
                pathname: `detalles-estacionamiento/${estacionamiento.nombreCompleto}`,
                state: {estacionamiento}
            }}>
            <Card className={classes.cartaEstacionamientosCliente}>
                <CardActionArea>
                    <img className={classes.imagen} src={estacionamiento.urlImagen}></img>
                    <Typography style={{textAlign: "center"}} className={classes.nombreCompleto}>{estacionamiento.nombreCompleto}</Typography>
                    <div style={{display: 'flex', textAlign: 'center'}}><StarIcon style={{color:"#4db6ac"}}/><Typography style={{textAlign:'center'}} className={classes.campos}>{estacionamiento.valoracion.toFixed(2)}</Typography></div>
                    <div style={{display: 'flex', textAlign: 'center'}}><LocationOnIcon style={{color:"#4db6ac"}}/><Typography style={{textAlign:'center'}} className={classes.campos}>{estacionamiento.ubicacion.provincia} | {estacionamiento.ubicacion.direccion}</Typography></div>
                    <div style={{display: 'flex', textAlign: 'center'}}><CallIcon style={{color:"#4db6ac"}}/><Typography style={{textAlign:'center'}} className={classes.campos}>{estacionamiento.telefono}</Typography></div>
                </CardActionArea>
            </Card>
        </Link>
        </>
        );
}
 
export default EstacionamientoCliente;