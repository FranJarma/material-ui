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
import { Link } from 'react-router-dom';
import Buscar from './Buscar';
import MenuUsuario from './MenuUsuario';

const anchoNavbarPx = 300;

const useStyles = makeStyles(theme => ({
    appBar: {
        zIndex: 1,
        backgroundColor: "#4db6ac"
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
        color: "#ffffff"
    },
    contenidoMenu: {
        width: anchoNavbarPx,
    },
    contenido: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    logo: {
        [theme.breakpoints.down('xs')]:{
            display: "none"
        },
        [theme.breakpoints.up('sm')]:{
            width: 180,
            marginTop:"0.5rem",
            paddingRight: "1.5rem",
        },
        [theme.breakpoints.up('lg')]:{
            width: 200,
            marginTop:"0.5rem"
        },
    },
    cerrarMenuBoton: {
        marginRight: 'auto',
        color: "#000000"
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
                <Link to="/home">
                    <img src={logo} alt="" className={classes.logo} />
                </Link>
                {localStorage.getItem('esEncargado') === 'true' ? <Buscar/> : "" }
                <MenuUsuario/>
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
                    <Button onClick={handleAbrirNavbar} className={classes.cerrarMenuBoton}>
                    <CloseIcon />
                    </Button>
                    <Aside/>
                </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                <Drawer
                    className={classes.menu}
                    variant="temporary"
                    classes={{
                    paper: classes.contenidoMenu,
                    }}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
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