import express from 'express';
import { getReserva, postReserva, putReserva, deleteReserva } from '../controllers/reservasController.js';
const reserva = express();


reserva.get('', getReserva)

reserva.post('', postReserva )

reserva.put('/:id', putReserva)

reserva.delete('/:id', deleteReserva )


export { reserva }