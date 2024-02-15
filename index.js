//const express = require('express')
import express from 'express';
import { libro } from './routes/apiLibros.js'
const app = express();
//middlewares
app.use(express.json());

const port = 4000;

app.use('/api/libro', libro)

app.listen(port, ()=>{

    console.log(`Escuchando en el puerto ${port}`)

})