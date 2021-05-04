const traducirError = (codigo) => {
    let mensaje = '';
    switch(codigo) {
        case 'auth/invalid-email':
            mensaje = 'Ingrese un correo electrónico válido';
            return mensaje;
        case 'auth/email-already-in-use':
            mensaje = 'El correo electrónico ya se encuentra registrado.';
            return mensaje;
        case 'auth/user-not-found':
            mensaje = 'El correo electrónico ingresado no se encuentra registrado.';
            return mensaje;
        case 'auth/wrong-password':
            mensaje = 'La contraseña ingresada no es correcta.';
            return mensaje;
        case 'auth/too-many-requests':
            mensaje = 'La cuenta ha sido deshabilitada temporalmente debido a varios intentos fallidos. Por favor, intente nuevamente en 5 minutos o reinicie su contraseña para continuar.'
            return mensaje;
        case 'auth/weak-password':
            mensaje = 'La contraseña es muy débil. Tiene que tener 6 caracteres como mínimo.'
            return mensaje;
        case 'auth/network-request-failed':
            mensaje = 'Ha ocurrido un problema en la red.'
            return mensaje;
        default: 
            return null;
    }
}
export default traducirError;