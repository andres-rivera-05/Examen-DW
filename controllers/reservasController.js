import { db } from '../db/conn.js'

const getReserva = async (req, res)=>{

    //const sql = `Select * from tbl_reserva order by id`;
    const sql = `SELECT
                tbl_reserva.id,
                tbl_usuario.nombre AS nombre_usuario,
                tbl_libro.titulo AS nombre_libro,
                tbl_reserva.fecha_reserva,
                tbl_reserva.fecha_devolucion,
                tbl_reserva.estado
            FROM
                tbl_reserva
                JOIN tbl_usuario ON tbl_reserva.usuario_id = tbl_usuario.id
                JOIN tbl_libro ON tbl_reserva.libro_id = tbl_libro.id;`
    const result = await db.query(sql)
    res.json(result);
}

const postReserva = async (req, res)=>{

    const { usuario_id, libro_id, fecha_reserva, fecha_devolucion, estado  } = req.body;
    const params = [usuario_id, libro_id, fecha_reserva, fecha_devolucion, estado];

    const sql =`insert into tbl_reserva
                (usuario_id, libro_id, fecha_reserva, fecha_devolucion, estado)
                values
                ($1, $2, $3, $4, $5) returning * `;

    const result = await db.query(sql, params);

    res.json(result);

}

const putReserva = async (req, res)=>{
    const { usuario_id, libro_id, fecha_reserva, fecha_devolucion, estado } = req.body;
    const { id } = req.params;
    const params = [usuario_id, libro_id, fecha_reserva, fecha_devolucion, estado, id];

    const sql = `update tbl_reserva set
                    usuario_id = $1,
                    libro_id = $2,
                    fecha_reserva = $3,
                    fecha_devolucion = $4,
                    estado = $5
                 where id = $6 returning *`;

    const result = await db.query(sql, params);

res.json(result);

}

const deleteReserva = async (req, res)=>{
    const params = [req.params.id];
    const sql = `delete from tbl_reserva where id =$1 returning *`;
    const result = await db.query(sql, params);

    res.json(result);
}


export { getReserva, postReserva, putReserva, deleteReserva }