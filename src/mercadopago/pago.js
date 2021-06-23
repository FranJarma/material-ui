const mercadopago = require ('mercadopago');
const functions = require('firebase-functions');
const express = require('express');

const app = express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

mercadopago.configure({
	access_token: 'APP_USR-1392072104819475-062023-0deadff3f13999fbc3296b2631cdff85-46070140'
});

app.post('/checkout', (req,res)=>{
	let preference = {
		items: [
			{
				title: req.body.titulo,
				unit_price: parseInt(req.body.precio),
				quantity: 1,
			}
		], 
	};
mercadopago.preferences.create(preference)
.then(function(response){
	console.log(response.body);
	res.redirect(response.body.init_point);
	// Este valor reemplazará el string "<%= global.id %>" en tu HTML
	global.id = response.body.id;
}).catch(function(error){
	console.log(error);
});
})
app.listen('4000', ()=>{
	console.log('Servidor funcionando en puerto 4000')
})

