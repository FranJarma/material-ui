import swal from 'sweetalert2';
const Swal = (titulo, mensaje) => {
    return ( 
        swal.fire({
            title: `<a style="font-family: Roboto Condensed">${titulo}</a>`,
            icon: 'success',
            html: `<p style="font-family: Roboto Condensed">${mensaje}</p>`
        })
     );
}
export default Swal;