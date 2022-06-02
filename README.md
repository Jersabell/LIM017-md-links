# Markdown Links
![](https://github.com/Jersabell/LIM017-md-links/blob/main/Documents/http.jpg?raw=true)

## Índice

* [1. Markdown Links](#1-markdown-links)
* [2. Instalación](#2-instalación)
* [3. Uso](#3-uso)
* [4. Herramientas y Librerias Utilizadas](#4-herramientas-y-librerías-utilizadas)
* [5. Autor](#5-autor)

***

## 1. Markdown Links

### ¿Qué es Markdown Links? 🔗
Es una librería que analiza archivos en formato Markdown (.md) y verifica si contiene links. De ser así, muestra su estado 200 (ok), 404 (fail) o status no encontrado (fatal error). También cuenta el total de links, los que son únicos y los que están rotos.

🇲🇩 Aquí [link de acceso](https://www.npmjs.com/package/md-links-jersabell) al package de npm.

## 2. Instalación ⚙️
Para utilizar Markdown Links debes tener instalado [Node.js](https://nodejs.org/en/) de forma previa. Luego debes ejecutar el siguiente comando en la terminal:

`$ npm install md-links-jersabell`

## 3. Uso 💻
Cuando quieres ver los links que contienen tus archivos .md tienes que ejecutar el siguiente comando en la terminal:

`$ md-links [path] [options]`
  - [path]: es la ruta absoluta o relativa del archivo o directorio.
  - [options]: son comandos que le puedes agregar para que haga distintas tareas.
  Por ejemplo:

```sh
$ md-links ./some/example.md
./some/example.md http://algo.com/2/3/ Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html algún doc
./some/example.md http://google.com/ Google
```

#### Options:
##### `--validate`
  Si pasamos la opción `--validate`, el módulo hará la petición HTTP para averiguar si el link funciona o no.
  Ejemplo:
  ```sh
$ md-links ./some/example.md --validate
./some/example.md http://algo.com/2/3/ ok 200 Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html fail 404 algún doc
./some/example.md http://google.com/ ok 301 Google
```
##### `--stats`
Si pasamos la opción `--stats` el output (salida) será un texto con estadísticas
básicas sobre los links.
Ejemplo:
```sh
$ md-links ./some/example.md --stats
Total: 3
Unique: 3
```

También puedes combinar `--stats` y `--validate` para obtener estadísticas que
necesiten de los resultados de la validación.
Ejemplo:
```sh
$ md-links ./some/example.md --stats --validate
Total: 3
Unique: 3
Broken: 1
```

## 4. Herramientas y Librerias Utilizadas 🛠️
- [Git y GitHub](https://github.com/Jersabell/LIM017-md-links) – Para el repositorio e issues.
- [Node](https://nodejs.org/en/) – Para el entorno de ejecución de JavaScript.
- [Cross Fetch](https://www.npmjs.com/package/cross-fetch) – Para hacer la petición HTTP de los links/urls.
- [Chalk](https://www.npmjs.com/package/chalk) – Para colorear y destacar los resultados de la ejecución.

## 5. Autor ⭐
- [Jersabell Tineo](https://github.com/Jersabell) - Front-end Developer.
