import React, { useState, useRef} from 'react';
import { Typography, Button, Card, CardContent, Grid, Dialog, DialogTitle, DialogContent, FormHelperText } from '@material-ui/core';
import {useStyles} from './Styles';
import { useReactToPrint } from 'react-to-print';
import PrintIcon from '@material-ui/icons/Print';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import { usePDF, Document, Page, Text } from '@react-pdf/renderer';

var QRCode = require('qrcode.react');

const Reserva = ({reserva}) => {
    const Documento = (
        <Document title="Ticket de reserva">
          <Page orientation="landscape">
              <Text>AA</Text>
          </Page>
        </Document>
      );
    //aclaración, a las reservas concluidas NO se le puede generar un ticket
    const classes = useStyles();
    const imprimirRef = useRef();

    const handleImprimir = useReactToPrint({
        content: () => imprimirRef.current,
    });
    const [modalTicket, abrirModalTicket] = useState(false);
    const [linkPDF, actualizarLinkPDF] = usePDF({document: Documento})
    const handleClickAbrirModalTicket = () => {
        abrirModalTicket(true);
    }
    const handleClickCerrarModalTicket = () => {
        abrirModalTicket(false);
    }

    return ( 
        <Grid item xs={12} lg={4}>
            <Card style={{borderRadius: 0}} id="lista" className = {classes.cartaReservas}>
                <CardContent key={reserva.id}>
                    <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                        <Typography className={classes.camposTitulos}>Playa de estacionamiento: </Typography>
                        <Typography className={classes.campos}>{reserva.estacionamiento.nombre}</Typography>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                        <Typography className={classes.camposTitulos}>Precio: </Typography>
                        <Typography className={classes.campos}>${reserva.pago[0].valor}</Typography>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                        <Typography className={classes.camposTitulos}>Día: </Typography>
                        <Typography className={classes.campos}>{reserva.fechaReserva}</Typography>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                        <Typography className={classes.camposTitulos}>Hora: </Typography>
                        <Typography className={classes.campos}>{reserva.horaReserva}</Typography>
                    </div>
                    {reserva.estado !== 'concluida' ? <><Button className={classes.botonGenerarTicket} onClick={handleClickAbrirModalTicket}>Ver Ticket</Button> <FormHelperText>El encargado del la playa de estacionamiento le pedirá esta información</FormHelperText></> : ""}
                </CardContent>
            </Card>
        <Dialog maxWidth={'md'} open={modalTicket}onClose={handleClickCerrarModalTicket}>
            <div ref={imprimirRef} >
            <DialogTitle style={{border: '1px solid #000000', textAlign: 'center'}}><Typography className={classes.titulo}>Ticket de reserva</Typography></DialogTitle>
            <DialogContent style={{border: '1px solid #000000'}}>
                    <Typography style={{textAlign: 'center'}} className={classes.camposTitulos}>{reserva.estacionamiento.nombre}</Typography>
                    <Typography style={{textAlign: 'center', fontWeight: 'normal'}} className={classes.camposTitulos}>{reserva.estacionamiento.direccion} - {reserva.estacionamiento.provincia}, {reserva.estacionamiento.ciudad}</Typography>
                    <Typography style={{textAlign: 'center'}} className={classes.camposTitulos}>CUIT: </Typography>
                    <Typography style={{textAlign: 'center', fontWeight: 'normal'}} className={classes.camposTitulos}>{reserva.estacionamiento.cuit}</Typography>
                    <Typography style={{textAlign: 'center'}} className={classes.camposTitulos}>Código de reserva: </Typography>
                    <Typography style={{textAlign: 'center', fontWeight: 'normal'}} className={classes.camposTitulos}>{reserva.id}</Typography>
                    <Typography style={{textAlign: 'center'}} className={classes.camposTitulos}>Total: </Typography>
                    <Typography style={{textAlign: 'center', fontWeight: 'normal'}} className={classes.camposTitulos}>${reserva.pago[0].valor}</Typography>
                <div style={{textAlign: 'center'}}>
                    <QRCode value={reserva.id}/>
                </div>
            </DialogContent>
            <Typography style={{fontSize: 8, textAlign: 'center', color: "#000000"}}>Comprobante generado el día: {new Date().toLocaleDateString()} a las: {new Date().toLocaleTimeString()} por: {localStorage.getItem('nombreUsuario')}</Typography>
            <Typography style={{fontSize: 8, textAlign: 'center', color: "#000000"}}>No válido como factura</Typography>
            </div>
            <div style={{textAlign: 'center'}}>
                <Button startIcon={<PrintIcon/>} className={classes.botonImprimir} onClick={handleImprimir}>Imprimir</Button>
                <div><PictureAsPdfIcon style={{color: "#ff0000"}}/><a style={{textDecoration: 'none', marginBottom: '2rem'}} className={classes.botonGenerarPdf}href={linkPDF.url} download = "ticket.pdf">Descargar PDF</a></div>
            </div>
        </Dialog>
        </Grid>
    );
}
 
export default Reserva;