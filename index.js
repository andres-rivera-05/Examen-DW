//const express = require('express')
import express from 'express';
import { libro } from './routes/apiLibros.js'
import { usuario } from './routes/apiUsuarios.js'
import { reserva } from './routes/apiReservas.js';
import { categoria } from './routes/apiCategorias.js';
import { libroCategoria } from './routes/apiLibroCategoria.js';
import { libroPorCategoria } from './routes/apiLibrosPorCategoria.js';

import cors from 'cors';
const app = express();

const corsOptions = {
    origin : ['http://localhost:5173','http://localhost:5174','http://localhost:5175'],
    credentials : true,
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}
app.use(cors(corsOptions));
//middlewares esto hace que se reconosca el formato json
app.use(express.json());
//creacmos el puerto
const port = 5000;

app.use('/api/libro', libro)
app.use('/api/usuario', usuario)
app.use('/api/reserva', reserva )
app.use('/api/categoria', categoria)
app.use('/api/categorias', libroCategoria)
app.use('/api/libros', libroPorCategoria)


app.listen(port, ()=>{
    console.log(`Escuchando en el puerto ${port}`)
})