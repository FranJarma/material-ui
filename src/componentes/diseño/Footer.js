import { Container, Typography, makeStyles, CssBaseline } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(theme => ({
    copyright: {
        fontFamily: "Roboto Condensed, sans-serif",
        fontSize: 15,
        textAlign: "center"
    },
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    main: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(2),
    },
    footer: {
        padding: theme.spacing(3, 2),
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
          </Container>
        </footer>
      </div>
    );
}
 
export default Footer;