# MySQL Script Docker

Proyecto de ejemplo que levanta una base de datos MySQL con Docker, la administra opcionalmente mediante phpMyAdmin y expone un catalogo de productos usando una aplicacion Express y `mysql2`.

Los scripts de `database/` crean las tablas, configuran el usuario de la aplicacion y cargan categorias y productos de ejemplo.

## Requisitos

- Docker Desktop con Docker Compose
- Node.js y npm

## Como levantar el proyecto

1. Inicia MySQL y phpMyAdmin:

   ```bash
   docker compose up -d
   ```

   Al crear el volumen por primera vez, Docker ejecuta automaticamente los scripts SQL de `database/`.

2. Instala las dependencias de Node.js:

   ```bash
   npm install
   ```

3. Inicia la aplicacion:

   ```bash
   npm start
   ```

4. Abre [http://localhost:3000](http://localhost:3000) para ver el catalogo.

## Servicios y credenciales

- Aplicacion Express: `http://localhost:3000`
- phpMyAdmin: [http://localhost:8080](http://localhost:8080)
- MySQL: `localhost:3306`
- Base de datos: `mydatabase`
- Usuario: `myuser`
- Contrasena: `mypassword`
- Contrasena de root: `root`

Para iniciar sesion en phpMyAdmin, usa `myuser` y `mypassword` o el usuario `root` con su contrasena.

## Variables de entorno

La aplicacion acepta estas variables opcionales:

```env
PORT=3000
DB_HOST=localhost
DB_USER=myuser
DB_PASSWORD=mypassword
DB_NAME=mydatabase
```

Si no se definen, la aplicacion usa esos mismos valores por defecto, excepto `DB_USER`, cuyo valor por defecto es `root`.

## Comandos utiles

Detener los servicios sin borrar los datos:

```bash
docker compose down
```

Detener los servicios y borrar el volumen para ejecutar de nuevo todos los scripts SQL desde cero:

```bash
docker compose down -v
docker compose up -d
```

Ejecutar la aplicacion en modo desarrollo con reinicio automatico:

```bash
npm run dev
```
