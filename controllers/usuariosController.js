import { db } from '../db/conn.js'
import { usuario } from '../routes/apiUsuarios.js';

const getUsuario = async (req,res)=>{

    const sql = `select * from  tbl_usuario order by id`;
    const result = await db.query(sql);

    res.json(result);
}

const postUsuario = async (req, res)=>{

    const { nombre, gmail, contrasenia } = req.body;
    const params = [ nombre, gmail, contrasenia];

    const sql = `insert into tbl_usuario
                (nombre, gmail, contrasenia)
                values
                ($1, $2, $3) returning * `;
    
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

export { getUsuario, postUsuario, putUsuario }