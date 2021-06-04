import React, {useState, useEffect, useContext} from 'react';
import {FirebaseContext} from './../../firebase/';
import Navbar from '../diseño/Navbar.js';
import { 
Typography, Button, TextField, Grid, Card, FormHelperText } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import Footer from '../diseño/Footer.js';
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
        contraseña: '',
        rcontraseña: '',
    });
    const {id, contraseña, rcontraseña} = usuarioInfo;
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
        id: resultado[0].id
    });
    }

    async function cambiarContraseña() {
        console.log(usuarioInfo.id)
        try {
            if(contraseña === '' || rcontraseña === ''){
                Toast(CGeneral.COMPLETE_TODOS_LOS_CAMPOS);
            }
            else{
                if(contraseña !== rcontraseña) {
                    Toast(CGeneral.LAS_CONTRASEÑAS_NO_COINCIDEN)
                }
                else {
                    usuario.updatePassword(contraseña)
                    Swal(CGeneral.OPERACION_COMPLETADA, CAuth.DATOS_PERSONALES_MODIFICADOS);
                    history.push('/');
                }
            }
        }
        catch (error) {
            console.log(error);
            Toast(traducirError(error.code))
        }
    }
    
    const classes = useStyles();
    return ( 
        <>  
        <Navbar/>
        <Typography className={classes.titulo}>Cambiar mi contraseña</Typography>
        &nbsp;
        <Card className={classes.cartaDatosPersonales}>
                <FormHelperText>Al modificar su contraseña, tendrá que iniciar sesión de nuevo</FormHelperText>
                &nbsp;
                <Grid container spacing={3}>
                    <Grid item lg={6} xs={6} >
                        <TextField
                        className={classes.inputDatosPersonales}
                        autoFocus
                        label="Contraseña"
                        value={contraseña}
                        name="contraseña"
                        onChange={onChange}
                        variant="outlined"
                        type="password"
                        fullWidth
                        />
                    </Grid>
                    <Grid item lg={6} xs={6} >
                        <TextField
                        className={classes.inputDatosPersonales}
                        label="Repetir contraseña"
                        value={rcontraseña}
                        name="rcontraseña"
                        onChange={onChange}
                        variant="outlined"
                        type="password"
                        fullWidth
                        />
                    </Grid>
            </Grid>
            &nbsp;
            <Button
                endIcon={<CheckIcon/>}
                onClick={cambiarContraseña}
                className= {classes.botonModificarDatos}>Cambiar Contraseña
            </Button>
        </Card>
        &nbsp;
        <Footer/>
    </>
     );
}
 
export default DatosPersonales;