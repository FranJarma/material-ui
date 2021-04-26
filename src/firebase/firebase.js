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

    //método para iniciar sesión
    async login(email, contraseña){
        return this.auth.signInWithEmailAndPassword(email, contraseña);
    }
}
const firebase = new Firebase();
export default firebase;