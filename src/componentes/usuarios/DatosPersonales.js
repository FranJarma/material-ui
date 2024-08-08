import React, {useState, useEffect, useContext} from 'react';
import {FirebaseContext} from './../../firebase/';
import Navbar from '../diseño/Navbar.js';
import { 
Typography, Button, TextField, Grid, Card, FormHelperText } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import Footer from '../diseño/Footer.js';

import InputMask from 'react-input-mask';
import * as CGeneral from '../../constantes/general/CGeneral';
import {useStyles} from './Styles';
import * as CAuth from '../../constantes/auth/CAuth';
import Toast from '../diseño/Toast';
import Swal from '../diseño/Swal';
import traducirError from '../../firebase/errores';
import { useHistory } from 'react-router-dom';

const DatosPersonales = () => {
    const {usuario, firebase} = useContext(FirebaseContext);
    const history = useHistory();
    //state para manejar el contenido de los inputs
    const [usuarioInfo, guardarUsuarioInfo] = useState({
        id: '',
        nombreCompleto: '',
        email: '',
        nombreUsuario: '',
        contraseña: '',
        rcontraseña: '',
        telefono: '',
        dni: '',
        esEncargado: false,
        esAdmin: false
    });
    const { nombreCompleto, email, nombreUsuario, contraseña, rcontraseña, telefono, dni } = usuarioInfo;
    //evento onChange
    const onChange = (e) => {
        guardarUsuarioInfo({
            ...usuarioInfo,
            [e.target.name] : e.target.value
    })};
    
    useEffect(()=>{
        const obtenerInfoUsuario = () => {
            try {
                firebase.db.collection('usuarios')
                .where('uid','==', localStorage.getItem('usuario'))
                .onSnapshot(manejarSnapshot);
            } catch (error) {
                Toast(error);
            }
        }
        obtenerInfoUsuario();
        },[])
        function manejarSnapshot(snapshot){
        if (!snapshot) return;
        const resultado = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        });
    guardarUsuarioInfo({
        id: resultado[0].id,
        nombreCompleto: resultado[0].nombreCompleto,
        email: resultado[0].email,
        nombreUsuario: resultado[0].nombreUsuario,
        telefono: resultado[0].telefono,
        dni: resultado[0].dni,
        esEncargado: resultado[0].esEncargado,
        esAdmin: resultado[0].esAdmin,
        contraseña: firebase.auth.currentUser.password
    });
    }

    async function modificarUsuario() {
        try {
            if(nombreCompleto === '' || nombreUsuario === '' ||  email === '' || contraseña === '' || rcontraseña === '' || dni === '' || telefono === ''){
                Toast(CGeneral.COMPLETE_TODOS_LOS_CAMPOS);
            }
            else if(contraseña !== rcontraseña) {
                Toast(CGeneral.LAS_CONTRASEÑAS_NO_COINCIDEN);
            }
            //se utiliza la función includes para verificar si alguno de los dos campos tiene espacio en blanco
            else if(dni.includes('_')){
                Toast(CGeneral.VALIDACION_DNI)
            }
            else if(telefono.includes('_')){
                Toast(CGeneral.VALIDACION_TELEFONO)
            }
            else{
                //hay que pasarle el id del documento
                await firebase.modificarUsuario(usuarioInfo.id, nombreCompleto,
                nombreUsuario, email, telefono, dni, usuarioInfo.esEncargado, usuarioInfo.esAdmin)
                .then(
                    usuario.updateEmail(email)
                )
                Swal(CGeneral.OPERACION_COMPLETADA, CAuth.DATOS_PERSONALES_MODIFICADOS);
                history.push('/login-encargados');
            }
        }
        catch (error) {
            Toast(traducirError(error.code))
        }
    }
    
    const classes = useStyles();
    return ( 
        <>  
        <Navbar/>
        <Typography className={classes.titulo}>Mis datos personales</Typography>
        &nbsp;
        <Card className={classes.cartaDatosPersonales}>
        &nbsp;
            <Grid container spacing={3}>
                <Grid item sm={6} xs={12}>
                <TextField
                className={classes.inputDatosPersonales}
                label="Nombre Completo"
                autoFocus
                name="nombreCompleto"
                variant="outlined"
                fullWidth
                value={nombreCompleto}
                onChange={onChange}
                />
                </Grid>
                <Grid item sm={6} xs={12}>
                <TextField
                className={classes.inputDatosPersonales}
                label="Nombre de usuario"
                name="nombreUsuario"
                variant="outlined"
                fullWidth
                value={nombreUsuario}
                onChange={onChange}
                />
                </Grid>
                <Grid item sm={6} xs={12} >
                <InputMask 
                        mask="(+54) 9999999999"
                        value={telefono}
                        onChange={onChange}
                        className = {classes.inputDatosPersonales}
                        >
                            {() => <TextField
                                className = {classes.inputDatosPersonales}
                                type="text"
                                fullWidth
                                name="telefono"
                                variant="outlined"
                                label={CGeneral.TELEFONO}
                            />
                            }
                        </InputMask>
                </Grid>
                <Grid item sm={6} xs={12} >
                <InputMask
                        mask="99.999.999"
                        value={dni}
                        onChange={onChange}
                        className={classes.inputDatosPersonales}
                        >
                            {() => <TextField
                                className = {classes.inputDatosPersonales}
                                type="text"
                                fullWidth
                                name="dni"
                                variant="outlined"
                                label={CGeneral.DNI}
                            />
                            }
                        </InputMask>
                </Grid>
                <Grid item sm={12} xs={12} >
                <TextField
                className={classes.inputDatosPersonales}
                label="Correo electrónico"
                variant="outlined"
                value={email}
                name="email"
                onChange={onChange}
                fullWidth
                />
                <FormHelperText>Al modificar su correo, se enviará un email a su correo viejo avisándole dicho cambio</FormHelperText>
                </Grid>
            </Grid>
            &nbsp;
            <Button
                endIcon={<CheckIcon/>}
                onClick={modificarUsuario}
                className= {classes.botonModificarDatos}>Modificar datos
            </Button>
        </Card>
        &nbsp;
        <Footer/>
    </>
     );
}
 
export default DatosPersonales;