import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import firebaseConfig from './config';

//se realiza una clase para que cada vez que se la llame, se inicializa la app
class Firebase {
    constructor(){
        if(!app.apps.length){
            app.initializeApp(firebaseConfig);
        }
        this.auth = app.auth();
        this.db = app.firestore();
    }
// MÉTODOS PARA ADMINISTRACIÓN DE USUARIOS
    //método para registrar usuario
    async registrarUsuario(nombreCompleto, email, nombreUsuario, contraseña, esEncargado, fechaCreacion,
        telefono, dni, esAdmin){
        const nuevoUsuario = this.auth.createUserWithEmailAndPassword(email, contraseña).
        then(nuevoUsuario => {
            this.db.collection('usuarios').add({
                uid: nuevoUsuario.user.uid,
                nombreCompleto: nombreCompleto,
                nombreUsuario: nombreUsuario,
                email: email,
                esEncargado: esEncargado,
                fechaCreacion: fechaCreacion,
                telefono: telefono,
                dni: dni,
                esAdmin: esAdmin,
            })
        })
        return await nuevoUsuario;
    }
    //método para traer usuario por uid
    async traerUsuario(uid){
        return await this.db.collection('usuarios').where('uid', '==', uid);
    }
    //método para iniciar sesión
    async login(email, contraseña){
        return await this.auth.signInWithEmailAndPassword(email, contraseña);
    }
    //método para cerrar sesión
    async cerrarSesion(){
        return this.auth.signOut();
    }
    //método para recuperar contraseña
    async recuperarContraseña(email){
        return this.auth.sendPasswordResetEmail(email);
    }
}
const firebase = new Firebase();
export default firebase;