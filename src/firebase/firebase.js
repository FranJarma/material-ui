import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import firebaseConfig from './config';

//se realiza una clase para que cada vez que se la llame, se inicializa la app
class Firebase {
    constructor(){
        if(!app.apps.length){
            app.initializeApp(firebaseConfig);
        }
        this.auth = app.auth();
        this.db = app.firestore();
        this.storage = app.storage();
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
    //metodo para modificar datos del usuario por id
    async modificarUsuario(id, nombreCompleto, nombreUsuario, email, telefono, dni, esEncargado, esAdmin){
        this.db.collection('usuarios').doc(id).update({
            nombreCompleto: nombreCompleto,
            nombreUsuario: nombreUsuario,
            email: email,
            telefono: telefono,
            dni: dni,
            esEncargado: esEncargado,
            esAdmin: esAdmin
        })
    }
    //método para eliminar un usuario por su id
    async eliminarUsuario(id){
        this.db.collection('usuarios').doc(id).delete();
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
//MÉTODOS PARA ADMINISTRACIÓN DE ESTACIONAMIENTOS
    //método para registrar nuevo estacionamiento
    async registrarEstacionamiento(nombreCompleto, nSucursal, ubicacion, telefono, cuit, lugares, 
        horaApertura, horaCierre, horarioCorrido, diasApertura, todosLosDias, tarifaCamioneta,
        tarifaAuto, tarifaMoto, tarifaTraffic, encargado, valoracion, descripcion){
        this.db.collection('estacionamientos').add({
            nombreCompleto: nombreCompleto,
            nSucursal: nSucursal,
            telefono: telefono,
            ubicacion: ubicacion,
            cuit: cuit,
            lugares: lugares,
            horarioCorrido,
            todosLosDias,
            horario: {
                horaApertura: horaApertura,
                horaCierre: horaCierre,
            },
            diasApertura,
            tarifas: [
                {
                    vehiculo: 'automovil',
                    valor: tarifaAuto
                },
                {
                    vehiculo: 'camioneta',
                    valor: tarifaCamioneta
                },
                {
                    vehiculo: 'motocicleta',
                    valor: tarifaMoto
                },
                {
                    vehiculo: 'traffic',
                    valor: tarifaTraffic
                },
            ],
            encargado: encargado,
            valoracion: valoracion,
            descripcion: descripcion
        })
    }
    //metodo para modificar datos del estacionamiento por id
    async modificarEstacionamiento(id, nombreCompleto, nSucursal, ubicacion, telefono, cuit, lugares,
        horaApertura, horaCierre, horarioCorrido, diasApertura, todosLosDias, tarifaCamioneta,
        tarifaAuto, tarifaMoto, tarifaTraffic, encargado, descripcion, urlImagen){
        this.db.collection('estacionamientos').doc(id).update({
            nombreCompleto: nombreCompleto,
            nSucursal: nSucursal,
            telefono: telefono,
            ubicacion: ubicacion,
            cuit: cuit,
            lugares: lugares,
            horarioCorrido,
            todosLosDias,
            horario: {
                horaApertura: horaApertura,
                horaCierre: horaCierre,
            },
            diasApertura,
            tarifas: [
                {
                    vehiculo: 'automovil',
                    valor: tarifaAuto
                },
                {
                    vehiculo: 'camioneta',
                    valor: tarifaCamioneta
                },
                {
                    vehiculo: 'motocicleta',
                    valor: tarifaMoto
                },
                {
                    vehiculo: 'traffic',
                    valor: tarifaTraffic
                },
            ],
            encargado: encargado,
            descripcion: descripcion,
            urlImagen: urlImagen
        })
    }
        //metodo para modificar datos del estacionamiento por id (encargado)
        async modificarMiEstacionamiento(id, nombreCompleto, telefono, cuit, descripcion, urlImagen){
            this.db.collection('estacionamientos').doc(id).update({
                nombreCompleto: nombreCompleto,
                telefono: telefono,
                cuit: cuit,
                descripcion: descripcion,
                urlImagen: urlImagen
            })
        }
    //método para eliminar un estacionamiento por su id
    async eliminarEstacionamiento(id){
        this.db.collection('estacionamientos').doc(id).delete();
    }
    //método para traer estacionamiento por usuario
    async traerEstacionamiento(uid){
        return await this.db.collection('estacionamientos').where('encargado', '==', uid);
    }
}
const firebase = new Firebase();
export default firebase;