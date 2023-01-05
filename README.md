<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. Clonar el repositorio
2. Ejecutar el siguiente comando para instalar las dependencias necesarias:

```
yarn install
```

3. Tener Nest CLI instalado

```
npm i -g @nestjs/cli
```

4.  Levantar la base de datos con el siguiente comando:

```
docker-compose up -d
```

5. Recargar la DB con el SEED en desarrollo

```
http://localhost:3000/api/v2/seed
```

## Stack usado

- MongoDB
- Nest JS
- Docker
- Axios