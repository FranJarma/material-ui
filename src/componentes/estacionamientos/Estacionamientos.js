import React, {useState, useContext, useEffect} from 'react';
import Navbar from '../diseño/Navbar.js';
import { Typography, Fab, Grid} from '@material-ui/core';
import Paginacion from '../diseño/Paginacion.js';
import Footer from '../diseño/Footer.js';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import PaginacionContext from '../../context/paginacion/paginacionContext';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import SpinnerContext from '../../context/spinner/spinnerContext.js';
import Spinner from '../diseño/Spinner.js';
import { FirebaseContext } from '../../firebase';
import Toast from './../diseño/Toast';
import {useStyles} from './Styles';
import Estacionamiento from './Estacionamiento.js';
import AdministrarEstacionamiento from './AdministrarEstacionamiento';
import * as CEstacionamientos from './../../constantes/estacionamientos/CEstacionamientos';

const Estacionamientos = () => {
    const classes = useStyles();
    //context de paginación y spinner
    const paginacionContext = useContext(PaginacionContext);
    const { pagina, itemsPorPagina } = paginacionContext;
    const spinnerContext = useContext(SpinnerContext);
    const { cargando } = spinnerContext;
    //states para agregar nuevo estacionamiento
    const [modalNuevoEstacionamiento, setAbrirModalNuevoEstacionamiento] = useState(false);
    const handleClickAbrirModalNuevoEstacionamiento = () => {
        setAbrirModalNuevoEstacionamiento(true);
    };
    const handleClickCerrarModalNuevoEstacionamiento = () => {
        setAbrirModalNuevoEstacionamiento(false);
    };
    //state para guardar estacionamientos
   const [estacionamientos, guardarEstacionamientos] = useState([]);
   const {firebase} = useContext(FirebaseContext);
   //use effect para que constantemente traiga los estacionamientos
   useEffect (() => {
       const obtenerEstacionamientos = () => {
           try {
               firebase.db.collection('estacionamientos').orderBy('nombreCompleto', 'asc')
               .onSnapshot(manejarSnapshot); 
           } catch (error) {
               Toast(error);
           }
       }
       obtenerEstacionamientos();
   },[])
   function manejarSnapshot(snapshot){
    if (!snapshot) return;
    const estacionamientos = snapshot.docs.map(doc => {
        return {
            id: doc.id,
            ...doc.data()
        }
    });
    guardarEstacionamientos(estacionamientos);
}
    return (
        (!cargando ? 
        <>
            <Navbar/>
            <Typography className={classes.titulo}>{CEstacionamientos.ADMINISTRACION_DE_ESTACIONAMIENTOS}</Typography>
                &nbsp;
                <Fab className={classes.botonAgregar} onClick={handleClickAbrirModalNuevoEstacionamiento} aria-label="add">
                    <PersonAddIcon/> 
                </Fab>
                <Typography className={classes.cantidad}>Total de estacionamientos: {estacionamientos.length}</Typography>
                    <Grid container>
                        {estacionamientos.slice((pagina-1)* itemsPorPagina, pagina*itemsPorPagina).map(estacionamiento =>(
                        <>
                            <Estacionamiento key={estacionamiento.uid} estacionamiento={estacionamiento}/>
                        </>
                        ))}
                    </Grid>
                <Dialog style={{zIndex: 1}} maxWidth={'xl'} open={modalNuevoEstacionamiento}
                    onClose={handleClickCerrarModalNuevoEstacionamiento}
                    aria-labelledby="form-dialog-title">
                    <div style={{backgroundColor: '#43a047'}}>
                        <Typography className={classes.tituloModal} id="form-dialog-title"
                        >{CEstacionamientos.NUEVO_ESTACIONAMIENTO}
                        <Typography onClick={handleClickCerrarModalNuevoEstacionamiento}
                        className={classes.botonCerrarModal}
                        >X</Typography>
                        </Typography>
                    </div>
                    <DialogContent>
                        <DialogContentText>
                            <AdministrarEstacionamiento estacionamientoId="" accion="Registrar" cerrarModal={handleClickCerrarModalNuevoEstacionamiento}/>
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
                {estacionamientos.length > 0 ? <Paginacion lista={estacionamientos}/> : ""}
            <Footer/>
        </>
    : <Spinner></Spinner>)
);
}
 
export default Estacionamientos;