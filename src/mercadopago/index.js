const functions = require("firebase-functions");
const express = require("express");
const app = express();

const { procesoDePago } = require('./pago');

app.post('/process_payment', procesoDePago);

exports.web = functions.https.onRequest(app);