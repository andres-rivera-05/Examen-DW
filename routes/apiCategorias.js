import express from 'express'
import { getCategoria, postCategoria, putCategoria, deleteCategoria } from '../controllers/categoriasController.js'
const categoria = express()

categoria.get('', getCategoria)


categoria.post('', postCategoria)


categoria.put('/:id', putCategoria)


categoria.delete('/:id', deleteCategoria)

export { categoria }