import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import SpinnerContext from './../../context/spinner/spinnerContext';
import Spinner from './Spinner';

import * as CGeneral from './../../constantes/general/CGeneral';

const useStyles = makeStyles(theme => ({
  root: {
    color: '#FFFFFF',
    [theme.breakpoints.only('lg')]: {
      width: '30%',
      marginLeft: '2rem'
    },
    [theme.breakpoints.only('sm')]: {
      width: '50%',
      marginLeft: '1rem'
    },
    [theme.breakpoints.down('xs')]: {
      marginLeft: 0,
      width: "100%"
    },
    display: 'block',
    alignItems: 'center',
  },
  input: {
    marginLeft: theme.spacing(1),
    paddingTop: 5,
    flex: 1,
    fontFamily: "Roboto Condensed, sans-serif",
    fontSize: 18
  },
  iconButton: {
    padding: 10,
    float:"right"
  },
}));

const Buscar = () => {
  const classes = useStyles();
  const history = useHistory();
  const spinnerContext = useContext(SpinnerContext);
  const { cargando, mostrarSpinner } = spinnerContext;
  //state para la búsqueda
  const [busqueda, guardarBusqueda] = useState('');
  const buscarReservas = e => {
      mostrarSpinner(CGeneral.BUSCANDO);
      e.preventDefault();
      if(busqueda.trim() === '')  return ;
      history.push({
          pathname: "/buscar",
          search: `?q=${busqueda.toLowerCase()}`
      });
  }
    return (
      (!cargando ? 
      <>
        <Paper component="form" onSubmit={buscarReservas} className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder="Buscar reservas"
          onChange={e => guardarBusqueda(e.target.value)}
        />
        <IconButton type="submit" className={classes.iconButton} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      </>
      : <Spinner></Spinner>)
    )
}
 
export default Buscar;