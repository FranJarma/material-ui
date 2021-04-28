import React, { useReducer } from 'react';
import PaginacionContext from './paginacionContext';
import PaginacionReducer from './paginacionReducer';
import { SETEAR_PAGINA } from '../../constantes/context/context.js';

const PaginacionState = (props) => {
    const initialState = {
        pagina: 1,
        itemsPorPagina: 9
    };

const [state, dispatch] = useReducer(PaginacionReducer, initialState);
const setearPagina = (pagina) => {
    dispatch({
        type: SETEAR_PAGINA,
        payload: pagina
    });
};
return (
    <PaginacionContext.Provider
        value={{
            pagina: state.pagina,
            itemsPorPagina: state.itemsPorPagina,
            setearPagina
        }}
    >
    {props.children}
    </PaginacionContext.Provider>
);
}
export default PaginacionState;