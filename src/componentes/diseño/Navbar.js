import React, {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import logo from "./../../imagenes/logo.png";
import Aside from "./Aside.js";

const anchoNavbarPx = 300;

const useStyles = makeStyles(theme => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: "#14a37f"
        },
    toolbar: theme.mixins.toolbar,
    root: {
        display: 'flex',
    },
    menu: {
        [theme.breakpoints.up('sm')]: {
        width: anchoNavbarPx,
        flexShrink: 0,
    },
    },
    menuBoton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
        display: 'none',
        },
    },
    contenidoMenu: {
        width: anchoNavbarPx
    },
    contenido: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    logo: {
        marginTop: "auto",
        marginLeft: "auto",
        [theme.breakpoints.up('xs')]:{
            width: 250,

        },
        [theme.breakpoints.up('sm')]:{
            width: 250,
        },
        [theme.breakpoints.up('lg')]:{
            width: 280,
        },
    },
    cerrarMenuBoton: {
        marginRight: 'auto',
        marginLeft: 0,
    },
    botonCerrarSesionNavbar: {
        backgroundColor: "#FFFFFF",
        color: "#14a37f",
        marginLeft:'auto',
        fontFamily: "Roboto Condensed, sans-serif",
        textTransform: "uppercase",
        fontSize: 15,
        borderRadius: "1rem",
        "&:hover":{
            backgroundColor: "#FFFFFF",
        }
    }
}));

    const Navbar = () => {
        const classes = useStyles();
        const theme = useTheme();

        //state para controlar cuando se abre y cierra el navbar
        const [abierto, guardarAbierto] = useState(false);

        //para que la pantalla sea responsiva
        const handleAbrirNavbar = () => {
            guardarAbierto(!abierto)
        }

        return (
            <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="Open drawer"
                    edge="start"
                    onClick={handleAbrirNavbar}
                    className={classes.menuBoton}
                >
                    <MenuIcon />
                </IconButton>
                <img src={logo} alt="" className={classes.logo} />
                <Button className={classes.botonCerrarSesionNavbar}>Cerrar Sesión</Button>
                </Toolbar>
            </AppBar>
            
            <nav className={classes.drawer}>
                <Hidden smUp implementation="css">
                <Drawer
                    variant="temporary"
                    anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                    open={abierto}
                    onClose={handleAbrirNavbar}
                    classes={{
                    paper: classes.contenidoMenu,
                    }}
                    ModalProps={{
                    keepMounted: true,
                    }}
                >
                    <IconButton onClick={handleAbrirNavbar} className={classes.cerrarMenuBoton}>
                    <CloseIcon/>
                    </IconButton>
                    <Aside/>
                </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                <Drawer
                    className={classes.menu}
                    variant="permanent"
                    classes={{
                    paper: classes.contenidoMenu,
                    }}
                >
                    <div className={classes.toolbar} />
                    <Aside/>
                </Drawer>  
                </Hidden>
            </nav>
            <div className={classes.contenido}>
                <div className={classes.toolbar} />
            </div>
            </div>
        );
        }
     
    export default Navbar;