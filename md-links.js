/* eslint-disable no-param-reassign */

// librería file system
import fs from 'fs';
// librería path
import path from 'path';
// librería fetch
import fetch from 'cross-fetch';

// comprueba si la ruta es absoluta
export const absoluteRoute = (route) => path.isAbsolute(route);

// convirtiendo la ruta en absoluta del directorio actual
export const convertingToAbs = (route) => path.resolve(route);

// si existe ruta, sincronico
export const existRoute = (route) => fs.existsSync(route);

// es directorio
const directory = (route) => fs.lstatSync(route).isDirectory();

// es file
const isfile = (route) => fs.lstatSync(route).isFile();

// extensión del file
const isFileMD = (route) => path.extname(route) === '.md';

// leer directorio sincronico
const readDir = (route) => fs.readdirSync(route);

// lee archivos con READFILE asincrónico
const readFile = (route) => fs.readFileSync(route, 'utf8');

//  Verifica la ruta, la convierte a absoluta y devulve la ruta si existe
export function readRoute(route) {
  const routeAbsolute = convertingToAbs(route);
  const exist = existRoute(routeAbsolute) ? routeAbsolute : false;
  return exist;
}

// Devuelve array de rutas de archivos .md
export function getListOfFiles(route) {
  let arrOfFiles = [];
  if (isfile(route) && isFileMD(route)) {
    arrOfFiles.push(route);
  } else if (directory(route)) {
    const files = readDir(route);
    files.forEach((file) => {
      const newRoute = path.join(route, file);
      const reading = getListOfFiles(newRoute);
      arrOfFiles = reading.concat(arrOfFiles);
    });
  }
  return arrOfFiles;
}

// función que lee cada archivo y devulve un array de objetos de tres propiedades
export function readEachFile(filesArr) {
  const dataOfLinks = [];
  filesArr.forEach((file) => {
    const regularExpression = /\[.*\]\((\s+)?(https?:\/\/)(.*?)\)/g;
    const text = /\[.*\]/g;
    const url = /https?:\/\/(.*)(\s)?\)/g;
    const fileChecked = readFile(file);
    const getLinks = fileChecked.match(regularExpression);
    if (getLinks) {
      getLinks.forEach((data) => {
        dataOfLinks.push({
          file,
          href: data.match(url).toString().slice(0, -1).trim(),
          text: data.match(text) !== null ? data.match(text).toString().slice(1, -1).slice(0, 50) : 'Text not found',
        });
      });
    }
  });
  return dataOfLinks;
}

// función fetch para links devulve un array de objetos con 5 propiedades
export function analizeLinks(dataLinks) {
  const arrOfPromises = dataLinks.map((obj) => fetch(obj.href)
    .then((res) => {
      if (res.status >= 400) {
        obj.status = res.status;
        obj.message = 'fail';
        obj.icon = '✖';
      } else if (res.status >= 200 && res.status < 400) {
        obj.status = res.status;
        obj.message = 'ok';
        obj.icon = '✔';
      }
      return obj;
    })
    .catch(() => {
      // eslint-disable-next-line no-unused-expressions
      obj.icon = '✖';
      obj.status = 'Status no found';
      obj.message = 'fatal error⚠️ ';
      return obj;
    }));
  return Promise.all(arrOfPromises);
}

// stat recibe el objeto y hace estadísticas
// eslint-disable-next-line consistent-return
export function stat(arrofObjts) {
  const elemts = arrofObjts.map((objt) => objt.status);
  // eslint-disable-next-line no-unreachable-loop
  for (let i = 0; i < elemts.length; i + 1) {
    if (elemts[i] !== undefined) {
      const links = arrofObjts.map((objt) => objt.href);
      const linksTotal = links.length;
      const arrLinksUnique = [...new Set(links)];
      const linksUnique = arrLinksUnique.length;
      const newArr = elemts.filter((status) => status > 399);
      const broquenLinks = newArr.length;
      const toConsole = { Total: linksTotal, Unique: linksUnique, Broken: broquenLinks };
      return toConsole;
    }
    const links = arrofObjts.map((objt) => objt.href);
    const linksTotal = links.length;
    const arrLinksUnique = [...new Set(links)];
    const linksUnique = arrLinksUnique.length;
    const toConsole = { Total: linksTotal, Unique: linksUnique };
    return toConsole;
  }
}
const resultOfReadEachFile = [
  {
    file: 'C:\\Users\\USUARIO\\Documents\\Jersabell\\Proyectos\\LIM017-md-links\\Documents\\refers.md',
    href: 'https://docs.npmjs.com/cli/install',
    text: 'docs oficiales de `npm install` acá',
  },
  {
    file: 'C:\\Users\\USUARIO\\Documents\\Jersabell\\Proyectos\\LIM017-md-links\\Documents\\refers.md',
    href: 'https://github.com/Laboratoria/course-parser',
    text: '`course-parser`',
  },
  {
    file: 'C:\\Users\\USUARIO\\Documents\\Jersabell\\Proyectos\\LIM017-md-links\\Documents\\refers.md',
    href: 'https://www.npmjs.com/package/jersabell-jersabell',
    text: 'facebok face',
  },
  {
    file: 'C:\\Users\\USUARIO\\Documents\\Jersabell\\Proyectos\\LIM017-md-links\\Documents\\refers.md',
    href: 'http://community.laboratoria.la/c/js',
    text: 'labo fail0',
  },
];

const resultOfAnalizeLinks = [
  {
    file: 'C:\\Users\\USUARIO\\Documents\\Jersabell\\Proyectos\\LIM017-md-links\\Documents\\refers.md',
    href: 'https://docs.npmjs.com/cli/install',
    text: 'docs oficiales de `npm install` acá',
    status: 200,
    message: 'ok',
    icon: '✔',
  },
  {
    file: 'C:\\Users\\USUARIO\\Documents\\Jersabell\\Proyectos\\LIM017-md-links\\Documents\\refers.md',
    href: 'https://github.com/Laboratoria/course-parser',
    text: '`course-parser`',
    status: 200,
    message: 'ok',
    icon: '✔',
  },
  {
    file: 'C:\\Users\\USUARIO\\Documents\\Jersabell\\Proyectos\\LIM017-md-links\\Documents\\refers.md',
    href: 'https://www.npmjs.com/package/jersabell-jersabell',
    text: 'facebok face',
    status: 404,
    message: 'fail',
    icon: '✖',
  },
  {
    file: 'C:\\Users\\USUARIO\\Documents\\Jersabell\\Proyectos\\LIM017-md-links\\Documents\\refers.md',
    href: 'https://www.npmjs.com/package/jersabelld-jersabelld',
    text: 'facebok new',
    status: 'Status no found',
    message: 'fatal error⚠️ ',
    icon: '✖',
  },
];
stat(resultOfAnalizeLinks);
// const aaa = [undefined, undefined, undefined];
// if (aaa !== undefined) {
//   console.log('aaaaaaaaaaaaaaaaaa');
// } else { console.log('-.-'); }
