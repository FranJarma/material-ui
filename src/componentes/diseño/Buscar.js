import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';

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
  //state para la búsqueda
  const [busqueda, guardarBusqueda] = useState('');
  const buscarReservas = e => {
      e.preventDefault();
      if(busqueda.trim() === '')  return ;
      history.push({
          pathname: "/buscar",
          search: `?q=${busqueda}`
      });
  }
    return (
      <>
        <Paper component="form" onSubmit={buscarReservas} className={classes.root}>
        <InputBase
          autoFocus
          className={classes.input}
          placeholder="Buscar reservas..."
          onChange={e => guardarBusqueda(e.target.value)}
        />
        <IconButton type="submit" className={classes.iconButton} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      </>
    )
}
 
export default Buscar;