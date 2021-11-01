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
// MÉTODOS PARA ADMINISTRACIÓN DE RESERVAS
    //método para registrar reserva
    async registrarReserva(usuario, tipoVehiculo, marcaVehiculo,
        patenteVehiculo, estacionamientoId, nombreEstacionamiento,
        cuitEstacionamiento, provinciaEstacionamiento,
        ciudadEstacionamiento, direccionEstacionamiento, fechaReserva,
        horaReserva, fechaCreacion, observaciones, estado, pago){
        this.db.collection('reservas').add({
            usuario: usuario,
            tipoVehiculo: tipoVehiculo,
            marcaVehiculo: marcaVehiculo,
            patenteVehiculo: patenteVehiculo,
            estacionamiento: {
                id: estacionamientoId,
                cuit: cuitEstacionamiento,
                nombre: nombreEstacionamiento,
                provincia: provinciaEstacionamiento,
                ciudad: ciudadEstacionamiento,
                direccion: direccionEstacionamiento
            },
            fechaReserva: fechaReserva,
            horaReserva: horaReserva,
            fechaCreacion: fechaCreacion,
            observaciones: observaciones,
            estado: estado,
            pago: [{
                valor: pago
            }]
        })
    }
// MÉTODOS PARA ADMINISTRACIÓN DE USUARIOS
    //método para registrar usuario
    async registrarUsuario(nombreCompleto, email, nombreUsuario, contraseña, esEncargado, fechaCreacion,
        telefono, dni, esAdmin){
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
    // MÉTODOS PARA ADMINISTRACIÓN DE USUARIOS
    //método para registrar usuario
    async registrarCliente(nombreCompleto, email, nombreUsuario, contraseña, fechaCreacion,
        telefono, dni){
        this.auth.createUserWithEmailAndPassword(email, contraseña)
        .then(nuevoUsuario => {
            this.db.collection('usuarios').add({
                uid: nuevoUsuario.user.uid,
                nombreCompleto: nombreCompleto,
                nombreUsuario: nombreUsuario,
                email: email,
                fechaCreacion: fechaCreacion,
                telefono: telefono,
                dni: dni,
            })
        })
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
    async registrarEstacionamiento(nombreCompleto, nSucursal, ubicacion, telefono, cuit, lugares, encargado){
        this.db.collection('estacionamientos').add({
            nombreCompleto: nombreCompleto,
            nSucursal: nSucursal,
            telefono: telefono,
            ubicacion: ubicacion,
            cuit: cuit,
            lugares: lugares,
            encargado: encargado,
            valoracion: 0,
            tarifas: [],
            horarios: [],
            comentarios: [],
            puntuaciones: []
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
    async modificarHorarios(id, horaAperturaLunes, horaAperturaMartes, horaAperturaMiercoles,
        horaAperturaJueves, horaAperturaViernes, horaAperturaSabado, horaAperturaDomingo, horaCierreLunes,
        horaCierreMartes, horaCierreMiercoles, horaCierreJueves, horaCierreViernes, horaCierreSabado,
        horaCierreDomingo){
            this.db.collection('estacionamientos').doc(id).update({
                horarios:[
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
                    id: 0,
                    vehiculo: 'Automovil',
                    valor: tarifaAuto
                },
                {
                    id: 1,
                    vehiculo: 'Camioneta',
                    valor: tarifaCamioneta
                },
                {
                    id: 2,
                    vehiculo: 'Motocicleta',
                    valor: tarifaMoto
                },
                {
                    id: 3,
                    vehiculo: 'Traffic',
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
    //método para dejar un comentario y una valoración
    async registrarPuntuacion(id, comentario, puntuacion, valoracion) {
        this.db.collection('estacionamientos').doc(id).get()
        .then((doc)=> {
            const comentarios = doc.data().comentarios;
            const puntuaciones = doc.data().puntuaciones;
            comentarios.push({
                contenido: comentario,
                votosPositivos: 0,
                votosNegativos: 0
            });
            puntuaciones.push({
                contenido: puntuacion
            });
            const nuevaValoracion = puntuaciones.map(item => item.contenido).reduce((prev, next) => prev + next) / puntuaciones.length;
            this.db.collection('estacionamientos').doc(id).update({
                comentarios: comentarios,
                puntuaciones: puntuaciones,
                valoracion: nuevaValoracion
            })
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
    //mensualidades
    async solicitarMensualidad(usuario, estacionamiento, dias, horaIngreso, horaSalida, observaciones){
        this.db.collection('mensualidades').add({
            usuario: usuario,
            estacionamiento: estacionamiento,
            diasSolicitados: dias,
            horaIngreso: horaIngreso,
            horaSalida: horaSalida,
            observaciones: observaciones,
            estado: "Solicitada"
        })
    }
}
const firebase = new Firebase();
export default firebase;