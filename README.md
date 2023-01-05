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

5. Clonar el archivo **.env.template** y renombrar la copia a **.env**

6. Llenar las variables de entorno definidas en el **.env**

7. Ejecutar la aplicación de desarrollo con el comando:

```
yarn start:dev
```

8. Recargar la DB con el SEED en desarrollo

```
http://localhost:3000/api/v2/seed
```

# Ejecutar en producción

1. Crear el archivo **.env.prod**

2. Llenar las varaibles de entorno de producción

3. Construir la nueva imagen de docker con el siguiente comando:

```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```

4. Para correr nuevamente la imagen de docker lo podemos hacer con este comando si no hemos hecho ningun cambio:

```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up -d
```

## Nota

Por defecto, **docker-compose** usa el archivo **.env**, por lo que si tienen el archivo **.env** y lo configuran con sus variables de entorno de producción, bastaría con:

```
docker-compose -f docker-compose.prod.yaml up --build
```

## Stack usado

- MongoDB
- Nest JS
- Docker
- Axios

## 🌎 API en producción

- https://pokedex-nest.up.railway.app/
