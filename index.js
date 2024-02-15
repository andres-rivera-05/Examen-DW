//const express = require('express')
import express from 'express';
import { libro } from './routes/apiLibros.js'
import { usuario } from './routes/apiUsuarios.js'
import { reserva } from './routes/apiReservas.js';
const app = express();
//middlewares esto hace que se reconosca el formato json
app.use(express.json());
//creacmos el puerto
const port = 4000;

app.use('/api/libro', libro)
app.use('/api/usuario', usuario)
app.use('/api/reserva', reserva )

app.listen(port, ()=>{
    console.log(`Escuchando en el puerto ${port}`)
})