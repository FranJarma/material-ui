import React, {useState} from 'react';
import Navbar from './../diseño/Navbar.js';
import { makeStyles, Typography, Card, CardContent, Grid, Divider, Button } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import {
    DatePicker,
  } from '@material-ui/pickers';
import Footer from '../diseño/Footer.js';

import { LineChart, Line, CartesianGrid, XAxis, YAxis,
PieChart, Pie, Tooltip, BarChart, Legend, Bar, ResponsiveContainer } from 'recharts';

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
        [theme.breakpoints.up('lg')]: {
            marginLeft: "20rem",
            marginRight: "1rem",
        },
        [theme.breakpoints.down('md')]: {
            marginLeft: "1rem",
            marginRight: "1rem"
        },
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
        [theme.breakpoints.up('lg')]: {
            marginLeft: "20rem",
            marginRight: "1rem"
        },
        [theme.breakpoints.down('md')]: {
            marginLeft: "1rem",
            marginRight: "1rem"
        },
        borderRadius: 0
    },
}));

const Reportes = () => {
    const classes = useStyles();
    const [fechaSeleccionadaIngresos, handleCambiarFechaIngresos] = useState(new Date());
    const [fechaSeleccionadaReservas, handleCambiarFechaReservas] = useState(new Date());
    const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}];
    const data01 = [
        { name: 'Automóvil', value: 80 },
        { name: 'Camioneta', value: 10 },
        { name: 'Motocicleta', value: 8 },
        { name: 'Bicicleta', value: 2 },
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
    return (
        <>
            <Navbar/>
            <Typography className={classes.titulo}>Reportes</Typography>
            &nbsp;
            <Alert className={classes.alerta} severity="info" variant="filled">En esta pantalla usted podrá realizar diferentes tipos de reportes para analizar la situación de su playa de estacionamiento. Entre los cuales puede elegir:
             <ul>
                 <li>Reporte de ingresos por mes.</li>
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
                                Ingresos por mes
                            </Typography>
                            <Divider className={classes.divider}></Divider>
                            <DatePicker
                            className={classes.inputFecha}
                            disableFuture
                            views={["year", "month"]}
                            format="MM/yyyy"
                            label="Seleccione mes y año"
                            value={fechaSeleccionadaIngresos}
                            onChange={handleCambiarFechaIngresos}
                            />
                            <Button className= {classes.botonGenerar}>Generar</Button>
                            <div style={{ width: '100%', height: 300 }}>
                                <ResponsiveContainer>
                                    <LineChart
                                    width={400}
                                    height={300}
                                    data={data}
                                    margin={{
                                        top: 50,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}>
                                        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                                        <CartesianGrid stroke="#ccc" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
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
                                    data={data}
                                    margin={{
                                        top: 50,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}>
                                    <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                                    <CartesianGrid stroke="#ccc" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
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
                                    <PieChart width={300} height={300}>
                                        <Pie
                                            dataKey="value"
                                            isAnimationActive={false}
                                            data={data01}
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={80}
                                            fill="#8884d8"
                                            label
                                        />
                                    <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
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