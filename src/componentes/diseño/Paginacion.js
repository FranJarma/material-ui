import React, {useState} from 'react';
import TablePagination from '@material-ui/core/TablePagination';

const Paginacion = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
  
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
        labelRowsPerPage="Registros por página"
        labelDisplayedRows={
          ({ from, to, count }) => {
            return from + '-' + to + ' de ' + count + ' registros'
          }
        }
        onChangePage={handleChangePage}
        rowsPerPage={rowsPerPage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
     );
}
 
export default Paginacion;