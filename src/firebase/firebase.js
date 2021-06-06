import * as admin from 'firebase-admin';
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import firebaseConfig from './config';
var serviceAccount = require("./adminconfig.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://console.cloud.google.com/storage/browser/parking-app-5fdb4.appspot.com'
  });
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
        let usuario1 = this.auth.currentUser;
        console.log(usuario1);
        this.auth.createUserWithEmailAndPassword(email, contraseña)
        .then(nuevoUsuario => {
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
        localStorage.removeItem('usuario');
        this.auth.signOut();
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
    async registrarEstacionamiento(nombreCompleto, nSucursal, ubicacion, telefono, cuit, lugares, encargado, valoracion,
        tarifaAuto, tarifaCamioneta, tarifaMoto, tarifaTraffic, horaAperturaLunes, horaAperturaMartes, horaAperturaMiercoles, horaAperturaJueves, horaAperturaViernes,
        horaAperturaSabado, horaAperturaDomingo, horaCierreLunes, horaCierreMartes, horaCierreMiercoles, horaCierreJueves, horaCierreViernes, horaCierreSabado,
        horaCierreDomingo){
        this.db.collection('estacionamientos').add({
            nombreCompleto: nombreCompleto,
            nSucursal: nSucursal,
            telefono: telefono,
            ubicacion: ubicacion,
            cuit: cuit,
            lugares: lugares,
            encargado: encargado,
            valoracion: valoracion,
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
            horarios: [
                {
                    dia: 'Lunes',
                    apertura: horaAperturaLunes,
                    cierre: horaCierreLunes
                },
                {
                    dia: 'Martes',
                    apertura: horaAperturaMartes,
                    cierre: horaCierreMartes
                },
                {
                    dia: 'Miercoles',
                    apertura: horaAperturaMiercoles,
                    cierre: horaCierreMiercoles
                },
                {
                    dia: 'Jueves',
                    apertura: horaAperturaJueves,
                    cierre: horaCierreJueves
                },
                {
                    dia: 'Viernes',
                    apertura: horaAperturaViernes,
                    cierre: horaCierreViernes
                },
                {
                    dia: 'Sabado',
                    apertura: horaAperturaSabado,
                    cierre: horaCierreSabado
                },
                {
                    dia: 'Domingo',
                    apertura: horaAperturaDomingo,
                    cierre: horaCierreDomingo
                }
            ]
        })
    }
    //metodo para modificar datos del estacionamiento por id
    async modificarEstacionamiento(id, nombreCompleto, nSucursal, ubicacion, telefono, cuit, lugares, encargado){
        this.db.collection('estacionamientos').doc(id).update({
            nombreCompleto: nombreCompleto,
            nSucursal: nSucursal,
            telefono: telefono,
            ubicacion: ubicacion,
            cuit: cuit,
            lugares: lugares,
            encargado: encargado
        })
    }
    //metodo para modificar datos del estacionamiento por id (encargado)
    async modificarHorarios(id, aperturaLunes, aperturaMartes, aperturaMiercoles,
        aperturaJueves, aperturaViernes, aperturaSabado, aperturaDomingo, cierreLunes, cierreMartes,
        cierreMiercoles, cierreJueves, cierreViernes, cierreSabado, cierreDomingo){
        this.db.collection('estacionamientos').doc(id).update({
            horarios: this.db.FieldValue.delete()
        })
        .then(
            this.db.collection('estacionamientos').doc(id).update({
                horarios:[
                    {
                        apertura: aperturaLunes,
                        cierre: cierreLunes
                    },
                    {
                        apertura: aperturaMartes,
                        cierre: cierreMartes
                    },
                    {
                        apertura: aperturaMiercoles,
                        cierre: cierreMiercoles
                    },
                    {
                        apertura: aperturaJueves,
                        cierre: cierreJueves
                    },
                    {
                        apertura: aperturaViernes,
                        cierre: cierreViernes
                    },
                    {
                        apertura: aperturaSabado,
                        cierre: cierreSabado
                    },
                    {
                        apertura: aperturaDomingo,
                        cierre: cierreDomingo
                    }
                ]
            })
        )
    }
    //metodo para modificar datos del estacionamiento por id (encargado)
    async modificarMiEstacionamiento(id, nombreCompleto, telefono, cuit, descripcion, urlImagen,
        tarifaAuto, tarifaCamioneta, tarifaMoto, tarifaTraffic){
        this.db.collection('estacionamientos').doc(id).update({
            nombreCompleto: nombreCompleto,
            telefono: telefono,
            cuit: cuit,
            descripcion: descripcion,
            urlImagen: urlImagen,
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
        })
    }
    //metodo para asignar las posiciones de los lugares de un estacionamiento
    async asignarPosiciones(id, posiciones) {
        this.db.collection('estacionamientos').doc(id).update({
            lugares: posiciones
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
    //métodos para administrar lugares
    //agregar lugar
    async agregarLugar(id, numero, ocupado, estado){
        this.db.collection('estacionamientos').doc(id).get()
        .then((doc)=> {
            const lugares = doc.data().lugares;
            lugares.push({
                "numero": numero,
                "ocupado": ocupado,
                "estado": estado
            });
            this.db.collection('estacionamientos').doc(id).update({
                lugares: lugares
            })
        })
    }
    //liberar lugar
    async liberarLugar(id, lugarId){
        this.db.collection('estacionamientos').doc(id).get()
        .then((doc)=> {
            const lugares = doc.data().lugares;
            const lugarAModificar = lugares.find(lugar => lugar.id === lugarId);
            lugarAModificar.ocupado = false;
            this.db.collection('estacionamientos').doc(id).update({
                lugares: lugares
            })
        })
    }
    //habilitar lugar
    async habilitarLugar(id, lugarId){
        this.db.collection('estacionamientos').doc(id).get()
        .then((doc)=> {
            const lugares = doc.data().lugares;
            const lugarAModificar = lugares.find(lugar => lugar.id === lugarId);
            lugarAModificar.estado = "habilitado";
            this.db.collection('estacionamientos').doc(id).update({
                lugares: lugares
            })
        })
    }
    //deshabilitar lugar
    async deshabilitarLugar(id, lugarId){
        this.db.collection('estacionamientos').doc(id).get()
        .then((doc)=> {
            const lugares = doc.data().lugares;
            const lugarAModificar = lugares.find(lugar => lugar.id === lugarId);
            lugarAModificar.estado = "deshabilitado";
            this.db.collection('estacionamientos').doc(id).update({
                lugares: lugares
            })
        })
    }
}
const firebase = new Firebase();
export default firebase;