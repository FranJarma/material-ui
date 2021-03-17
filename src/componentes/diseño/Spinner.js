import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Typography } from '@material-ui/core';
import logo from './../../imagenes/logo.png';

const useStyles = makeStyles( theme => ({
    root: {
      width: '50%',
      marginTop: '15rem',
      marginLeft: 'auto',
      marginRight: 'auto',
      color: '#14a37f'
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

    const [ progreso, setearProgreso ] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setearProgreso((oldProgress) => {
                if (oldProgress === 100) {
                  return 0;
                }
                const diff = Math.random() * 10;
                return Math.min(oldProgress + diff, 100);
              });
            }, 500);
    return () => {
        clearInterval(timer);
        };
    }, []);
          
    return ( 
        <div className={classes.root}>
            <img src={logo} alt="" className={classes.logo}></img>
            &nbsp;
            <Typography className={classes.subtituloCarta}>Cargando... Espere por favor</Typography>
            <LinearProgress variant="determinate" value={progreso} />
        </div>
     );
}
 
export default Spinner;