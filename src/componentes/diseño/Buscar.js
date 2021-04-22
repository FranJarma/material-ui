import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import SpinnerContext from './../../context/spinner/spinnerContext';
import Spinner from './Spinner';

const useStyles = makeStyles(theme => ({
  root: {
    marginLeft: "auto",
    display: 'block',
    alignItems: 'center',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    fontFamily: "Roboto Condensed, sans-serif",
    fontSize: 18
  },
  iconButton: {
    padding: 10,
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
      mostrarSpinner();
      e.preventDefault();
      if(busqueda.trim() === '')  return ;
      history.push({
          pathname: "/buscar",
          search: `?q=${busqueda}`
      });
  }
    return (
      (!cargando ? 
      <>
        <Paper component="form" onSubmit={buscarReservas} className={classes.root}>
        <InputBase
          autoFocus
          className={classes.input}
          placeholder="Buscar reservas..."
          inputProps={{style: {textTransform: 'lowercase'}}}
          onChange={e => guardarBusqueda(e.target.value.toLowerCase())}
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