import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import {FirebaseContext} from '../../firebase';

const RutaPrivada = ({ component: Component, ...props}) => {
    const {usuario} = useContext(FirebaseContext);
    useEffect(()=>{
        if(usuario){
            return true;
        }else {
            return false;
        }
    });
    return (
        <Route {...props } render = { props => !usuario ? (
            <Redirect to="/"/>
        ) : (
            <Component {...props}/>
        )}/>
    
    );
}

export default RutaPrivada;