import app from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './config';

//se realiza una clase para que cada vez que se la llame, se inicializa la app
class Firebase {
    constructor(){
        if(!app.apps.length){
            app.initializeApp(firebaseConfig);
        }
        this.auth = app.auth();
    }

    //método para registrar usuario
    async registrarUsuario(nombreCompleto, email, contraseña){
        const nuevoUsuario = await this.auth.createUserWithEmailAndPassword(email, contraseña);
        return await nuevoUsuario.user.updateProfile({
            displayName: nombreCompleto
        })
    }
    //método para iniciar sesión
    async login(email, contraseña){
        return this.auth.signInWithEmailAndPassword(email, contraseña);
    }
    //método para recuperar contraseña
    async recuperarContraseña(email){
        return this.auth.sendPasswordResetEmail(email);
    }
}
const firebase = new Firebase();
export default firebase;