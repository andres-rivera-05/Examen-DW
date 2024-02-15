/*import { db  } from '../db/conn.js'

const getCategoria = async (req,res)=>{

    const categoriaId = req.params.id;

    const sql = `SELECT tbl_libro.id AS libro_id, tbl_libro.titulo AS nombre_libro, tbl_categoria.nombre
                    FROM tbl_libro
                    JOIN tbl_libros_categorias ON tbl_libro.id = tbl_libros_categorias.libro_id
                    JOIN tbl_categoria ON tbl_categoria.id = tbl_libros_categorias.categoria_id
                WHERE tbl_categoria.id = $1`;

  const result = await db.query(sql, [categoriaId])
  res.json(result);
}

export { getCategoria }
*/
