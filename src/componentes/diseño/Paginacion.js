import { Divider, Box, makeStyles } from '@material-ui/core';
import Pagination from "@material-ui/lab/Pagination";
import React, {useState, useContext} from 'react';
import PaginacionContext from '../../context/paginacion/paginacionContext';

const useStyles = makeStyles((theme)=>({
  paginacion: {
    [theme.breakpoints.up('md')]:{
      marginLeft: "30rem",
      marginTop: "2rem"
    },
    [theme.breakpoints.down('md')]:{
      marginLeft: "6rem",
      marginTop: "2rem",
      marginBottom: "2rem"
    }
  }
}));

const Paginacion = (lista) => {
  const classes = useStyles();
  const paginacionContext = useContext(PaginacionContext);
  const { pagina, itemsPorPagina, setearPagina } = paginacionContext;
  const [numeroDePaginas] = useState(Math.ceil(lista.lista.length / itemsPorPagina));
  const handleChange = (event, value) => {
    setearPagina(value);
  }
  return (
    <>
    <Divider/>
    <Box>
      <div style={{justifyContent:"center"}}>
        <Pagination
          className={classes.paginacion}
          onChange={handleChange}
          count={numeroDePaginas}
          page={pagina}
          defaultPage={1}
          size="large"
          color="primary"
          showFirstButton
          showLastButton/>
      </div>
    </Box>
    </>
  );
}
export default Paginacion;