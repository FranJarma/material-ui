import { SETEAR_PAGINA } from "../../types";

export default (state, action) => {
    switch (action.type) {
        case SETEAR_PAGINA:
            return {
                ...state,
                pagina: action.payload
            }
        default:
            return state;
    }
};