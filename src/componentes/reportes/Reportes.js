import React, {useState} from 'react';
import Navbar from './../diseño/Navbar.js';
import { makeStyles, Typography, Card, CardContent, Grid, Divider, Button } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import {
    DatePicker,
  } from '@material-ui/pickers';
import Footer from '../diseño/Footer.js';

import { LineChart, Line, CartesianGrid, XAxis, YAxis,
PieChart, Pie, Tooltip, BarChart, Legend, Bar, ResponsiveContainer, Cell } from 'recharts';

const useStyles = makeStyles((theme) => ({
    titulo: {
        fontFamily: "Roboto Condensed, sans-serif",
        textTransform: "uppercase",
        fontSize: 25,
        textAlign: "center"
    },
    tituloCarta: {
        fontFamily: "Roboto Condensed, sans-serif",
        fontSize: 15,
        color: "#448aff"
    },
    cartaReportes: {
        boxShadow: "0 2px 3px rgba(0,0,0,0.25), 0 0 3px rgba(0,0,0,0.22)",
        backgroundColor: theme.palette.background.paper,
        marginTop: "1rem",
        flexGrow: 1,
        marginLeft: "1rem",
        marginRight: "1rem"
    },
    inputFecha: {
        marginTop: "2rem",
        fontFamily: "Roboto Condensed, sans-serif",
        "& .MuiFormLabel-root.Mui-focused": {
            color: "#448aff"
        },
        "& .MuiInput-underline:after": {
            borderBottomColor: "#448aff"
        },
    },
    divider: {
        marginLeft: "-1rem",
        marginRight: "-1rem",
        marginTop: "0.5rem"
    },
    botonGenerar: {
        backgroundColor: "#448aff",
        color: "#ffffff",
        fontFamily: "Roboto Condensed, sans-serif",
        textTransform: "uppercase",
        marginLeft: "0.3rem",
        fontSize: 15,
        marginTop: "2.5rem",
        "&:hover":{
            backgroundColor: "#448aff",
        }
    },
    alerta:{
        position: "relative",
        marginLeft: "1rem",
        marginRight: "1rem",
        borderRadius: 0
    },
    botonAutomovil: {
        borderRadius: "1rem",
        marginRight: "2rem",
        marginTop: "1rem",
        fontFamily: "Roboto Condensed, sans-serif",
        color:"#FFFFFF",
        fontSize: "0.8rem",
        height: "1.5rem",
        backgroundColor: "#0088FE",
        "&:hover":{
            backgroundColor: "#0088FE",
        }
    },
    botonCamioneta: {
        borderRadius: "1rem",
        marginRight: "2rem",
        marginTop: "1rem",
        fontFamily: "Roboto Condensed, sans-serif",
        color:"#FFFFFF",
        fontSize: "0.8rem",
        height: "1.5rem",
        backgroundColor: "#00C49F",
        "&:hover":{
            backgroundColor: "#00C49F",
        }
    },
    botonMoto: {
        borderRadius: "1rem",
        marginRight: "2rem",
        marginTop: "1rem",
        fontFamily: "Roboto Condensed, sans-serif",
        color:"#FFFFFF",
        fontSize: "0.8rem",
        height: "1.5rem",
        backgroundColor: "#FFBB28",
        "&:hover":{
            backgroundColor: "#FFBB28",
        }
    },
    botonBicicleta: {
        borderRadius: "1rem",
        marginRight: "2rem",
        marginTop: "1rem",
        fontFamily: "Roboto Condensed, sans-serif",
        color:"#FFFFFF",
        fontSize: "0.8rem",
        height: "1.5rem",
        backgroundColor: "#FF8042",
        "&:hover":{
            backgroundColor: "#FF8042",
        }
    },
}));

const Reportes = () => {
    const classes = useStyles();
    const [fechaSeleccionadaIngresos, handleCambiarFechaIngresos] = useState(new Date());
    const [fechaSeleccionadaReservas, handleCambiarFechaReservas] = useState(new Date());
    const datosIngresosPorMes = [
        {mes: 'Enero', ingresos: 48.452},
        {mes: 'Febrero', ingresos: 45.112},
        {mes: 'Marzo', ingresos: 52.541},
        {mes: 'Abril', ingresos: 50.151},
        {mes: 'Mayo', ingresos: 41.445},
        {mes: 'Junio', ingresos: 51.445},
        {mes: 'Julio', ingresos: 42.120},
        {mes: 'Agosto', ingresos: 43.128},
        {mes: 'Septiembre', ingresos: 38.453},
        {mes: 'Octubre', ingresos: 37.451},
        {mes: 'Noviembre', ingresos: 40.451},
        {mes: 'Diciembre', ingresos: 53.123},
    ];
    const datosPorcentajesVehiculos = [
        { tipo: 'Automóvil', porcentaje: 80 },
        { tipo: 'Camioneta', porcentaje: 10 },
        { tipo: 'Motocicleta', porcentaje: 8 },
        { tipo: 'Bicicleta', porcentaje: 2 },
      ];
    const datosReservasPorSemana = [
        { semana: '1', cantidad: 52 },
        { semana: '2', cantidad: 42 },
        { semana: '3', cantidad: 33 },
        { semana: '4', cantidad: 58 },
    ];
      
      const data03 = [
        {
            horario: '06-10',
            total: 20
        },
        {
            horario: '10-14',
            total: 35
        },
        {
            horario: '14-19',
            total: 41
        },
        {
            horario: '19-24',
            total: 22
        },
        {
            horario: '24-06',
            total: 10
        }
      ];
    const radianes = Math.PI / 180;
    const colores = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    const labelPorcentaje = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * radianes);
        const y = cy + radius * Math.sin(-midAngle * radianes);
      
        return (
          <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
          </text>
        );
      };
      
    return (
        <>
            <Navbar/>
            <Typography className={classes.titulo}>Reportes</Typography>
            &nbsp;
            <Alert className={classes.alerta} severity="info" variant="filled">En esta pantalla usted podrá realizar diferentes tipos de reportes para analizar la situación de su playa de estacionamiento. Entre los cuales puede elegir:
             <ul>
                 <li>Reporte de ingresos por año.</li>
                 <li>Cantidad de reservas realizadas por mes.</li>
                 <li>Horarios más concurridos.</li>
                 <li>Porcentaje de vehículos.</li>
            </ul>
            </Alert>
             <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                    <Card className = {classes.cartaReportes}>
                        <CardContent>
                            <Typography className={classes.tituloCarta}>
                                Ingresos por año
                            </Typography>
                            <Divider className={classes.divider}></Divider>
                            <DatePicker
                            className={classes.inputFecha}
                            disableFuture
                            views={["year"]}
                            format="yyyy"
                            label="Seleccione año"
                            value={fechaSeleccionadaIngresos}
                            onChange={handleCambiarFechaIngresos}
                            />
                            <Button className= {classes.botonGenerar}>Generar</Button>
                            <div style={{ width: '100%', height: 300 }}>
                                <ResponsiveContainer>
                                    <LineChart
                                    width={400}
                                    height={300}
                                    data={datosIngresosPorMes}
                                    margin={{
                                        top: 50,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}>
                                        <Line type="monotone" dataKey="ingresos" stroke="#8884d8" />
                                        <CartesianGrid stroke="#ccc" />
                                        <XAxis dataKey="mes" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Card className = {classes.cartaReportes}>
                        <CardContent>
                            <Typography className={classes.tituloCarta}>
                                Cantidad de reservas realizadas por mes
                            </Typography>
                            <Divider className={classes.divider}></Divider>
                            <DatePicker
                            className={classes.inputFecha}
                            disableFuture
                            views={["year", "month"]}
                            format="MM/yyyy"
                            label="Seleccione mes y año"
                            value={fechaSeleccionadaReservas}
                            onChange={handleCambiarFechaReservas}
                            />
                            <Button className= {classes.botonGenerar}>Generar</Button>
                            <div style={{ width: '100%', height: 300 }}>
                                <ResponsiveContainer>
                                    <LineChart width={400}
                                    height={300}
                                    data={datosReservasPorSemana}
                                    margin={{
                                        top: 50,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}>
                                    <Line type="monotone" dataKey="cantidad" stroke="#8884d8" />
                                    <CartesianGrid stroke="#ccc" />
                                    <XAxis dataKey="semana" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                </LineChart>
                            </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Card className = {classes.cartaReportes}>
                        <CardContent>
                            <Typography className={classes.tituloCarta}>
                                Horarios más concurridos
                            </Typography>
                            <Divider className={classes.divider}></Divider>
                            <div style={{ width: '100%', height: 300 }}>
                            <ResponsiveContainer>
                                <BarChart
                                width={600}
                                height={300}
                                data={data03}
                                margin={{
                                    top: 50,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                                barSize={20}
                                >
                                <XAxis dataKey="horario" scale="point" padding={{ left: 10, right: 10 }} />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <CartesianGrid strokeDasharray="3 3" />
                                <Bar dataKey="total" fill="#8884d8" background={{ fill: '#eee' }} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Card className = {classes.cartaReportes}>
                        <CardContent>
                            <Typography className={classes.tituloCarta}>
                                Porcentaje de vehículos
                            </Typography>
                            <Divider className={classes.divider}></Divider>
                            <div style={{ width: '100%', height: 300 }}>
                                <ResponsiveContainer>
                                    <PieChart width={500} height={400}>
                                    <Pie
                                    data={datosPorcentajesVehiculos}
                                    cx="50%"
                                    cy="50%"
                                    label={labelPorcentaje}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="porcentaje"
                                    >
                                    {datosPorcentajesVehiculos.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={colores[index % colores.length]} />
                                    ))}
                                    </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div style={{textAlign: "center"}}>
                                <Button
                                className={classes.botonAutomovil}
                                >Automóvil
                                </Button>
                                <Button
                                className={classes.botonCamioneta}
                                >Camioneta
                                </Button>
                                <Button
                                className={classes.botonMoto}
                                >Motocicleta
                                </Button>
                                <Button
                                className={classes.botonBicicleta}
                                >Bicicleta
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Footer/>
        </>
    );
}
 
export default Reportes;