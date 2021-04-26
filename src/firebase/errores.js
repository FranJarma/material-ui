const traducirError = (codigo) => {
    let mensaje = '';
    switch(codigo) {
        case 'auth/invalid-email':
            mensaje = 'El correo electrónico ingresado es inválido.';
            return mensaje;
        case 'auth/wrong-password':
            mensaje = 'La contraseña ingresada no es correcta.';
            return mensaje;
        case 'auth/too-many-requests':
            mensaje = 'La cuenta ha sido deshabilitada temporalmente debido a varios intentos fallidos. Por favor, intente nuevamente en 5 minutos o reinicie su contraseña para continuar.'
            return mensaje;
        default: 
            return null;
    }
}
export default traducirError;