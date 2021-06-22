
const mercadopago = require ('mercadopago');
const express = require('express');
const port = 3000;

const app = express();
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
  });
app.use(express.static("../../src/componentes/reservas/NuevaReserva.js"));

mercadopago.configure({
	access_token: 'TEST-1392072104819475-062023-bec876b33a4911c3e96334b13c558c7b-46070140'
});

app.post("/api/pagos/", (req, res) => {
	mercadopago.preferences.create({
		items: [
			{
				title: 'Prueba',
				unit_price: 100,
				quantity: 1,
			}]
	}).then((preference) => {
		// el front recibirá el preferenceId :)
		res.json({ preferenceId: preference.id });
		});
	});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})