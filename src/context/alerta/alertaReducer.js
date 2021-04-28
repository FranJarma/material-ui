import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from '../../constantes/context/context.js';

export default (state, action) => {
    switch (action.type) {
        case MOSTRAR_ALERTA:
            return {
                ...state,
                alerta: true,
                mensaje: action.payload
            }
        case OCULTAR_ALERTA:
            return {
                ...state,
                alerta: false,
                mensaje: ''
            }
        default:
            return state;
    }
};