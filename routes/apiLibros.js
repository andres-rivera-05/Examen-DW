import express from 'express'
const libro = express();
import { db } from '../db/conn.js'


libro.get('', async (req, res)=>{

    const sql = `Select * from tbl_libro order by id`;
    const result = await db.query(sql)
    res.json(result);
    
})

libro.post('', async (req,res)=>{
 
    const { titulo, autor, anio_publicacion  } = req.body;
    const params = [titulo, autor, anio_publicacion];

    const sql =`insert into tbl_libro
                (titulo, autor, anio_publicacion)
                values
                ($1, $2, $3) returning * `;

    const result = await db.query(sql, params);
    res.json(result);
})

libro.put('/:id', async  (req, res)=>{

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
})

export { libro }