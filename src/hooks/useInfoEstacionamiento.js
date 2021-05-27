import { useState, useEffect, useContext} from 'react';
import {FirebaseContext} from './..//firebase';
import Toast from './../componentes/diseño/Toast';

//state para traer la información del usuario logueado
function useInfoEstacionamiento (){
const [estacionamientoInfo, guardarEstacionamientoInfo] = useState({});
const {usuario, firebase} = useContext(FirebaseContext);
useEffect (() => {
const obtenerInfoEstacionamiento = () => {
    try {
        firebase.db.collection('estacionamientos')
        .where('encargado','==', usuario.uid)
        .onSnapshot(manejarSnapshot);
    } catch (error) {
        Toast(error);
    }
}
obtenerInfoEstacionamiento();
},[firebase.db, usuario.uid])
function manejarSnapshot(snapshot){
if (!snapshot) return;
const resultado = snapshot.docs.map(doc => {
    return {
        id: doc.id,
        ...doc.data()
    }
});
guardarEstacionamientoInfo(resultado[0]);
}
return estacionamientoInfo;
}
export default useInfoEstacionamiento;