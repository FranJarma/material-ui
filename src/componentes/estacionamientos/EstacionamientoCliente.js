import React, {useState, useContext} from 'react';
import { Typography, Card, CardActionArea } from '@material-ui/core';
import { Link } from 'react-router-dom';
import {useStyles} from './Styles';
import * as CEstacionamientos from './../../constantes/estacionamientos/CEstacionamientos';
import * as CGeneral from './../../constantes/general/CGeneral';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import CallIcon from '@material-ui/icons/Call';
import StarIcon from '@material-ui/icons/Star';
import { Rating } from '@material-ui/lab';
import Toast from '../diseño/Toast';
import Swal from '../diseño/Swal';
import { FirebaseContext } from '../../firebase';
import traducirError from '../../firebase/errores';
 
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
            Toast(traducirError(error.code));
        }
    }
    return ( 
        <>
            <Link style={{textDecoration: 'none'}} to={{
                pathname: `detalles-estacionamiento/${estacionamiento.id}`,
                state: {estacionamiento}
            }}>
            <Card className={classes.cartaEstacionamientosCliente}>
                <CardActionArea>
                    <img alt="" className={classes.imagen} src={estacionamiento.urlImagen}></img>
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