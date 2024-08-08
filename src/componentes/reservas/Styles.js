import {makeStyles} from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
    titulo: {
        fontFamily: "Roboto Condensed, sans-serif",
        textTransform: "uppercase",
        fontSize: 25,
        textAlign: "center"
    },
    alerta:{
        position: "relative",
        marginLeft: "1rem",
        marginRight: "1rem",
        borderRadius: 0
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
    container: {
        marginLeft: "1rem",
        display: 'flex',
    },
    inputFecha: {
        width: "20rem",
        fontFamily: "Roboto Condensed, sans-serif",
        height:"3rem",
        "& .MuiFormLabel-root.Mui-focused": {
            color: "#4db6ac"
        },
        "& .MuiInput-underline:after": {
            borderBottomColor: "#4db6ac"
        },
    },
    botonConsultar: {
        backgroundColor: "#4db6ac",
        color: "#ffffff",
        height: 'auto',
        fontFamily: "Roboto Condensed, sans-serif",
        textTransform: "uppercase",
        fontSize: 15,
        "&:hover":{
            backgroundColor: "#4db6ac",
        }
    },
    subtitulos: {
        fontFamily: "Roboto Condensed, sans-serif",
        fontSize: 16,
        color:"#424242",
    },
    inputCodigo: {
        width: "20rem",
        fontFamily: "Roboto Condensed, sans-serif",
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "#rgba(0, 0, 0, 0.23)",
        },
        "& .MuiFormLabel-root.Mui-focused": {
            color: "#4db6ac"
        },
        "& .MuiInput-underline:after": {
            borderBottomColor: "#4db6ac"
        },
    },
    cartaReservas: {
        flexGrow: 1,
        paddingLeft: 20,
        backgroundColor: "#FFFFFF",
        boxShadow: "0 2px 3px rgba(0,0,0,0.25), 0 0 3px rgba(0,0,0,0.22)",
        marginLeft: "1rem",
        marginRight: "1rem"
    },
    botonCambiarReserva: {
        backgroundColor: "#448aff",
        color: "#ffffff",
        fontFamily: "Roboto Condensed, sans-serif",
        textTransform: "uppercase",
        marginTop: "2rem",
        marginBottom: "2rem",
        fontSize: 15,
        "&:hover":{
            backgroundColor: "#448aff",
        }
    },
    botonGenerarTicket: {
        backgroundColor: "#448aff",
        color: "#ffffff",
        fontFamily: "Roboto Condensed, sans-serif",
        textTransform: "uppercase",
        marginTop: '1rem',
        fontSize: 15,
        "&:hover":{
            backgroundColor: "#448aff",
        }
    },
    botonImprimir: {
        backgroundColor: "#ffffff",
        color: "#448aff",
        fontFamily: "Roboto Condensed, sans-serif",
        textTransform: "uppercase",
        marginTop: '1rem',
        fontSize: 15,
        "&:hover":{
            backgroundColor: "#FFFFFF",
            color: "#448aff",
        }
    },
    botonGenerarPdf: {
        backgroundColor: "#FFFFFF",
        color: "#ff0000",
        fontFamily: "Roboto Condensed, sans-serif",
        textTransform: "uppercase",
        marginTop: '1rem',
        fontSize: 15,
        "&:hover":{
            backgroundColor: "#FFFFFF",
            color: "#ff0000"
        }
    },
    botonSiguiente: {
        backgroundColor: "#4db6ac",
        color: "#ffffff",
        fontFamily: "Roboto Condensed, sans-serif",
        textTransform: "uppercase",
        marginTop: "2rem",
        marginBottom: "2rem",
        fontSize: 15,
        "&:hover":{
            backgroundColor: "#4db6ac",
        }
    },
    botonPagar: {
        border: 0,
        borderRadius: 5,
        height: '5vh',
        width: "25%",
        backgroundColor: "#4db6ac",
        color: "#ffffff",
        [theme.breakpoints.down('md')]: {
            width: "100%",
            height: '10vh',
        },
        fontFamily: "Roboto Condensed, sans-serif",
        textTransform: "uppercase",
        fontSize: 15,
        "&:hover":{
            backgroundColor: "#4db6ac",
        }
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
    camposTitulos: {
        fontFamily: "Roboto Condensed, sans-serif",
        color: "#9e9e9e",
        fontWeight: "bold",
        padding: "0.1rem",
        fontSize: 16,
    },
    label: {
        fontSize: "0.8rem",
        paddingBottom: "0.25rem"
    },
    select: {
        fontFamily: "Roboto Condensed, sans-serif",
        paddingRight: "1rem",
        '&:after': {
            borderColor: "#4db6ac",
        }
    },
    selectValidarReserva: {
        fontFamily: "Roboto Condensed, sans-serif",
        marginLeft: '1.5rem',
        marginRight: '1.5rem',
        '&:after': {
            borderColor: "#448aff",
        }
    },
    input: {
        textTransform: 'capitalize',
        fontFamily: "Roboto Condensed, sans-serif",
        paddingRight: "1rem",
        "& .MuiFormLabel-root.Mui-focused": {
            color: "#4db6ac"
        },
        "& .MuiInput-underline:after": {
            borderBottomColor: "#4db6ac"
        },
    },
    inputReserva: {
        zIndex: 0,
        fontFamily: "Roboto Condensed, sans-serif",
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "#rgba(0, 0, 0, 0.23);"
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#4db6ac;"
        },
        "& .MuiFormLabel-root.Mui-focused": {
            color: "#4db6ac"
        }
    },
    tituloModal: {
        color: '#FFFFFF',
        fontFamily: "Roboto Condensed, sans-serif",
        fontSize: 20,
        marginTop: '1rem',
        marginBottom: '1rem',
        marginLeft: '1.5rem'
    },
    tabs: {
        backgroundColor: "#FFFFFF",
        color:"#4db6ac",
        width: "100%"
    },
    tab: {
        fontFamily: 'Roboto Condensed',
        fontHeight: 'bold',
        fontSize: 14,
        [theme.breakpoints.only('xs')]: {
            fontSize: 10
        },
    },
    inputHoraIngreso: {
        fontFamily: "Roboto Condensed, sans-serif",
        "& .MuiFormLabel-root.Mui-focused": {
            color: "#448aff"
        },
        "& .MuiInput-underline:after": {
            borderBottomColor: "#448aff"
        },
    },
    inputLugar: {
        marginLeft: '1.5rem',
        paddingRight: '3rem',
        fontFamily: "Roboto Condensed, sans-serif",
        "& .MuiFormLabel-root.Mui-focused": {
            color: "#448aff"
        },
        "& .MuiInput-underline:after": {
            borderBottomColor: "#448aff"
        },
    },
    selectPlaya: {
        marginLeft: '1.5rem',
        paddingRight: '2rem',
        fontFamily: "Roboto Condensed, sans-serif",
        "& .MuiFormLabel-root.Mui-focused": {
            color: "#448aff"
        },
        "& .MuiInput-underline:after": {
            borderBottomColor: "#448aff"
        },
    },
    inputHoraSalida: {
        fontFamily: "Roboto Condensed, sans-serif",
        "& .MuiFormLabel-root.Mui-focused": {
            color: "#43a047"
        },
        "& .MuiInput-underline:after": {
            borderBottomColor: "#43a047"
        },
    },
    botonValidarReserva: {
        backgroundColor: "#448aff",
        color: "#ffffff",
        marginTop: "1rem",
        textAlign: "center",
        fontFamily: "Roboto Condensed, sans-serif",
        textTransform: "uppercase",
        fontSize: 15,
        "&:hover":{
            backgroundColor: "#448aff",
        }
    },
    botonCancelar: {
        color: "#000000",
        fontFamily: "Roboto Condensed, sans-serif",
        textTransform: "uppercase",
        marginTop: "1rem",
        marginLeft: "auto",
        alignContent: "auto"
    },
    botonConcluirReserva: {
        backgroundColor: "#43a047",
        color: "#ffffff",
        fontFamily: "Roboto Condensed, sans-serif",
        textTransform: "uppercase",
        marginLeft: "5rem",
        marginTop: "1rem",
        fontSize: 15,
        "&:hover":{
            backgroundColor: "#43a047",
        }
    },
    nombreCompleto: {
        fontFamily: "Roboto Condensed, sans-serif",
        color: "#448aff",
        fontSize: 18,
        textTransform: "uppercase",
        fontWeight: "bold",
        marginLeft: "1rem"
    },
    avatar: {
        width: "4rem",
        height: "4rem"
    },
    icono: {
        color: "#9e9e9e",
        marginLeft: "5rem",
        width: "1rem",
        height: "1rem"
    }
}));
