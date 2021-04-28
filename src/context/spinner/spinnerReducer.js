import { MOSTRAR_SPINNER, OCULTAR_SPINNER } from '../../constantes/context/context.js';

export default (state, action) => {
    switch (action.type) {
        case MOSTRAR_SPINNER:
            return {
                ...state,
                cargando: true
            }
        case OCULTAR_SPINNER:
            return {
                ...state,
                cargando: false
            }
        default:
            return state;
    }
};