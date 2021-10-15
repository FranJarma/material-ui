import { useState, useEffect, useContext} from 'react';
import Toast from '../componentes/diseño/Toast';
import traducirError from '../firebase/errores';
import {FirebaseContext} from './..//firebase';

//state para traer la información del usuario logueado
function useInfoUsuario (){
const [usuarioInfo, guardarUsuarioInfo] = useState({});
const {usuario, firebase} = useContext(FirebaseContext);
useEffect (() => {
const obtenerInfoUsuario = () => {
    try {
        firebase.db.collection('usuarios')
        .where('uid','==', localStorage.getItem('usuario'))
        .onSnapshot(manejarSnapshot);
    } catch (error) {
        Toast(traducirError(error.code));
    }
}
obtenerInfoUsuario();
},[])
function manejarSnapshot(snapshot){
if (!snapshot) return;
const resultado = snapshot.docs.map(doc => {
    return {
        id: doc.id,
        ...doc.data()
    }
});
guardarUsuarioInfo(resultado[0]);
localStorage.setItem('nombreUsuario', resultado[0].nombreCompleto);
localStorage.setItem('esEncargado', resultado[0].esEncargado);
}
return usuarioInfo;
}
export default useInfoUsuario;