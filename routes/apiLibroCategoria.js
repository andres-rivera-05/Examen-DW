import express from 'express'
import { db } from '../db/conn.js';
const libroCategoria = express();

libroCategoria.get('', async (req, res)=>{

    const sql = `Select * from tbl_libros_categorias`;
    const result = await db.query(sql)
    res.json(result);
})

libroCategoria.post('', async (req,res)=>{
    const { libro_id, categoria_id } = req.body;
    const params = [ libro_id, categoria_id];

    const sql=`INSERT INTO tbl_libros_categorias
                (libro_id, categoria_id)
                VALUES
                ($1,$2) returning *`;
       const result = await db.query(sql, params)
       res.json(result);
   
})

libroCategoria.put('/:id', async (req, res)=>{
      const { libro_id , categoria_id } = req.body;
      const { id, id2 } = req.params;
      const params = [libro_id, categoria_id, id, id2];

     const sql = `update tbl_libros_categorias set
                    libro_id = $1,
                    categoria_id = $2
                where id = $3 returning *`;
     
    const result = await db.query(sql, params);
    res.json(result)


})

export { libroCategoria }