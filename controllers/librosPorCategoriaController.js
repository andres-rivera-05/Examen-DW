import { db } from '../db/conn.js'

const getLibroPorCategoria = async (req, res)=>{
    const { categoria } = req.params;

    const sql=`select tbl_libro.* 
                from tbl_libro 
                join tbl_libros_categorias on tbl_libro.id = tbl_libros_categorias.libro_id
                join tbl_categoria on tbl_libros_categorias.categoria_id = tbl_categoria.id
           where tbl_categoria.nombre = $1`;

    const result = await db.query(sql, [categoria])
    res.json(result)

}

export { getLibroPorCategoria }