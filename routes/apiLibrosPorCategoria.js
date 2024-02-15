import express from 'express'
import { getLibroPorCategoria } from '../controllers/librosPorCategoriaController.js';
const libroPorCategoria = express();

libroPorCategoria.get('/:categoria', getLibroPorCategoria)

export { libroPorCategoria }