import { MOSTRAR_SPINNER, OCULTAR_SPINNER } from "../../types";

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