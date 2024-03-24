import { db } from '../db/conn.js'



const getLibCategorias = async (req, res) => {

    const sql =`SELECT tbl_libro.*, tbl_categorias.nombrecategoria AS nombre_categoria
         FROM tbl_libro
    JOIN tbl_categorias ON tbl_libro.categoria_id = tbl_categorias.id`;

    const result = await db.query(sql)
    res.json(result)
}

const getLibroCaptegoria = async (req, res) => {
    try {
    const { id } = req.params;
    const sql = `SELECT tbl_libro.*,
                    tbl_categorias.nombrecategoria AS nombre_categoria
                FROM tbl_libro
                    JOIN tbl_categorias ON tbl_libro.categoria_id = tbl_categorias.id
                WHERE
                    tbl_categorias.id = $1 `;

   
        const result = await db.query(sql, [id])
        res.json(result)
    } catch (err) {
        res.status(500).json({ mensaje: err.message });
    }

}

const getLibro = async (req, res) => {
    const sql = `Select * from tbl_libro order by id`;
    const result = await db.query(sql)
    res.json(result);
}

//metodo para devovler el libro por su ID
const getLibroId = async (req, res) => {
    const { id } = req.params;

    const sql = `SELECT * FROM tbl_libro WHERE id = $1`;
    const result = await db.query(sql, [id])
    res.json(result);
}

const postLibro = async (req, res) => {
    try{
        const { titulo, autor, anio_publicacion, estado, categoria_id } = req.body;
        const params = [titulo, autor, anio_publicacion, estado, categoria_id];

        const sql = `insert into tbl_libro
                (titulo, autor, anio_publicacion, estado, categoria_id)
                values
                ($1, $2, $3, $4, $5) returning * `;

        const result = await db.query(sql, params);
        res.json(result);
    }catch(err){
        res.status(500).json({mensaje: err.message})
    }

}

const putLibro = async (req, res) => {
    try{
    const { titulo, autor, anio_publicacion, estado, categoria_id } = req.body;
    const { id } = req.params;
    const params = [titulo, autor, anio_publicacion, estado, categoria_id, id];

    const sql = `update tbl_libro set
                    titulo = $1,
                    autor = $2,
                    anio_publicacion = $3,
                    estado = $4,
                    categoria_id =$5
                where id = $6 returning *`;

    const result = await db.query(sql, params);
    res.json(result);
    }catch(err){
        res.status(500).json({mensaje: err.message})
    }
}

const deleteLibro = async (req, res) => {
    const params = [req.params.id];
    const sql = `delete from tbl_libro where id =$1 returning *`;
    const result = await db.query(sql, params);

    res.json(result);
}

export { getLibro, postLibro, putLibro, deleteLibro, getLibroId, getLibroCaptegoria, getLibCategorias }