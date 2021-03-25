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
        [theme.breakpoints.up('sm')]: {
        display: 'none',
        },
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
        [theme.breakpoints.up('xs')]:{
            width: 150,
            paddingRight: "1rem"

        },
        [theme.breakpoints.up('sm')]:{
            width: 180,
        },
        [theme.breakpoints.up('lg')]:{
            width: 200,
            marginLeft: "2.5rem"
        },
    },
    cerrarMenuBoton: {
        marginRight: 'auto',
        color: "#000000"
    },
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