# Proyecto Node.js con Fastify y PostgreSQL

Este proyecto utiliza Node.js junto con Fastify como servidor web y PostgreSQL como base de datos, utilizando Prisma para la gestión de la base de datos. Se ha seguido una arquitectura hexagonal con vertical slicing para una mayor modularidad

## Pasos para Configuración y Ejecución
### 1. Clonar el Repositorio
git clone https://github.com/jjaavvii0/fastify-hex
cd fastify-hex

### 2. Instalar las Dependencias
npm install

### 3. Configurar Variables de Entorno
-Renombra el archivo .env.example a .env

### 4. Preparar Prisma y la Base de Datos
-Cambia lo que necesites del archivo .env para que coincida con tu entorno local:
EJEMPLO-> DATABASE_URL="postgresql://usuario:contraseña@host:puerto/nombre_db"  

-Crear la base de datos. Desde la línea de comandos de PostgreSQL:
psql -U usuario -c "CREATE DATABASE nombre_db;"
(Cambia usuario por tu usuario de PostgreSQL y nombre_db por el nombre que quieras para tu base de datos, en este caso: asafe_db, como está establecido en el archivo .env)

-Ejecuta las migraciones de Prisma para configurar la estructura de la base de datos: 
npm run prisma:migrate

-Luego, genera el cliente de Prisma para interactuar con la base de datos: 
npm run prisma:generate

### 5. Iniciar el Servidor
-Para iniciar el servidor en modo de desarrollo:
npm run dev

Puedes ver la documentación en esta URL: http://localhost:3000/documentation

## Para probar la API, sigue estos pasos:
### (1) Crear un usuario
Ruta: POST:/api/users
Usa esta ruta para crear un usuario en la base de datos.

### (2) Logear usuario
Ruta: POST:/api/auth
Utiliza esta ruta para autenticar el usuario y obtener el token de acceso (access_token).

### (3) Autorizar en Swagger
Haz clic en el botón "Authorize" en la parte superior derecha de la interfaz de Swagger.
Pega el access_token obtenido en el paso anterior.
El token de acceso es similar a este ejemplo: eyJhbGciOiJIUzxxxasjhdasjodhsadhbasdiashdiosahbdsaxxxxxxxxx

### (4) Operaciones con el Usuario y Posts
Una vez autorizado, podrás realizar todas las operaciones relacionadas con tu usuario y sus publicaciones.
-------------------------------------------------------------------------------------------------------------------------------------------------------------------
Dado que la creación de usuarios "admin" no está permitida mediante las rutas de la API, puedes crear un usuario admin directamente en PostgreSQL siguiendo estos pasos:
### (1) Conéctate a PostgreSQL
Abre la terminal y conéctate a la base de datos con el comando: psql -U nombre_usuario -d nombre_base_datos
Asegúrate de reemplazar nombre_usuario por el nombre de tu usuario en PostgreSQL y nombre_base_datos por el nombre de la base de datos configurado en el paso 4.

### (2) Ejecuta la Consulta para Crear el Usuario "admin"
Una vez dentro de la consola de PostgreSQL, ejecuta la siguiente consulta SQL: INSERT INTO "User" (email, name, password, roles, "createdAt", "updatedAt") VALUES ('admin@mail.com', 'adminName', '$2b$10$Xwx2J.VLyuPdV.xkyfF/ququae55bn2wKRN1PSAaGReb/W.y/XJq6', '{admin}', NOW(), NOW());
Esto creará un usuario con el correo admin@mail.com y la contraseña 123456.
Asegúrate de que en tu archivo .env la variable SALT_ROUNDS esté configurada en 10 para que la contraseña se haya hasheado correctamente con el mismo número de rondas.

Con esto, habrás creado un usuario con rol de "admin" que podrás usar para acceder a todas las funcionalidades administrativas en tu API.


## (Opcional) Ejecutar pruebas
-Para ejecutar las pruebas, utiliza:
npm run test

## (Opcional) Compilar el Proyecto
-Para compilar el proyecto de TypeScript a JavaScript: 
npm run build

-Luego, para iniciar el servidor en modo producción:
npm run start