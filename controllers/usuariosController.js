import { db } from '../db/conn.js'

const getAuth = async (req, res)=>{
    const { nombre, contrasenia } = req.params;
    const sql = `SELECT  nombre from tbl_usuario
                   where nombre = $1
                   and contrasenia = $2`
    const result = await db.query(sql,[ nombre, contrasenia])

    if(result.length === 0){
        res.status(400).json({mensaje: "las contrasenas no coinciden"})
    }else {
        res.json(result)
    }
}

const getUsuario = async (req,res)=>{

    const sql = `SELECT
                tbl_usuario.id,
                tbl_usuario.nombre,
                tbl_usuario.gmail,
                tbl_usuario.mime_type,
                ENCODE(tbl_usuario.imagen, 'base64') AS imagen,
                COALESCE(
                    total_reservas_usuario.total_reservas, 0
                ) AS total_reservas
            FROM
                tbl_usuario
                LEFT JOIN (
                    SELECT usuario_id, COUNT(id) AS total_reservas
                    FROM tbl_reserva
                    GROUP BY
                        usuario_id
                ) AS total_reservas_usuario ON tbl_usuario.id = total_reservas_usuario.usuario_id
            ORDER BY tbl_usuario.id;`

    const result = await db.query(sql);

    res.json(result);
}

const postUsuario = async (req, res)=>{
    let imagenData = null
    let mime_type = null
    let nombreArchivo = null

    const { nombre, gmail, contrasenia } = req.body;
    if(req.file){
        const {
            buffer,
            mimetype,
            originalname
        } = req.file

        imagenData = buffer
        mime_type = mimetype
        nombreArchivo = originalname
    }
    
    const params = [imagenData, mime_type, nombreArchivo, nombre, gmail, contrasenia];
    const sql = `insert into tbl_usuario
                (imagen, mime_type, nombre_archivo, nombre, gmail, contrasenia)
                values
                ($1, $2, $3, $4, $5, $6) returning id, nombre, 'Publicacion Exitosa' mensaje `;
    
    const result = await db.query(sql, params);

    res.json(result);

}

const putUsuario = async (req, res)=>{
  
    const { nombre, gmail, contrasenia } = req.body;
    const { id } = req.params;
    const params = [ nombre, gmail, contrasenia, id];

    const sql = `update tbl_usuario set
                    nombre = $1,
                    gmail = $2,
                    contrasenia = $3
                where id = $4 returning *`;

    const result = await db.query(sql, params)

    res.json(result);

}

const deleteUsuario = async (req, res)=>{

    const params = [req.params.id];
    const sql = `delete from tbl_usuario where id =$1 returning *`;
    const result = await db.query(sql, params);

    res.json(result);
}

export { getUsuario, postUsuario, putUsuario, deleteUsuario, getAuth }