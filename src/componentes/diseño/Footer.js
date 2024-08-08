import { Container, Typography, makeStyles, CssBaseline } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(theme => ({
    copyright: {
        fontFamily: "Roboto Condensed, sans-serif",
        fontSize: 18,
        textAlign: "center",
    },
    creadoPor: {
        fontFamily: "Roboto Condensed, sans-serif",
        fontSize: 15,
        textAlign: "center",
        color: theme.palette.grey[500]
    },
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    footer: {
        padding: theme.spacing(6, 2),
        marginTop: 'auto',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
    },
    }));

const Footer = () => {
    const classes = useStyles();
    return(
        <div className={classes.root}>
        <CssBaseline />
        <footer className={classes.footer}>
          <Container maxWidth="sm">
            <Typography className={classes.copyright} color="inherit">
                &copy; Copyright {(new Date().getFullYear())}
            </Typography>
            <Typography className={classes.creadoPor} color="inherit">
                Creado por: Francisco Alfredo Jarma
            </Typography>
          </Container>
        </footer>
      </div>
    );
}
 
export default Footer;