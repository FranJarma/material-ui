import React, { useState } from 'react';
import { Grid, TextField, Typography, TextareaAutosize, MenuItem, FormHelperText } from '@material-ui/core';
import { useStyles } from './Styles';
import useLocalStorageState from 'use-local-storage-state'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';
import "./styles.css";

const TabReserva = ({estacionamiento}) => {
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
    const classes = useStyles();
    const [infoReserva, setInfoReserva] = useState({
        hora: '',
        observaciones: ''
    });
    const [fecha, setFecha] = useState(null);
    const [localStorageInfoReserva, guardarInfoReservaEnLocalStorage] = useLocalStorageState('infoReserva', infoReserva);
    const [localStorageFecha, guardarFechaEnLocalStorage] = useLocalStorageState('fecha', fecha);

    //evento onChange
    const onChange = (e) => {
        setInfoReserva({
            ...infoReserva,
            [e.target.name] : e.target.value
        });
        guardarInfoReservaEnLocalStorage({
            ...infoReserva,
            [e.target.name] : e.target.value
        });
    }
    //evento onChange
    const onChangeFecha = (fecha) => {
        setFecha(fecha);
        guardarInfoReservaEnLocalStorage({...infoReserva});
        guardarFechaEnLocalStorage(fecha.getDay()+'/'+fecha.getMonth()+'/'+fecha.getFullYear());
    }
    return (
    <>
    <Typography className={classes.subtitulos}>Datos del estacionamiento</Typography>
    <br/>
        <Grid container spacing={3}>
            <Grid item lg={3} xs={12}>
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
            <Grid item lg={3} xs={12}>
                <TextField
                variant="filled"
                disabled
                fullWidth
                value={estacionamiento.ubicacion.direccion}
                label="Direccion"
                className={classes.inputReserva}>
                </TextField>
            </Grid>
            <Grid item lg={3} xs={12}>
                <TextField
                variant="filled"
                disabled
                fullWidth
                value={estacionamiento.ubicacion.provincia}
                label="Provincia"
                className={classes.inputReserva}>
                </TextField>
            </Grid>
            <Grid item lg={3} xs={12}>
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
            <Grid item lg={3} xs={12}>
            <DatePicker
                placeholderText="Fecha de reserva"
                locale={es}
                minDate={new Date()}
                onChange={onChangeFecha}
                selected={fecha}
                value={localStorageFecha}
                dateFormat="dd/MM/yyyy"
                filterDate={diasDeshabilitados}
                withPortal
            />
            </Grid>
            <Grid item lg={6} xs={12}>
                <TextField
                variant="outlined"
                fullWidth
                value={localStorageInfoReserva.hora}
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
            <Grid item lg={12} xs={12}>
                <TextareaAutosize
                    name="observaciones"
                    onChange={onChange}
                    required
                    value={localStorageInfoReserva.observaciones}
                    className={classes.inputReserva}
                    rowsMin={5}
                    maxLength={100}
                    style={{width: "100%", resize: 'none'}}
                >
                </TextareaAutosize>
            </Grid>
        </Grid>
    </>
     );
}
 
export default TabReserva;