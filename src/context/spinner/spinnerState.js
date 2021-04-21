import React, { useReducer } from 'react';
import SpinnerContext from './spinnerContext';
import SpinnerReducer from './spinnerReducer';
import { MOSTRAR_SPINNER, OCULTAR_SPINNER } from './../../types/index';

const SpinnerState = (props) => {
    const initialState = {
        cargando: false
    };

const [state, dispatch] = useReducer(SpinnerReducer, initialState);
const mostrarSpinner = () => {
    dispatch({
        type: MOSTRAR_SPINNER,
    });
    setTimeout(()=>{
        dispatch({
            type: OCULTAR_SPINNER,
        });
    },1000)
};
return (
    <SpinnerContext.Provider
        value={{
            cargando: state.cargando,
            mostrarSpinner
        }}
    >
    {props.children}
    </SpinnerContext.Provider>
);
}
export default SpinnerState;