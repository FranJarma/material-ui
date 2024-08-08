import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Typography } from '@material-ui/core';
import logo from './../../imagenes/logo.png';
import SpinnerContext from '../../context/spinner/spinnerContext';

const useStyles = makeStyles( theme => ({
    root: {
      width: '50%',
      marginTop: '15rem',
      marginLeft: 'auto',
      marginRight: 'auto',
      color: '#4db6ac'
    },
    logo: {
        marginTop: "1rem",
        marginLeft: "auto",
        marginRight: "auto",
        display: "block",
        [theme.breakpoints.up('xs')]:{
            width: 200,

        },
        [theme.breakpoints.up('sm')]:{
            width: 200,
        },
        [theme.breakpoints.up('lg')]:{
            width: 250,
        },
    },
    subtituloCarta:{
        fontFamily: "Roboto Condensed, sans-serif",
        color: "#bdbdbd",
        fontSize: 15,
        textAlign: "center"
    },
  }));

const Spinner = () => {

    const classes = useStyles();
    const spinnerContext = useContext(SpinnerContext);
    const { mensaje } = spinnerContext;

    return ( 
        <div className={classes.root}>
            <img src={logo} alt="" className={classes.logo}></img>
            &nbsp;
            <Typography className={classes.subtituloCarta}>{mensaje}</Typography>
            <LinearProgress variant="indeterminate"/>
        </div>
     );
}
 
export default Spinner;