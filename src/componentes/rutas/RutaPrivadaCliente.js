import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import {FirebaseContext} from '../../firebase';
import SwalInfo from '../diseño/SwalInfo';

const RutaPrivadaCliente = ({ component: Component, ...props}) => {
    const {usuario} = useContext(FirebaseContext);
    useEffect(()=>{
        if(usuario){
            return true;
        }else {
            SwalInfo('Atención','Debe iniciar sesión para acceder');
            localStorage.removeItem('usuario');
            localStorage.removeItem('nombreUsuario');
            return false;
        }
    });
    return (
        <Route {...props } render = { props => !usuario ? (
            <Redirect to={"/encontrar-estacionamiento"}/>
        ) : (
            <Component {...props}/>
        )}/>
    
    );
}

export default RutaPrivadaCliente;