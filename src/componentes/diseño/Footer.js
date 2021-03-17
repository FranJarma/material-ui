import { AppBar, Container, Toolbar, Typography, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(theme => ({
    copyright: {
        fontFamily: "Roboto Condensed, sans-serif",
        textTransform: "uppercase",
        fontSize: 22,
        margin: "auto"
    },
    footer: {
        position: "relative",
        bottom: 0,
        width: "100%"
    }
}));

const Footer = () => {
    const classes = useStyles();
    return(
        <AppBar className={classes.footer} position="static" color="inherit">
            <Container maxWidth="md">
            <Toolbar>
                <Typography className={classes.copyright} color="inherit">
                © Copyright {(new Date().getFullYear())}
                </Typography>
            </Toolbar>
            </Container>
        </AppBar>
    );
}
 
export default Footer;