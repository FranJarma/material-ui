import React from 'react';
import TablePagination from '@material-ui/core/TablePagination';

const Paginacion = () => {
    const [page, setPage] = React.useState(2);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    return ( 
        <TablePagination
        component="div"
        count={100}
        page={page}
        labelRowsPerPage="Reservas por página"
        onChangePage={handleChangePage}
        rowsPerPage={rowsPerPage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
     );
}
 
export default Paginacion;