-- Active: 1707795232143@@127.0.0.1@5432@biblioteca@public

CREATE Table tbl_categorias (
    id SERIAL PRIMARY KEY,,
    nombreCategoria VARCHAR(255) NOT NULL
);

SELECT * FROM tbl_categorias

INSERT INTO tbl_categorias (nombreCategoria) VALUES ('Novelas');

 CREATE Table tbl_libro
 (
     id SERIAL PRIMARY KEY,
     titulo VARCHAR(255) NOT NULL,
     autor VARCHAR(255) NOT NULL,
     anio_publicacion INTEGER,
     estado VARCHAR(50) NOT NULL,
     creado TIMESTAMP DEFAULT current_timestamp,
     categoria_id INTEGER REFERENCES tbl_categorias (id)
 );

 INSERT INTO tbl_libro
 (titulo, autor, anio_publicacion, estado, categoria_id)
 VALUES
 ('El nombre del viento','Patrick Rothfuss',2007,'Disponible',2);

SELECT * FROM tbl_libro

---reseteando el contador de la tabla tbl_libro
ALTER SEQUENCE tbl_libro_id_seq RESTART WITH 1;
SELECT * FROM tbl_libro 

 CREATE Table tbl_usuario
 (
     id SERIAL PRIMARY KEY,
     nombre VARCHAR(255) NOT NULL,
     imagen bytea,
     mime_type VARCHAR(250),
     nombre_archivo VARCHAR(250),
     gmail VARCHAR(255) NOT NULL,
     contrasenia VARCHAR(255) NOT NULL,
     creado TIMESTAMP DEFAULT current_timestamp
 );


ALTER TABLE tbl_usuario
ADD COLUMN contrasenia VARCHAR(20);
SELECT  * FROM tbl_usuario 



SELECT * FROM tbl_usuario   


 CREATE Table tbl_reserva
 (
     id SERIAL PRIMARY KEY,
     usuario_id INTEGER REFERENCES tbl_usuario(id),
     libro_id INTEGER REFERENCES tbl_libro(id),
     estado VARCHAR(225),
     fecha_reserva DATE NOT NULL,
     fecha_devolucion DATE NOT NULL
 );

 ALTER TABLE tbl_reserva
 add estado VARCHAR(225);

 SELECT * FROM tbl_reserva

 INSERT INTO tbl_reserva
 (usuario_id, libro_id, fecha_reserva, fecha_devolucion, estado)
 VALUES
 (13,23,'2024-01-21','2024-01-25', 'Activo');

 INSERT INTO tbl_reserva(usuario_id, libro_id, fecha_reserva, fecha_devolucion)
 VALUES
 (1,3,'2024-02-15','2024-02-22');

 select * FROM tbl_reserva

  INSERT INTO tbl_reserva(usuario_id, libro_id, fecha_reserva, fecha_devolucion)
 VALUES
 (1,4,'2024-02-15','2024-02-22');


SELECT tbl_libro.*, tbl_reserva.* FROM tbl_libro JOIN tbl_reserva On tbl_libro.id = tbl_reserva.libro_id;




SELECT FROM tbl_categorias 

SELECT * FROM tbl_libros_categorias


 CREATE Table tbl_libros_categorias
 (
   libro_id INTEGER REFERENCES tbl_libro(id),
   categoria_id INTEGER REFERENCES tbl_categoria(id),
   PRIMARY KEY (libro_id, categoria_id)
 );


ALTER TABLE tbl_libros_categorias
ADD COLUMN id SERIAL PRIMARY KEY;

ALTER TABLE tbl_libros_categorias
DROP CONSTRAINT IF EXISTS tbl_libros_categorias_pkey;

ALTER TABLE tbl_libros_categorias
ADD CONSTRAINT unique_libro_categoria UNIQUE (libro_id, categoria_id);



 SELECT tbl_libro.id AS libro_id, tbl_libro.titulo AS nombre_libro, tbl_categoria.nombre
 From tbl_libro
 JOIN tbl_libros_categorias ON tbl_libro.id = tbl_libros_categorias.libro_id
 JOIN tbl_categoria ON tbl_categoria.id = tbl_libros_categorias.categoria_id;
 



 INSERT INTO tbl_libros_categorias
 (libro_id, categoria_id)
 VALUES
 (4,1);


 SELECT *FROM tbl_libros_categorias 


 SELECT r.id, u.nombre as nombre_usuario, r.libro_id, r.fecha_reserva, r.fecha_devolucion, r.estado
FROM tbl_reserva r
INNER JOIN tbl_usuario u ON r.usuario_id = u.id;

SELECT r.id, u.id as usuario_id, u.nombre as nombre_usuario, r.libro_id, r.fecha_reserva, r.fecha_devolucion, r.estado
FROM tbl_reserva r
INNER JOIN tbl_usuario u ON r.usuario_id = u.id;


SELECT r.id, u.id as usuario_id, u.nombre as nombre_usuario, l.titulo as titulo_libro, r.fecha_reserva, r.fecha_devolucion, r.estado
FROM tbl_reserva r
INNER JOIN tbl_usuario u ON r.usuario_id = u.id
INNER JOIN tbl_libro l ON r.libro_id = l.id;

SELECT * FROM tbl_categoria


SELECT * FROM tbl_categoria





SELECT tbl_libro.*,
        tbl_categorias.nombrecategoria AS nombre_categoria
FROM tbl_libro
    JOIN tbl_categorias ON tbl_libro.categoria_id = tbl_categorias.id
WHERE
    tbl_categorias.id = 1;

    SELECT tbl_libro.*, tbl_categorias.nombrecategoria AS nombre_categoria
FROM tbl_libro
    JOIN tbl_categorias ON tbl_libro.categoria_id = tbl_categorias.id





SELECT
    tbl_reserva.id,
    tbl_usuario.nombre AS nombre_usuario,
    tbl_libro.titulo AS nombre_libro,
    tbl_reserva.fecha_reserva,
    tbl_reserva.fecha_devolucion,
    tbl_reserva.estado
FROM
    tbl_reserva
    JOIN tbl_usuario ON tbl_reserva.usuario_id = tbl_usuario.id
    JOIN tbl_libro ON tbl_reserva.libro_id = tbl_libro.id;




SELECT
    tbl_reserva.id,
    tbl_usuario.nombre AS nombre_usuario,
    tbl_libro.titulo AS nombre_libro,
    tbl_reserva.fecha_reserva,
    tbl_reserva.fecha_devolucion,
    tbl_reserva.estado,
    total_reservas_usuario.total_reservas
FROM
    tbl_reserva
    JOIN tbl_usuario ON tbl_reserva.usuario_id = tbl_usuario.id
    JOIN tbl_libro ON tbl_reserva.libro_id = tbl_libro.id
    JOIN (
        SELECT usuario_id, COUNT(id) AS total_reservas
        FROM tbl_reserva
        GROUP BY
            usuario_id
    ) AS total_reservas_usuario ON tbl_reserva.usuario_id = total_reservas_usuario.usuario_id;


    SELECT
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
ORDER BY tbl_usuario.id;