import React, { useContext } from 'react';
import Navbar from './diseño/Navbar';
import Footer from './diseño/Footer';
import * as CGeneral from './../constantes/general/CGeneral';
import { Typography, makeStyles, Card, CardContent, Grid } from '@material-ui/core';
import Spinner from './diseño/Spinner';
import SpinnerContext from '../context/spinner/spinnerContext';
import { Link } from 'react-router-dom';
import CommuteIcon from '@material-ui/icons/Commute';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import StarIcon from '@material-ui/icons/Star';
import CommentIcon from '@material-ui/icons/Comment';
import Comentarios from './estacionamientos/Comentarios';
import useInfoUsuario from '../hooks/useInfoUsuario';
import StoreMallDirectoryIcon from '@material-ui/icons/StoreMallDirectory';
import PersonIcon from '@material-ui/icons/Person';
const useStyles = makeStyles(theme => ({
    titulo: {
        fontFamily: "Roboto Condensed, sans-serif",
        textTransform: "uppercase",
        fontSize: 30,
        textAlign: 'center'
    },
    cartaHome: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        boxShadow: "0 2px 3px rgba(0,0,0,0.25), 0 0 3px rgba(0,0,0,0.22)",
        marginLeft: "1rem",
        marginRight: "1rem",
        marginTop: "2rem",
        cursor: "pointer",
        '&:hover': {
            boxShadow: "0 2px 10px rgba(0,0,0,0.25), 0 0 10px rgba(0,0,0,0.22)",
        }
    },
    titulosMenu: {
        fontFamily: "Roboto Condensed, sans-serif",
        fontSize: 18,
        textDecoration: "none",
        color: "#000000"
    },
    tituloCarta: {
        fontFamily: "Roboto Condensed, sans-serif",
        fontSize: 16,
        marginLeft: "1rem",
        marginTop: "2rem",
        textTransform: "uppercase",
        color: theme.palette.background.paper
    },
    subtituloCarta: {
        fontFamily: "Roboto Condensed, sans-serif",
        fontSize: 30,
        textTransform: "uppercase",
        fontWeight: "bold",
        textAlign: "center"
    },
    icono: {
        width: "3.5rem",
        height: "3.5rem",
        marginTop: "1rem",
        marginBottom: "1rem",
        marginLeft: "1rem",
        color: theme.palette.background.paper,
        borderRadius: 50
    }
}));

const Home = () => {
    const classes = useStyles();
    const spinnerContext = useContext(SpinnerContext);
    const { cargando } = spinnerContext;
    const usuario = useInfoUsuario();
    return (
    (!cargando ?
    <>
    <Navbar></Navbar>
        <Typography className={classes.titulo}>{CGeneral.BIENVENIDO}</Typography>
            { usuario.esEncargado ?
            <>
                <Grid container spacing={1}>
                    <Grid item lg={3} xs={12}>
                        <Link to="/reservas-del-dia" className={classes.titulosMenu}>
                            <Card className={classes.cartaHome}>
                                <div style={{display: 'flex', textAlign: 'center', backgroundColor: "#2196f3"}}>
                                <CommuteIcon className={classes.icono}/>
                                <Typography className={classes.tituloCarta}>Reservas del día</Typography>
                                </div>
                                <CardContent>
                                <Typography className={classes.subtituloCarta}>21</Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </Grid>
                    <Grid item lg={3} xs={12}>
                    <Link to="/reportes" className={classes.titulosMenu}>
                        <Card className={classes.cartaHome}>
                            <div style={{display: 'flex', textAlign: 'center', backgroundColor: "#43a047"}}>
                            <MonetizationOnIcon className={classes.icono}/>
                            <Typography className={classes.tituloCarta}>Ingresos mensuales</Typography>
                            </div>
                            <CardContent>
                            <Typography className={classes.subtituloCarta}>$1500</Typography>
                            </CardContent>
                        </Card>
                    </Link>
                    </Grid>
                    <Grid item lg={3} xs={12}>
                        <Card className={classes.cartaHome}>
                            <div style={{display: 'flex', textAlign: 'center', backgroundColor: "#ffd600"}}>
                            <StarIcon className={classes.icono}/>
                            <Typography className={classes.tituloCarta}>Valoración General</Typography>
                            </div>
                            <CardContent>
                            <Typography className={classes.subtituloCarta}>4.2</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item lg={3} xs={12}>
                        <Card className={classes.cartaHome}>
                            <div style={{display: 'flex', textAlign: 'center', backgroundColor: "#ff5722"}}>
                            <CommentIcon className={classes.icono}/>
                            <Typography className={classes.tituloCarta}>Comentarios</Typography>
                            </div>
                            <CardContent>
                            <Typography className={classes.subtituloCarta}>21</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                <Comentarios/>
            </>
            : 
            <Grid container spacing={1}>
            <Grid item lg={6} xs={12}>
                <Link to="/usuarios" className={classes.titulosMenu}>
                    <Card className={classes.cartaHome}>
                        <div style={{display: 'flex', textAlign: 'center', backgroundColor: "#2196f3"}}>
                        <PersonIcon className={classes.icono}/>
                        <Typography className={classes.tituloCarta}>Usuarios</Typography>
                        </div>
                        <CardContent>
                        <Typography className={classes.subtituloCarta}>52</Typography>
                        </CardContent>
                    </Card>
                </Link>
            </Grid>
            <Grid item lg={6} xs={12}>
            <Link to="/estacionamientos" className={classes.titulosMenu}>
                <Card className={classes.cartaHome}>
                    <div style={{display: 'flex', textAlign: 'center', backgroundColor: "#43a047"}}>
                    <StoreMallDirectoryIcon className={classes.icono}/>
                    <Typography className={classes.tituloCarta}>Playas de Estacionamiento</Typography>
                    </div>
                    <CardContent>
                    <Typography className={classes.subtituloCarta}>15</Typography>
                    </CardContent>
                </Card>
            </Link>
            </Grid>
        </Grid>
        }
    <Footer></Footer>
    </>
    : <Spinner></Spinner>
    ));
}
 
export default Home;