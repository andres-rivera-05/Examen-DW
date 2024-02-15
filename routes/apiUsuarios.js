import express from 'express'
import { getUsuario, postUsuario, putUsuario, deleteUsuario } from '../controllers/usuariosController.js';
const usuario = express();


usuario.get('', getUsuario)

usuario.post('', postUsuario)

usuario.put('/:id', putUsuario)

usuario.delete('/:id', deleteUsuario)

export { usuario }