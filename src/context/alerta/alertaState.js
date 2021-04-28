import React, { useReducer } from 'react';
import AlertaContext from './alertaContext';
import AlertaReducer from './alertaReducer';
import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from '../../constantes/context/context.js';

const SpinnerState = (props) => {
    const initialState = {
        alerta: false,
        mensaje: ''
    };

const [state, dispatch] = useReducer(AlertaReducer, initialState);
const mostrarAlerta = (mensaje) => {
    dispatch({
        type: MOSTRAR_ALERTA,
        payload: mensaje
    });
    setTimeout(()=>{
        dispatch({
            type: OCULTAR_ALERTA,
        });
    },4000)
};
return (
    <AlertaContext.Provider
        value={{
            alerta: state.alerta,
            mensaje: state.mensaje,
            mostrarAlerta
        }}
    >
    {props.children}
    </AlertaContext.Provider>
);
}
export default SpinnerState;