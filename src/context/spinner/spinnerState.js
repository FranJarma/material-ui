import React, { useReducer } from 'react';
import SpinnerContext from './spinnerContext';
import SpinnerReducer from './spinnerReducer';
import { MOSTRAR_SPINNER, OCULTAR_SPINNER } from '../../constantes/context/context.js';

const SpinnerState = (props) => {
    const initialState = {
        cargando: false,
        mensaje: ''
    };

const [state, dispatch] = useReducer(SpinnerReducer, initialState);
const mostrarSpinner = (mensaje) => {
    dispatch({
        type: MOSTRAR_SPINNER,
        payload: mensaje
    });
    setTimeout(()=>{
        dispatch({
            type: OCULTAR_SPINNER,
        });
    },2000)
};
return (
    <SpinnerContext.Provider
        value={{
            cargando: state.cargando,
            mensaje: state.mensaje,
            mostrarSpinner
        }}
    >
    {props.children}
    </SpinnerContext.Provider>
);
}
export default SpinnerState;