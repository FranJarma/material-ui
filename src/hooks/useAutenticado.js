import { useState, useEffect} from 'react';
import firebase from '../firebase';

//este custom hook sirve para mantener la sesión activa del usuario por más que recargue la página
function useAutenticado () {

    //state para manejar si está autenticado o no, al principio no está 
    const [usuarioAutenticado, guardarUsuarioAutenticado] = useState(null);
    useEffect(()=>{
        const unsuscribe = firebase.auth.onAuthStateChanged(usuario => {
            if (usuario) {
                guardarUsuarioAutenticado(usuario);
            }
            else {
                guardarUsuarioAutenticado(null);
            }
        });
        return () => unsuscribe();
    });
    return usuarioAutenticado;
}

export default useAutenticado;