import React, {useState, useContext, useEffect} from 'react';
import Navbar from '../diseño/Navbar.js';
import { Typography, Fab} from '@material-ui/core';
import Paginacion from '../diseño/Paginacion.js';
import AddIcon from '@material-ui/icons/Add';
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
import Usuario from './Usuario.js';
import NuevoUsuario from './NuevoUsuario.js';

const Usuarios = () => {
    const classes = useStyles();
    //states para agregar nuevo usuario
    const [modalNuevoUsuario, setAbrirModalNuevoUsuario] = useState(false);
    const handleClickAbrirModalNuevoUsuario = () => {
        setAbrirModalNuevoUsuario(true);
    };
    const handleClickCerrarModalNuevoUsuario = () => {
        setAbrirModalNuevoUsuario(false);
    };
   //state para guardar usuarios
   const [usuarios, guardarUsuarios] = useState([]);
   const {firebase} = useContext(FirebaseContext);
   //use effect para que constantemente traiga los usuarios
   useEffect (() => {
       const obtenerUsuarios = () => {
           try {
               firebase.db.collection('usuarios').orderBy('nombreCompleto', 'asc')
               .onSnapshot(manejarSnapshot); 
           } catch (error) {
               Toast(error);
           }
       }
       obtenerUsuarios();
   },[])
   function manejarSnapshot(snapshot){
       if (!snapshot) return;
       const usuarios = snapshot.docs.map(doc => {
           return {
               id: doc.id,
               ...doc.data()
           }
       });
       guardarUsuarios(usuarios);
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
            <Typography className={classes.titulo}>Administración de usuarios</Typography>
                &nbsp;
                <Fab className={classes.botonAgregar} onClick={handleClickAbrirModalNuevoUsuario} aria-label="add">
                    <PersonAddIcon/> 
                </Fab>
                <Typography className={classes.cantidad}>Total de usuarios: {usuarios.length}</Typography>
                    {usuarios.slice((pagina-1)* itemsPorPagina, pagina*itemsPorPagina).map(usuario =>(
                    <>
                        <Usuario key={usuario.id} usuario={usuario}/>
                    </>
                    ))}
                <Dialog style={{zIndex: 1}} maxWidth={'md'} open={modalNuevoUsuario}
                    onClose={handleClickCerrarModalNuevoUsuario}
                    aria-labelledby="form-dialog-title">
                    <div style={{backgroundColor: '#43a047'}}>
                        <Typography className={classes.tituloModal} id="form-dialog-title"
                        >Agregar nuevo usuario
                        <Typography onClick={handleClickCerrarModalNuevoUsuario} className={classes.botonCerrarModal}
                        >X</Typography>
                        </Typography>
                    </div>
                    <DialogContent>
                    &nbsp;
                    <DialogContentText> Ingrese datos. Una vez ingresados se enviará un email al correo ingresado con los datos del nuevo usuario.</DialogContentText>
                        <NuevoUsuario cerrarModal={handleClickCerrarModalNuevoUsuario}/>
                    </DialogContent>
                </Dialog>
                {usuarios.length > 0 ? <Paginacion lista={usuarios}/> : ""}
            <Footer/>
        </>
    : <Spinner></Spinner>)
    );
}
 
export default Usuarios;