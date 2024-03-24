import express from 'express'
const libro = express();
import { getLibro, postLibro, putLibro, deleteLibro, getLibroId, getLibroCaptegoria, getLibCategorias} from '../controllers/librosController.js';


libro.get('/categoria/:id', getLibroCaptegoria)

libro.get('/categoria', getLibCategorias)

libro.get('', getLibro )

libro.get('/seleccionado/:id', getLibroId)

libro.post('', postLibro )

libro.put('/:id', putLibro )

libro.delete('/delete/:id', deleteLibro )

export { libro }