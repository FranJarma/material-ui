import React, { useState, useEffect } from 'react';
import NavbarCliente from '../diseño/NavbarCliente';
import { useStyles } from './Styles';
import { Button, Card, CardContent, Divider, Tab, Tabs, Typography,
    Grid, TextField, MenuItem, FormHelperText, TextareaAutosize } from '@material-ui/core';
import InputMask from 'react-input-mask';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import CheckIcon from '@material-ui/icons/Check';
import {useLocation} from 'react-router-dom';
import Toast from './../diseño/Toast';
import Footer from './../diseño/Footer.js';
import * as CGeneral from './../../constantes/general/CGeneral';
import Swal from '../diseño/Swal';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';
import "./styles.css";
import traducirError from '../../firebase/errores';
import useInfoUsuario from '../../hooks/useInfoUsuario';
const NuevaReserva = () => {
    const location = useLocation();
    const usuario = useInfoUsuario();
    console.log(usuario);
    const { estacionamiento } = location.state;
    const classes = useStyles();
    const [tab, setTab] = useState(0);
    const [infoReserva, setInfoReserva] = useState({
        tipoVehiculo: '',
        marcaVehiculo: '',
        patenteVehiculo: '',
        valor: '',
        hora: '',
        observaciones: ''
    });
    const { tipoVehiculo, marcaVehiculo, patenteVehiculo, valor, hora, observaciones } = infoReserva;
    const [fecha, setFecha] = useState(null);
    //evento onChange
    const onChange = (e) => {
        setInfoReserva({
            ...infoReserva,
            [e.target.name] : e.target.value
        });
    }
    const onChangeFecha = (fecha) => {
        setFecha(fecha);
    }
    const marcas = [
        {id: 0, marca: 'Audi'},
        {id: 1, marca: 'BMW'},
        {id: 2, marca: 'Chevrolet'},
        {id: 3, marca: 'Citroen'},
        {id: 4, marca: 'Fiat'},
        {id: 5, marca: 'Ford'},
        {id: 6, marca: 'Honda'},
        {id: 7, marca: 'Nissan'},
        {id: 8, marca: 'Peugeot'},
        {id: 9, marca: 'Renault'},
        {id: 10, marca: 'Toyota'},
        {id: 11, marca: 'Volkswagen'}
    ];
    const handleChange = (event, nuevoTab) => {
        setTab(nuevoTab);
    };   
    function filtrarHorariosVacios(array) {
        return array.filter(x => x.apertura !== "")
    };
    function filtrarDias(array) {
        return array.filter(x => x.apertura === "")
    };
    function armarHorarios(array){
        let arregloHorasApertura = [];
        let arregloHorasCierre = [];
        let horarioMinimo = '';
        let horarioMaximo = '';
        let arreglo = filtrarHorariosVacios(array);
        let horarios = [];
        arreglo.map((x)=>{
            arregloHorasApertura.push((x.apertura.substring(0,2)));
        });
        arreglo.map((y)=>{
            arregloHorasCierre.push((y.cierre.substring(0,2)));
        });
        horarioMinimo = arregloHorasApertura.sort()[0];
        horarioMaximo = arregloHorasCierre.sort().reverse()[0];
        for(let i=parseInt(horarioMinimo); i<=horarioMaximo; i++){
            if (i<12) {
            horarios.push({
                hora: i + ' AM'
            });
            }
            else {
                horarios.push({
                    hora: i + ' PM'
                });
            }
        }
        return horarios;
    };
    function armarDias() {
        const diasAFiltrar = filtrarDias(estacionamiento.horarios);
        let numeroDias = [];
        diasAFiltrar.map((dia)=>{
            if (dia.dia === 'Domingo') {
                numeroDias.push(0)
            }
            else if(dia.dia === 'Lunes') {
                numeroDias.push(1)
            }
            else if(dia.dia === 'Martes') {
                numeroDias.push(2)
            }
            else if(dia.dia === 'Miercoles') {
                numeroDias.push(3)
            }
            else if(dia.dia === 'Jueves') {
                numeroDias.push(4)
            }
            else if(dia.dia === 'Viernes') {
                numeroDias.push(5)
            }
            else if(dia.dia === 'Sabado') {
                numeroDias.push(6)
            }
        })
        return numeroDias;
    }
    const resultado = armarHorarios(estacionamiento.horarios);
    const diasDeshabilitados = (date) => {
        const day = date.getDay();
        const diasADeshabilitar = armarDias();
        return day !== diasADeshabilitar[0] && day !== diasADeshabilitar[1] &&
        day !== diasADeshabilitar[2] && day !== diasADeshabilitar[3] && day !== diasADeshabilitar[4]
        && day !== diasADeshabilitar[5] && day !== diasADeshabilitar[6];
      };

    async function confirmarReserva () {
        try {
            if (tipoVehiculo === "" || marcaVehiculo === "" || patenteVehiculo === "" || hora === "")
        {
            //setTab(tab+1);
            Toast(CGeneral.COMPLETE_TODOS_LOS_CAMPOS);
        }
        else if(patenteVehiculo.includes('_')){
            Toast(CGeneral.VALIDACION_PATENTE)
        }
        else {
            setTab(tab+1);
        }
        } catch (error) {
            Toast(traducirError(error.code))
        }
        
    } 
    return (
        <>
        <NavbarCliente/>
        {tab !== 1 ?
        <Typography style={{color: "#000000", fontHeight: 'bold'}} className={classes.tituloModal}>Nueva Reserva en: {estacionamiento.nombreCompleto}</Typography>
        :<Typography style={{color: "#000000", fontHeight: 'bold'}} className={classes.tituloModal}>Confirmar reserva en: {estacionamiento.nombreCompleto}</Typography>}
        <Card className={classes.cartaReservas}>
            <CardContent>
            <Tabs
            TabIndicatorProps={{style: {background:'#4db6ac'}}}
            className={classes.tabs}
            variant="fullWidth"
            value={tab}
            onChange={handleChange}
            >
            <Tab className={classes.tab} icon={<PersonPinIcon />} label="Datos de la reserva"></Tab>
            <Tab disabled className={classes.tab} icon={<CheckIcon/>} label="Confirmar y pagar"></Tab>
            </Tabs>
            <br/>
            {tab === 0 ?
            <>
            <Typography className={classes.subtitulos}>Datos de la persona</Typography>
            <br/>
                <Grid container spacing={3}>
                    <Grid item lg={4} md={4} xs={12}>
                        <TextField
                        disabled
                        variant="filled"
                        fullWidth
                        value={usuario.nombreCompleto}
                        label="Nombre completo"
                        className={classes.inputReserva}>
                        </TextField>
                    </Grid>
                    <Grid item lg={4} md={4} xs={12}>
                        <TextField
                        disabled
                        variant="filled"
                        fullWidth
                        type="text"
                        value={usuario.email}
                        label="Email"
                        className={classes.inputReserva}>
                        </TextField>
                    </Grid>
                    <Grid item lg={2} md={2} xs={6}>
                        <TextField
                            disabled
                            value={usuario.dni}
                            className = {classes.inputReserva}
                            type="text"
                            fullWidth
                            variant="filled"
                            label="DNI"
                        ></TextField>
                    </Grid>
                    <Grid item lg={2} md={2} xs={6}>
                        <TextField
                            disabled
                            value={usuario.telefono}
                            className = {classes.inputReserva}
                            type="text"
                            fullWidth
                            variant="filled"
                            label="N° de teléfono"
                        ></TextField>
                    </Grid>
                </Grid>
            <br/>
            <Typography className={classes.subtitulos}>Datos del vehículo</Typography>
            <br/>
                <Grid container spacing={3}>
                    <Grid item lg={4} md={4} xs={12}>
                        <TextField
                        variant="outlined"
                        fullWidth
                        name="tipoVehiculo"
                        label="Tipo de vehículo"
                        onChange={onChange}
                        value={tipoVehiculo}
                        className={classes.inputReserva}
                        select
                        >
                        {estacionamiento.tarifas.map((vehiculo) => (
                        <MenuItem
                        style={{textTransform: 'capitalize'}}
                        key={vehiculo.vehiculo}
                        name={vehiculo.vehiculo + '&' + vehiculo.valor}
                        value={vehiculo.vehiculo + '&' + vehiculo.valor}>
                        {vehiculo.vehiculo}
                        <FormHelperText style={{marginLeft: '0.5rem'}}>${vehiculo.valor} p/hora</FormHelperText>
                        </MenuItem>
                        ))}
                        </TextField>
                    </Grid>
                    <Grid item lg={4} md={4} xs={12}>
                        <TextField
                        variant="outlined"
                        fullWidth
                        value={marcaVehiculo}
                        name="marcaVehiculo"
                        label="Marca del vehículo"
                        onChange={onChange}
                        className={classes.inputReserva}
                        select>
                        {marcas.map((vehiculo) => (
                        <MenuItem
                        style={{textTransform: 'capitalize'}}
                        key={vehiculo.id}
                        name={vehiculo.marca}
                        value={vehiculo.marca}>
                        {vehiculo.marca}
                        </MenuItem>
                        ))}
                        </TextField>
                    </Grid>
                    <Grid item lg={4} md={4} xs={12}>
                        <InputMask
                            mask="aa 999 aa"
                            value={patenteVehiculo}
                            onChange={onChange}
                            >
                                {() => <TextField
                                    className = {classes.inputReserva}
                                    type="text"
                                    fullWidth
                                    name="patenteVehiculo"
                                    variant="outlined"
                                    label="N° de patente"
                                />
                                }
                        </InputMask>
                    </Grid>
                </Grid>
                <br/>
                <Typography className={classes.subtitulos}>Datos del estacionamiento</Typography>
        <br/>
        <Grid container spacing={3}>
            <Grid item lg={3} md={3} xs={12}>
                <TextField
                autoFocus
                disabled
                variant="filled"
                fullWidth
                value={estacionamiento.nombreCompleto}
                label="Nombre completo"
                className={classes.inputReserva}>
                </TextField>
            </Grid>
            <Grid item lg={3} md={3} xs={12}>
                <TextField
                variant="filled"
                disabled
                fullWidth
                value={estacionamiento.ubicacion.direccion}
                label="Direccion"
                className={classes.inputReserva}>
                </TextField>
            </Grid>
            <Grid item lg={3} md={3} xs={12}>
                <TextField
                variant="filled"
                disabled
                fullWidth
                value={estacionamiento.ubicacion.provincia}
                label="Provincia"
                className={classes.inputReserva}>
                </TextField>
            </Grid>
            <Grid item lg={3} md={3} xs={12}>
                <TextField
                variant="filled"
                disabled
                fullWidth
                value={estacionamiento.telefono}
                label="Teléfono"
                className={classes.inputReserva}>
                </TextField>
            </Grid>
        </Grid>
    <FormHelperText>Aclaración: el lugar se lo asignará el encargado una vez que sea el momento de la reserva </FormHelperText>
    <br/>
    <Typography className={classes.subtitulos}>Seleccione fecha y hora</Typography>
    <br/>
        <Grid container spacing={3}>
            <Grid item lg={3} md={3} xs={12}>
            <DatePicker
                placeholderText="Fecha de reserva"
                locale={es}
                minDate={new Date()}
                onChange={onChangeFecha}
                selected={fecha}
                value={fecha}
                dateFormat="dd/MM/yyyy"
                filterDate={diasDeshabilitados}
                withPortal
            />
            </Grid>
            <Grid item lg={6} md={6} xs={12}>
                <TextField
                variant="outlined"
                fullWidth
                value={hora}
                name="hora"
                label="Horarios disponibles"
                onChange={onChange}
                className={classes.inputReserva}
                select>
                    {resultado.map((x)=>(
                        <MenuItem
                        key={x.hora}
                        name={x.hora}
                        value={x.hora}>{x.hora}</MenuItem>
                    ))}
                </TextField>
            </Grid>
        </Grid>
        <br/>
        <Typography className={classes.subtitulos}>Observaciones</Typography>
        <br/>
        <Grid container spacing={3}>
            <Grid item lg={12} md={12} xs={12}>
                <TextareaAutosize
                    name="observaciones"
                    onChange={onChange}
                    required
                    value={observaciones}
                    className={classes.inputReserva}
                    rowsMin={5}
                    maxLength={100}
                    style={{width: "100%", resize: 'none'}}
                >
                </TextareaAutosize>
            </Grid>
        </Grid>
            </>
            : tab === 1 ? <>
            <Typography className={classes.subtitulos}>Datos personales: </Typography>
            <Divider></Divider>
            <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap', margin: '1rem'}}>
                <Typography className={classes.subtitulos}>Nombre completo: </Typography>
                <Typography className={classes.campos}>{usuario.nombreCompleto}</Typography>
            </div>
            <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap', margin: '1rem'}}>
                <Typography className={classes.subtitulos}>DNI: </Typography>
                <Typography className={classes.campos}>{usuario.dni}</Typography>
            </div>
            <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap', margin: '1rem'}}>
                <Typography className={classes.subtitulos}>Email: </Typography>
                <Typography className={classes.campos}>{usuario.email}</Typography>
            </div>
            <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap', margin: '1rem'}}>
                <Typography className={classes.subtitulos}>Teléfono: </Typography>
                <Typography className={classes.campos}>{usuario.telefono}</Typography>
            </div>
            <Typography className={classes.subtitulos}>Datos del vehículo: </Typography>
            <Divider></Divider>
            <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap', margin: '1rem'}}>
                <Typography className={classes.subtitulos}>Tipo: </Typography>
                <Typography className={classes.campos}>{tipoVehiculo.split('&')[0]}</Typography>
            </div>
            <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap', margin: '1rem'}}>
                <Typography className={classes.subtitulos}>Marca: </Typography>
                <Typography className={classes.campos}>{marcaVehiculo}</Typography>
            </div>
            <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap', margin: '1rem'}}>
                <Typography className={classes.subtitulos}>Patente: </Typography>
                <Typography className={classes.campos}>{patenteVehiculo}</Typography>
            </div>
            <Typography className={classes.subtitulos}>Otros datos: </Typography>
            <Divider></Divider>
            <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap', margin: '1rem'}}>
                <Typography className={classes.subtitulos}>Fecha: </Typography>
                <Typography className={classes.campos}> {fecha.toLocaleString().split('0:00:00')[0]}</Typography>
            </div>
            <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap', margin: '1rem'}}>
                <Typography className={classes.subtitulos}>Hora: </Typography>
                <Typography className={classes.campos}>{hora}</Typography>
            </div>
            <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap', margin: '1rem'}}>
                <Typography className={classes.subtitulos}>Monto a pagar: </Typography>
                <Typography className={classes.campos}> $ {tipoVehiculo.split('&')[1]}</Typography>
            </div>
            <form action="http://localhost:4000/checkout" method="POST">
                <input type="hidden" name="titulo" value={estacionamiento.nombreCompleto}></input>
                <input type="hidden" name="precio" value={tipoVehiculo.split('&')[1]}></input>
                <div style={{textAlign: 'center'}}>
                    <button className={classes.botonPagar}>Pagar</button>
                </div>
            </form>
            </>
            :""}
            </CardContent>
        </Card>
        <br/>
        <div style={{float: 'right', marginRight: '1rem', display: tab === 3 ? 'none' : ''}}>
            <Button disabled={tab===0 ? true: false} style={{display: tab ===1 ? "none" : ""}} onClick={()=>setTab(tab-1)} onChange={handleChange}>Anterior</Button>
            <Button onClick={()=>confirmarReserva()} style={{display: tab ===1 ? "none" : ""}} value={tab} className={classes.botonSiguiente}>Siguiente</Button>
        </div>
        </>
    );
}
 
export default NuevaReserva;