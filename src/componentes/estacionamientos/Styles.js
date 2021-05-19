import {makeStyles} from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
    titulo: {
        fontFamily: "Roboto Condensed, sans-serif",
        textTransform: "uppercase",
        fontSize: 25,
        textAlign: "center"
    },
    cartaEstacionamientos: {
        flexGrow: 1,
        marginBottom: "1rem",
        boxShadow: "0 2px 3px rgba(0,0,0,0.25), 0 0 3px rgba(0,0,0,0.22)",
        backgroundColor: theme.palette.background.paper,
        marginLeft: "1rem",
        marginRight: "1rem"
    },
    formControl: {
        minWidth: '100%',
    },
    select: {
        '&:after': {
            borderColor: "#43a047",
        },
        paddingTop: '0.8rem'
    },
    botonModificarDatos: {
        backgroundColor: "#448aff",
        color: "#ffffff",
        fontFamily: "Roboto Condensed, sans-serif",
        textTransform: "uppercase",
        fontSize: 15,
        marginTop: "1rem",
        [theme.breakpoints.down('xs')]:{
            width: "100%"
        },
        "&:hover":{
            backgroundColor: "#448aff",
        }
    },
    botonDarDeBaja: {
        backgroundColor: "#ef5350",
        color: "#FFFFFF",
        fontFamily: "Roboto Condensed, sans-serif",
        textTransform: "uppercase",
        fontSize: 15,
        marginTop: "1rem",
        [theme.breakpoints.up('xs')]:{
            marginLeft: "1rem"
        },
        [theme.breakpoints.down('xs')]:{
            width: "100%",
            marginLeft: 0
        },
        "&:hover":{
            backgroundColor: "#ef5350",
        }
    },
    botonDarDeBajaModal: {
        backgroundColor: "#ef5350",
        color: "#FFFFFF",
        fontFamily: "Roboto Condensed, sans-serif",
        textTransform: "uppercase",
        fontSize: 15,
        marginTop: "1rem",
        "&:hover":{
            backgroundColor: "#ef5350",
        }
    },
    botonCerrarModal: {
        color: '#FFFFFF',
        cursor: 'pointer',
        float: "right",
        fontFamily: "Roboto Condensed, sans-serif",
        fontWeight: "bold",
        marginRight: '1rem'
    },
    tituloModal: {
        color: '#FFFFFF',
        fontFamily: "Roboto Condensed, sans-serif",
        fontSize: 20,
        marginTop: '1rem',
        marginBottom: '1rem',
        marginLeft: '1.5rem'
    },
    botonCancelar: {
        color: "#000000",
        fontFamily: "Roboto Condensed, sans-serif",
        textTransform: "uppercase",
        fontSize: 15,
        marginRight: '8rem',
        [theme.breakpoints.up('md')]:{
            marginTop: '-68px'
        },
        [theme.breakpoints.down('md')]:{
            marginTop: '-65px'
        },
        [theme.breakpoints.down('xs')]:{
            display: 'none'
        },
    },
    nombreCompleto: {
        fontFamily: "Roboto Condensed, sans-serif",
        color: "#448aff",
        fontSize: 18,
        textTransform: "uppercase",
        fontWeight: "bold",
        marginLeft: "1rem"
    },
    camposTitulos: {
        fontFamily: "Roboto Condensed, sans-serif",
        color: "#9e9e9e",
        [theme.breakpoints.up('md')]:{
            marginLeft: "5rem"
        },
        fontWeight: "bold",
        padding: "0.1rem",
        fontSize: 16,
    },
    campos: {
        fontFamily: "Roboto Condensed, sans-serif",
        color: "#9e9e9e",
        [theme.breakpoints.up('md')]:{
            marginLeft: "0.5rem",
        },
        fontSize: 15,
        display: "flex",
        flexWrap: "wrap"
    },
    input: {
        "& .MuiFormLabel-root.Mui-focused": {
            color: "#43a047"
        },
        "& .MuiInput-underline:after": {
            borderBottomColor: "#43a047"
        },
    },
    inputDarDeBaja: {
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ef5350;"
        },
        "& .MuiFormLabel-root.Mui-focused": {
            color: "#ef5350"
        }
    },
    avatar: {
        width: "4rem",
        height: "4rem"
    },
    botonAgregar: {
        backgroundColor: "#43a047",
        fontFamily: "Roboto Condensed, sans-serif",
        float:"right",
        color: "#FFFFFF",
        "&:hover": {
            backgroundColor: "#43a047"
        }
    },
    cantidad: {
        fontFamily: "Roboto Condensed, sans-serif",
        color: "#448aff",
        fontSize: 18,
        textTransform: "uppercase",
        marginLeft: "1rem",
        fontWeight: "bold",
        marginBottom: "2rem"
    },
    cartaNuevoUsuario: {
        [theme.breakpoints.up('lg')]:{
            margin:"auto",
            height: 750,
            width: 600,
            marginTop: "2rem",
        },
        [theme.breakpoints.down('md')]:{
            margin: "auto",
            height: 750,
            width: 450,
            marginTop: "3rem",
        },
        boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
    },
    cartaEncabezado: {
        backgroundColor: "#4db6ac",
    },
    icono: {
        color: "#ffffff",
        float:"right",
    },
    tituloCarta:{
        fontFamily: "Roboto Condensed, sans-serif",
        textTransform: "uppercase",
        color: "#ffffff",
        fontSize: 30
    },
    subtituloCarta:{
        fontFamily: "Roboto Condensed, sans-serif",
        color: "#ffffff",
        fontSize: 15
    },
    botonVolver: {
        fontFamily: "Roboto Condensed, sans-serif",
        fontSize: 15,
        marginLeft: 20,
        width: "90%",
        "&:hover":{
            backgroundColor: "#f5f5f5"
        }
    },
    inputNuevoEstacionamiento: {
        fontFamily: "Roboto Condensed, sans-serif",
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "#rgba(0, 0, 0, 0.23);"
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#43a047;"
        },
        "& .MuiFormLabel-root.Mui-focused": {
            color: "#43a047"
        }
    },
    logo: {
        marginTop: "1rem",
        marginLeft: "auto",
        marginRight: "auto",
        display: "block",
        [theme.breakpoints.down('lg')]:{
            width: 200,
        },
        [theme.breakpoints.up('lg')]:{
            width: 250,
        },
    }
}));