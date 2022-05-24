// librería file system
import fs from 'fs'
// librería path
import path from 'path'
// librería fetch
import fetch from 'cross-fetch';
// librría chalk
// import chalk from 'chalk';


// comprueba si la ruta es absoluta
export const absoluteRoute = (route) => path.isAbsolute(route);

// convirtiendo la ruta en absoluta del directorio actual
export const convertingToAbs = (route) => path.resolve(route);

// si existe ruta, sincronico
export const existRoute = (route) => fs.existsSync(route);

// es directorio
const directory = (route) => fs.lstatSync(route).isDirectory();

// es file
const file = (route) => fs.lstatSync(route).isFile();

// extensión del file
const isFileMD = (route) => path.extname(route) === '.md';

// leer directorio sincronico
const readDir = (route) => fs.readdirSync(route);

// lee archivos con READFILE asincrónico
const readFile = (route) => fs.readFileSync(route, 'utf8');


//  Verifica la ruta, la convierte a absoluta y devulve la ruta si existe 
export function readRoute (route) {
  const routeAbsolute = convertingToAbs(route);
  const exist = existRoute(routeAbsolute) ? routeAbsolute : console.log('The path no exists.'); 
return exist
};

// Devuelve array de rutas de archivos .md
export function getListOfFiles(route) {
  let arrOfFiles = [];
  if (file(route) && isFileMD(route)) {
      arrOfFiles.push(route);
    }
  else if (directory(route)) {
    const files = readDir(route);
      files.forEach((file) => {
        const newRoute = path.join(route, file);
        const reading = getListOfFiles(newRoute);  
        arrOfFiles = reading.concat(arrOfFiles)
    })
  }
  return arrOfFiles
}
// console.log(getListOfFiles('./Documents'))

// función que lee cada archivo y devulve un array de objetos de tres propiedades
// const filesArr = [
//   'C:/Users/USUARIO/Documents/Jersabell/Proyectos/LIM017-md-links/Documents/refers.md',
//   'C:/Users/USUARIO/Documents/Jersabell/Proyectos/LIM017-md-links/Documents/new-file/fff.md'
// ]
export function readEachFile(filesArr){
    // const arr = filesArr.length
    // if(!arr) {return false}
    
    let dataOfLinks= []
    filesArr.forEach((file) =>{
      const regularExpression = /\[.*\]\((\s+)?(https?:\/\/)(.*?)\)/g;
      const text = /\[.*\]/g;
      const url = /https?:\/\/(.*)(\s)?\)/g;
      const fileChecked = readFile(file)
      const getLinks = fileChecked.match(regularExpression);
      if (getLinks) {
        getLinks.forEach((data) => {
          dataOfLinks.push({
            file: file,
            href: data.match(url).toString().slice(0, -1).trim(),
            text: data.match(text) !== null ? data.match(text).toString().slice(1, -1).slice(0, 50) : 'Text not found',
          });
        });
      } else {
        console.log('no se encontró links');
      }
    });
    return dataOfLinks;
  };

// console.log(readEachFile(filesArr))



// función fetch para links devulve un array de objetos con 5 propiedades

export function analizeLinks(dataLinks){
  const arrOfPromises = dataLinks.map((obj) => {
    return fetch(obj.href)
    .then(res => {
      if (res.status >= 400) {
        obj.status = res.status
        obj.message = 'fail'
      }
      else if (res.status >= 200 && res.status < 400) {
        obj.status = res.status
        obj.message = 'ok'
      }
      return obj
    })
    .catch(err => {
      console.error(err, obj.href);
    })
  })
  return Promise.all(arrOfPromises)
}
// analizeLinks(readEachFile(filesArr)).then((res) => console.log(res));





  // console.log(chalk.bgMagenta('Hello world!'));
  // console.log(chalk.underline('delineado'))
  // console.log(chalk.blue('Hello', 'World!', 'Foo', 'bar', 'biz', 'baz'))
  // console.log((`
  // CPU: ${chalk.red('90%')}
  // RAM: ${chalk.green('40%')}
  // DISK: ${chalk.yellow('70%')}
  // `))

// function getLinkChecked(link){
//   const strg = link
// // const strg = '     https://nodejs.org/api/path.html    '
// const noneWhiteSpace = strg.trim();
// if(noneWhiteSpace.substr(0,8) === 'https://' || noneWhiteSpace.substr(0,7) === 'http://'){
//   return true
// }
// console.log('no hay links')
// }
// console.log(getLinkTrue('     https://nodejs.org/api/path.html    '))



