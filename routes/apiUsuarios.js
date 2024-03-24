import express from 'express'
import { getUsuario, postUsuario, putUsuario, deleteUsuario, getAuth } from '../controllers/usuariosController.js';
const usuario = express();
import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({storage: storage});



usuario.get('/auth/:nombre/:contrasenia', getAuth)

usuario.get('', getUsuario)

usuario.post('',upload.single('imagen'), postUsuario)

usuario.put('/:id', putUsuario)

usuario.delete('/:id', deleteUsuario)

export { usuario }