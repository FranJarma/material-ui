import { useState, useEffect} from 'react';
import firebase from '../firebase';

//este custom hook sirve para mantener la sesión activa del usuario por más que recargue la página
function useAutenticado () {
    //state para manejar si está autenticado o no, al principio no está 
    const [usuarioAutenticado, guardarUsuarioAutenticado] = useState(localStorage.getItem('usuario'));
    useEffect(()=>{
        const unsuscribe = firebase.auth.onAuthStateChanged(usuario => {
            if (usuario) {
                guardarUsuarioAutenticado(usuario);
                localStorage.setItem('usuario', usuario.uid)
            }
            else {
                guardarUsuarioAutenticado(null);
                localStorage.removeItem('usuario');
                localStorage.removeItem('esEncargado');
            }
        });
        return () => unsuscribe();
    });
    return usuarioAutenticado;
}
export default useAutenticado;