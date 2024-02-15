import { db } from '../db/conn.js'

const getLibro = async (req, res)=>{

    const sql = `Select * from tbl_libro order by id`;
    const result = await db.query(sql)
    res.json(result);
    
}

const postLibro = async (req,res)=>{
 
    const { titulo, autor, anio_publicacion  } = req.body;
    const params = [titulo, autor, anio_publicacion];

    const sql =`insert into tbl_libro
                (titulo, autor, anio_publicacion)
                values
                ($1, $2, $3) returning * `;

    const result = await db.query(sql, params);
    res.json(result);
}

const putLibro = async  (req, res)=>{

    const { titulo, autor, anio_publicacion  } = req.body;
    const { id } = req.params;

    const params = [titulo, autor, anio_publicacion, id];

    const sql = `update tbl_libro set
                    titulo = $1,
                    autor = $2,
                    anio_publicacion = $3
                where id = $4 returning *`;

    const result = await db.query(sql, params);

    res.json(result);
}

const deleteLibro = async (req, res)=>{

    const params = [req.params.id];
    const sql = `delete from tbl_libro where id =$1 returning *`;
    const result = await db.query(sql, params);

    res.json(result);
}

export { getLibro, postLibro, putLibro, deleteLibro }