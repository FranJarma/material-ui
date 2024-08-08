import swal from 'sweetalert2';

const Toast = (mensaje) => {
  return(
      swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        icon: 'warning',
        title: `<a style="font-family: Roboto Condensed">${mensaje}</a>` 
      })
  )
}
export default Toast;