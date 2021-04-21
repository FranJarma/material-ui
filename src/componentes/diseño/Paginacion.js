import { Divider, Box, makeStyles } from '@material-ui/core';
import Pagination from "@material-ui/lab/Pagination";
import React, {useState, useContext} from 'react';
import PaginacionContext from '../../context/paginacion/paginacionContext';
import SpinnerContext from '../../context/spinner/spinnerContext';

const useStyles = makeStyles(theme=>({
  paginacion: {
    marginTop: "1rem",
    marginBottom: "1rem",
    "& .MuiPaginationItem-root": {
      fontFamily: "Roboto Condensed, sans-serif"
    },
    "& .MuiPaginationItem-page.Mui-selected": {
      backgroundColor:"#4db6ac",
      color:"#FFFFFF",
      fontFamily: "Roboto Condensed, sans-serif"
    }
  }
}));
const Paginacion = (lista) => {
  const classes = useStyles();
  const paginacionContext = useContext(PaginacionContext);
  const { pagina, itemsPorPagina, setearPagina } = paginacionContext;
  const spinnerContext = useContext(SpinnerContext);
  const { mostrarSpinner } = spinnerContext;
  const [numeroDePaginas] = useState(Math.ceil(lista.lista.length / itemsPorPagina));

  const handleChange = (event, value) => {
      mostrarSpinner();
      setearPagina(value);
  }
  return (
      <>
      <Divider/>
      <Box display="flex" justifyContent="center">
          <Pagination
            className={classes.paginacion}
            onChange={handleChange}
            count={numeroDePaginas}
            page={pagina}
            defaultPage={1}
            size="medium"
            showFirstButton
            showLastButton/>
      </Box>
      </>
  );
}
export default Paginacion;