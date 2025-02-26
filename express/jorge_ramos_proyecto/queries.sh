# 3. Crear endpoints que ejecuten métodos CRUD (Create - POST, Read - GET, Update - PUT and Delete - DELETE) para cada recurso (users, teachers y students). 
cada recurso (users, teachers y students). 
curl -X GET http://localhost:3000/api/users
curl -X GET http://localhost:3000/api/users/1
curl -X POST http://localhost:3000/api/users -H "Content-Type: application/json" -d '{
  "email": "user@example.com",
  "password": "contrasena1234",
  "type": "user",
  "active": true
}'
curl -X PUT http://localhost:3000/api/users/4 \
-H "Content-Type: application/json" \
-d '{
  "email": "usuario3@ejemplo.com",
  "type": "user",
  "active": false
}'
curl -X DELETE http://localhost:3000/api/users/4
curl -X GET http://localhost:3000/api/teachers
curl -X GET http://localhost:3000/api/teachers/1
curl -X POST http://localhost:3000/api/teachers \
-H "Content-Type: application/json" \
-d '{
  "name": "Sabrina",
  "last_name": "Gonzalez",
  "user_id": 3,
  "dni": "48976123F",
  "date_of_birth": "1990-05-12"
}'
curl -X PUT http://localhost:3000/api/teachers/1 \
-H "Content-Type: application/json" \
-d '{
  "name": "Eliseo",
  "last_name": "Larmas",
  "user_id": 1,
  "dni": "46589132K",
  "date_of_birth": "1985-09-12"
}'
curl -X DELETE http://localhost:3000/api/teachers/3
curl -X GET http://localhost:3000/api/students
curl -X GET http://localhost:3000/api/students/1
curl -X POST http://localhost:3000/api/students \
-H "Content-Type: application/json" \
-d '{
  "name": "Pedro",
  "last_name": "Salinas",
  "date_of_birth": "2000-08-15",
  "teacher_id": 1,
  "dni": "79761023F"
}'
curl -X PUT http://localhost:3000/api/students/9 \
-H "Content-Type: application/json" \
-d '{
  "name": "Pedro",
  "last_name": "Salinas",
  "date_of_birth": "2000-08-15",
  "teacher_id": 2,
  "dni": "79761023F"
}'
curl -X DELETE http://localhost:3000/api/students/9

# 4. Restricciones en el CRUD: 
curl -X DELETE http://localhost:3000/api/users/1 # No permite borrar usuario con profesores asociados
curl -X DELETE http://localhost:3000/api/teachers/1 # No permite borrar profesor con estudiantes asociados

# 5. Crear el endpoint GET /api/teachers/:teacher_id/students que:
# ○ Compruebe que el profesor con teacher_id exista y su usuario asociado esté activo, en caso contrario devolver un mensaje 401 informando de ello.
# ○ Devuelva un json con todos los alumnos de ese profesor ordenados por fecha de nacimiento
curl -X GET http://localhost:3000/api/teachers/1/students
curl -X GET http://localhost:3000/api/teachers/3/students  # Se registra de nuevo a Sabrina como profesora(usuario no activo) y al hacer el curl lanza el mensaje de error esperado

# 6. Crear un endpoint POST y GET /api/users/:id/active que:
# ○ POST: Compruebe que el usuario exista y actualice el campo active a true, debe devolver todos los datos del usuario actualizado
# ○ GET: Compruebe que el usuario exista y devuelva únicamente el campo active
curl -X POST http://localhost:3000/api/users/3/active 
curl -X GET http://localhost:3000/api/users/1/active
curl -X GET http://localhost:3000/api/users/4/active 

# 7. Crear un endpoint GET /login que renderice la vista login.html que puedes encontrar en los materiales de la clase 6.
curl -X GET http://localhost:3000/login

# 8. Crear un endpoint POST /login que reciba dos campos en el body, un username y un password y busque si en la tabla users existe un usuario con el campo email igual al username enviado en el body. 
# Si existe el usuario y la contraseña de la base de datos es igual a la encriptación (bcrypt con promesas) del password enviado, setear una variable de sesión que indique que el usuario está logueado y otra con los datos del usuario sin la contraseña, si todo es correcto debe hacer un redirect a la página home. 
# Si el usuario no existe debe renderizar una página error-login.html informando de ello.
curl -X POST http://localhost:3000/login \
-H "Content-Type: application/json" \
-d '{
  "username": "admin@example.com",
  "password": "password1234"
}'
curl -X POST http://localhost:3000/login \
-H "Content-Type: application/json" \
-d '{
  "username": "usuario1@ejemplo.com",
  "password": "contrasenausuario"
}'

# 9. Crear un endpoint GET /users que renderice una vista users.html con el listado de todos los usuarios del sistema y un botón para hacer logout. 
# Este endpoint debe estar protegido para que sólo un usuario de tipo “admin” pueda acceder, en otro caso devolver una respuesta 401.
curl -X GET http://localhost:3000/users \
-H "Cookie: connect.sid=s%3AuNvdfPEepeoHj0oIlYajXQ_GmXFHYUnw.iqWI03VP6oKQ3EQO34Ndaf2HXeoji6sxNI0CWQkyOs8" # cookie obtenida al hacer login con admin, si no es admin, error acceso no autorizado

# 10. Crear un endpoint GET /home que compruebe si el usuario es de tipo “admin”, en ese caso, redirija al endpoint/users. 
# En otro caso, renderice una vista home.html con los datos del profesor asociado al usuario logueado y un botón para hacer logout.
curl -X GET http://localhost:3000/home \
-H "Cookie: connect.sid=s%3AuNvdfPEepeoHj0oIlYajXQ_GmXFHYUnw.iqWI03VP6oKQ3EQO34Ndaf2HXeoji6sxNI0CWQkyOs8" # cookie obtenida al hacer login con admin, redirecciona a users
curl -X GET http://localhost:3000/home \
-H "Cookie: connect.sid=s%3A_o9RLlnPPrpZBnqFweQBc_AVMjsJHtwx.PHUOk4E2mTb5VNDswABVSZs2Qae9wdzrEHEkjG8n9zg" # cookie obtenida al hacer login con usuario no admin, si no es usuario, error acceso no autorizado, si no tiene profesor asignado, error no tiene profesor asignado

# 11. Crear un endpoint POST /logout que elimine las variables de sesión de login y haga un redirect a /login
curl -X POST http://localhost:3000/logout \
-H "Cookie: connect.sid=s%3AuNvdfPEepeoHj0oIlYajXQ_GmXFHYUnw.iqWI03VP6oKQ3EQO34Ndaf2HXeoji6sxNI0CWQkyOs8"
curl -X POST http://localhost:3000/logout \
-H "Cookie: connect.sid=s%3A_o9RLlnPPrpZBnqFweQBc_AVMjsJHtwx.PHUOk4E2mTb5VNDswABVSZs2Qae9wdzrEHEkjG8n9zg"

# 12. Crear un endpoint POST /api/token que reciba dos campos en el body, un username y un password y busque si en la tabla existe un usuario con el email igual al username enviado. 
# Si existe el usuario y la contraseña de la base de datos es igual a la encriptación del password enviado, devuelva un json con un token JWT que contenga el username. 
# El tiempo de validez del JWT tiene que ser de 15 minutos.
curl -X POST http://localhost:3000/api/token \
-H "Content-Type: application/json" \
-d '{
  "username": "usuario2@ejemplo.com",
  "password": "contrasenausuario"
}'




