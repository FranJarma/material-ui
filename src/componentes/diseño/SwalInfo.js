import swal from 'sweetalert2';
const SwalInfo = (titulo, mensaje) => {
    return ( 
        swal.fire({
            title: `<a style="font-family: Roboto Condensed">${titulo}</a>`,
            icon: 'info',
            html: `<p style="font-family: Roboto Condensed">${mensaje}</p>`
        })
     );
}
export default SwalInfo;