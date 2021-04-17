import React, { useState, useEffect } from 'react';
import { InputBase } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme)=>({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        flexGrow: 1,
        paddingLeft: 20,
        [theme.breakpoints.up('lg')]: {
            marginLeft: "auto",
            maxWidth: "35%"
        },
      },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        fontSize: 20,
        fontFamily: "Roboto Condensed, sans-serif",
      },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('xs')]: {
            width: '20ch',
        },
    },
}));

const Buscar = (lista) => {
    //state para guardar la búsqueda
    const [busqueda, guardarBusqueda] = useState('');
    const buscarItem = (e) => {
      e.preventDefault();
      if(busqueda.trim() === '') return;
    };
    useEffect(() => {
      const parametroBusqueda = busqueda.toLowerCase();
      const filtro = lista.lista.filter(item => {
        return (
          item.nombreCompleto.toLowerCase().includes(parametroBusqueda)
        )
      })
      console.log(filtro);
    },[busqueda])
    const classes = useStyles();
    return (
        <div className={classes.search}>
            <div className={classes.searchIcon}>
                <SearchIcon />
            </div>
        <InputBase
          autoFocus
          placeholder="Buscar..."
          value={busqueda}
          onChange={e => guardarBusqueda(e.target.value)}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
        />
      </div>
    )
}
 
export default Buscar;