//llamar las herramientas que instalamos//
import express from 'express';
import Sequelize  from 'sequelize';
import dotenv from 'dotenv';

// Utilizo 'express' y le digo que utilice el ´puerto 3000//
const app = express ();
const PORT = 3000;

//.get, cuando utulize '/' que obtenga y capture esa respuesta y la transforme
//en formato json y que muestre el mensaje ok:true
app.get('/', (req, res) => res.json({ok:true}));

//.listen, levanta puerto, y muestra en la consola el mensaje con el servidor corriendo
//si funciona 
app.listen(PORT,()=> console.log("server runnings on http://localhost:" + PORT));

