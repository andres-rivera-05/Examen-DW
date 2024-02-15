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

 INSERT INTO tbl_reserva(usuario_id, libro_id, fecha_reserva, fecha_devolucion)
 VALUES
 (1,3,'2024-02-15','2024-02-22');

 select * FROM tbl_reserva
 


  INSERT INTO tbl_reserva(usuario_id, libro_id, fecha_reserva, fecha_devolucion)
 VALUES
 (1,4,'2024-02-15','2024-02-22');


SELECT tbl_libro.*, tbl_reserva.* FROM tbl_libro JOIN tbl_reserva On tbl_libro.id = tbl_reserva.libro_id;

