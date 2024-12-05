## Restricciones PostgreSQL
Las restricciones sirven para garantizar la exactitud de los datos.

| Constraint | Descripción |
|---------|-------------|
| DEFAULT | Valor por defecto al insertar un registro |
| NOT NULL | El campo no puede tener el valor NULL |
| UNIQUE | Dos registros no pueden tener el mismo valor en un campo |
| CHECK | Se especifican los valores que acepta un campo |
| PRIMARY KEY | Identifica de forma única cada registro |
| FOREIGN KEY | Campo que relaciona dos tablas |


## Unión entre tablas

La instrucción de JOIN se usa para enlazar los datos de dos tablas relacionadas a través de algún campo en común (“foreign key”) y así dar como resultado filas que mezclan datos provenientes de las dos (o más) tablas.

![alt text](image-9.png)

| Tipo | Descripción |
| INNER JOIN | Devuelve sólo los registros que coinciden con la condición de unión en ambas tablas |
| LEFT JOIN | Devuelve todas las filas de la tabla izquierda, incluso si no se han encontrado filas coincidentes en la tabla derecha. Si no hay coincidencias en la tabla derecha, la consulta devolverá valores NULL para esas columnas |
| RIGHT JOIN | Devuelve todas las filas de la tabla derecha. Si no hay coincidencias en la tabla izquierda, se devuelven valores NULL para esas columnas |
| FULL JOIN | Devuelve todas las filas de ambas tablas |


## Ejercicios para clase

_1. Una librería almacena la información de sus libros para la venta en dos tablas, "libros" y "editoriales"._
- Realizamos un JOIN para obtener datos de ambas tablas (titulo, autor y nombre de la editorial)
- Mostramos el código del libro, título, autor, nombre de la editorial y su dirección realizando un join y empleando alias
- Realizamos la misma consulta anterior agregando un "where" para obtener solamente los libros de la editorial "Siglo XXI"
- Obtenemos título, autor y nombre de la editorial, esta vez ordenados por título

_2. Una biblioteca registra la información de sus libros en una tabla llamada "libros", los datos de sus socios en "socios" y los préstamos en una tabla "prestamos". En la tabla "prestamos" se hace referencia al libro y al socio que lo solicita colocando un código que los identifique._

- Consulta para obtener los préstamos donde se vea la fecha del préstamo, el nombre del libro y el nombre del socio. Debe devolver SOLO coincidencias.
- Consulta para obtener los préstamos donde se vea la fecha del préstamo, el nombre del libro y el nombre del socio. Debe devolver TODOS los registros de préstamos.


