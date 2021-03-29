import { AppBar, Container, Toolbar, Typography, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(theme => ({
    copyright: {
        fontFamily: "Roboto Condensed, sans-serif",
        fontSize: 15,
        margin: "auto"
    },
    footer: {
        [theme.breakpoints.up('lg')]: {
            marginTop: "14rem"
        },
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