-- Active: 1707795232143@@127.0.0.1@5432@biblioteca@public
 CREATE Table tbl_libro
 (
     id SERIAL PRIMARY KEY,
     titulo VARCHAR(255) NOT NULL,
     autor VARCHAR(255) NOT NULL,
     anio_publicacion INTEGER,
     creado TIMESTAMP DEFAULT current_timestamp
 );


 INSERT INTO tbl_libro
 (titulo, autor, anio_publicacion)
 VALUES
 ('Cien anios de soledad','Gabriela Garcia',1967);

 SELECT * FROM tbl_libro

 

 CREATE Table tbl_usuario
 (
     id SERIAL PRIMARY KEY,
     nombre VARCHAR(255) NOT NULL,
     gmail VARCHAR(255) NOT NULL,
     contrasenia VARCHAR(255) NOT NULL,
     creado TIMESTAMP DEFAULT current_timestamp
 );

 INSERT INTO tbl_usuario
 (nombre, gmail, contrasenia)
VALUES
('Juan Rivera', 'juanrivera200@gmail.com','12345678'),
('Maria Rodriguez', 'maria1982@gmail.com', 'Maria234'),
('Andres','andresrivera@gmail.com','gato2345');

SELECT * FROM tbl_usuario


 CREATE Table tbl_reserva
 (
     id SERIAL PRIMARY KEY,
     usuario_id INTEGER REFERENCES tbl_usuario(id),
     libro_id INTEGER REFERENCES tbl_libro(id),
     fecha_reserva DATE NOT NULL,
     fecha_devolucion DATE NOT NULL
 );

 ALTER TABLE tbl_reserva
 add estado VARCHAR(225);

 INSERT INTO tbl_reserva(usuario_id, libro_id, fecha_reserva, fecha_devolucion)
 VALUES
 (1,3,'2024-02-15','2024-02-22');

 select * FROM tbl_reserva



  INSERT INTO tbl_reserva(usuario_id, libro_id, fecha_reserva, fecha_devolucion)
 VALUES
 (1,4,'2024-02-15','2024-02-22');


SELECT tbl_libro.*, tbl_reserva.* FROM tbl_libro JOIN tbl_reserva On tbl_libro.id = tbl_reserva.libro_id;


 CREATE Table tbl_categoria
 (
     id SERIAL PRIMARY KEY,
     nombre VARCHAR(255) NOT NULL
 );


INSERT INTO tbl_categoria
(nombre)
VALUES
('Ficcion'),
('terror'),
('comedia');

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

select tbl_libro.* 
    from tbl_libro 
    join tbl_libros_categorias on tbl_libro.id = tbl_libros_categorias.libro_id
    join tbl_categoria on tbl_libros_categorias.categoria_id = tbl_categoria.id
    where tbl_categoria.nombre = 'terror';