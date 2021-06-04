import React, {useState, useContext, useEffect} from 'react';
import Navbar from './../diseño/Navbar.js';
import {FirebaseContext} from './../../firebase/';
import { Typography, Fab, Button, Card, CardContent, Grid, Divider} from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import Alert from '@material-ui/lab/Alert';
import Paginacion from './../diseño/Paginacion.js';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import AddIcon from '@material-ui/icons/Add';
import ForwardIcon from '@material-ui/icons/Forward';
import CheckIcon from '@material-ui/icons/Check';
import Footer from '../diseño/Footer.js';
import * as CGeneral from '../../constantes/general/CGeneral';
import * as CEstacionamientos from '../../constantes/estacionamientos/CEstacionamientos';
import PaginacionContext from './../../context/paginacion/paginacionContext';
import SpinnerContext from '../../context/spinner/spinnerContext.js';
import Spinner from '../diseño/Spinner.js';
import {useStyles} from './Styles';
import Swal from '../diseño/Swal';
import Toast from '../diseño/Toast.js';

const Lugares = () => {
    const classes = useStyles();
    const {usuario, firebase} = useContext(FirebaseContext);
    const [lugares, guardarLugares] = useState([]);
    const [estacionamientoInfo, guardarEstacionamientoInfo] = useState()
    useEffect(()=>{
        async function obtenerInfoEstacionamiento () {
            try {
                firebase.db.collection('estacionamientos')
                .where('encargado','==', localStorage.getItem('usuario'))
                .onSnapshot(manejarSnapshot);
            } catch (error) {
                console.log(error);
            }
        }
        obtenerInfoEstacionamiento();
        },[])
        function manejarSnapshot(snapshot){
        if (!snapshot) return;
        const resultado = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        });
        guardarLugares(resultado[0].lugares);
        guardarEstacionamientoInfo(resultado[0]);
        console.log(resultado[0]);
    }
    // función para agregar lugar
    async function agregarLugar (){
        try {
            await firebase.agregarLugar(estacionamientoInfo.id,
            lugares.length + 1, `Lugar ${lugares.length+1}`,
            false, "habilitado");
            Swal(CGeneral.OPERACION_COMPLETADA, CEstacionamientos.LUGAR_AGREGADO_CORRECTAMENTE);
        } catch (error) {
            console.log(error)
            Toast(error.code);
        }
    }
    // función para liberar lugar
    async function liberarLugar(){
        //armar array con objetos de lugares
            let nuevoLugar = {
                "id": lugares.length,
                "nombre": `Lugar ${lugares.length+1}`,
                "ocupado": false
            }
            lugares.push(nuevoLugar);
            Swal(CGeneral.OPERACION_COMPLETADA, CEstacionamientos.LUGAR_AGREGADO_CORRECTAMENTE);
    }
    // función para habilitar lugar
   async function habilitarLugar(id){
    try {
        await firebase.habilitarLugar(estacionamientoInfo.id, id);
        Swal(CGeneral.OPERACION_COMPLETADA, CEstacionamientos.LUGAR_HABILITADO_CORRECTAMENTE);
    } catch (error) {
        console.log(error)
        Toast(error.code);
        }
    }
    // función para deshabilitar lugar
   async function deshabilitarLugar(id){
        try {
            await firebase.deshabilitarLugar(estacionamientoInfo.id, id);
            Swal(CGeneral.OPERACION_COMPLETADA, CEstacionamientos.LUGAR_DESHABILITADO_CORRECTAMENTE);
        } catch (error) {
            console.log(error)
            Toast(error.code);
        }
    }
        // función para deshabilitar lugar
   async function liberarLugar(id){
    try {
        await firebase.liberarLugar(estacionamientoInfo.id, id);
        Swal(CGeneral.OPERACION_COMPLETADA, CEstacionamientos.LUGAR_LIBERADO_CORRECTAMENTE);
    } catch (error) {
        console.log(error)
        Toast(error.code);
        }
    }
    //context de paginación y spinner
    const paginacionContext = useContext(PaginacionContext);
    const { pagina, itemsPorPagina } = paginacionContext;
    const spinnerContext = useContext(SpinnerContext);
    const { cargando } = spinnerContext;
    return (
        (!cargando ? 
        <>
            <Navbar/>
            <Typography className={classes.titulo}>Administrar lugares de mi estacionamiento</Typography>
            &nbsp;
            <Alert className={classes.alerta} severity="info" variant="filled">En esta pantalla usted podrá administrar todos los lugares disponibles dentro de su playa de estacionamiento. Además podrá liberar aquellos lugares que se encuentren ocupados en caso de necesitarlo.
            </Alert>
            <Fab className={classes.botonAgregar} onClick={agregarLugar} aria-label="add">
                <AddIcon /> 
            </Fab>
             &nbsp;
             <Typography className={classes.cantidad}>Total de lugares: {lugares.length}</Typography>
                 <Grid item lg={12} xs={12}>
                    <Card className = {classes.cartaLugares}>
                        {lugares.slice((pagina-1)* itemsPorPagina, pagina*itemsPorPagina).map(lugar =>(
                            <>
                                <CardActionArea>
                                    <CardContent key={lugar.id}>
                                        { lugar.ocupado ?
                                        <Typography className={classes.ocupado}>Ocupado</Typography>
                                        : ""}
                                        <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                                            <Typography className={classes.camposTitulosLugares}>Nombre: </Typography>
                                            <Typography className={classes.campos}>{lugar.nombre}</Typography>
                                        </div>
                                        {lugar.estado === 'habilitado' && !lugar.ocupado ?
                                        <Button
                                        endIcon={<CancelPresentationIcon/>}
                                        className= {classes.botonDarDeBaja}
                                        onClick={() =>deshabilitarLugar(lugar.id)}
                                        >
                                        Deshabilitar
                                        </Button>
                                        : lugar.estado === 'deshabilitado' && !lugar.ocupado ?
                                        <Button
                                        endIcon={<CheckIcon/>}
                                        className= {classes.botonHabilitar}
                                        onClick={() =>habilitarLugar(lugar.id)}
                                        >
                                        Habilitar
                                        </Button>
                                        : ""}
                                        { lugar.ocupado  ?
                                        <>
                                        <Button
                                        endIcon={<ForwardIcon/>}
                                        className= {classes.botonLiberarLugar}
                                        onClick={() =>liberarLugar(lugar.id)}
                                        >
                                        Liberar
                                        </Button>
                                        </>
                                        : ""}

                                    </CardContent>
                                </CardActionArea>
                                <Divider></Divider>
                            </>
                            ))}
                    </Card>
                    {lugares.length > 0 ? <Paginacion lista={lugares}/> : ""}
                </Grid>
            <Footer/>
        </>
    : <Spinner></Spinner>)
    );
}
 
export default Lugares;