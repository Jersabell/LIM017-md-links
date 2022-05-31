// librería file system
import fs from 'fs'
// librería path
import path from 'path'
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
  const exist = existRoute(routeAbsolute) ? routeAbsolute : false; 
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

// función que lee cada archivo y devulve un array de objetos de tres propiedades
export function readEachFile(filesArr){
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
      } 
    });
    return dataOfLinks;
  };
//   const probando= readEachFile(["C:\\Users\\USUARIO\\Documents\\Jersabell\\Proyectos\\LIM017-md-links\\Documents\\new-file\\fff.md"]);
// if(probando.length){console.log('yes')} else {console.log('no')}

// función fetch para links devulve un array de objetos con 5 propiedades
export function analizeLinks(dataLinks){
  const arrOfPromises = dataLinks.map((obj) => {
    return fetch(obj.href)
    .then(res => {
      // console.log('aaa', obj.href, res.status)
      if (res.status >= 400) {
        obj.status = res.status
        obj.message = 'fail'
        obj.icon = '✖'
      }
      else if (res.status >= 200 && res.status < 400) {
        obj.status = res.status
        obj.message = 'ok'
        obj.icon = '✔'
      } 
      return obj
    })
    .catch((err) => {
      {
        obj.icon ='✖',
        obj.status= 404,
        obj.message = 'fatal error⚠️ '
        // obj.error =` Error: ${err.message}`
      }
      return obj}
    )
  })
  return Promise.all(arrOfPromises)
}

// stat recibe el objeto y hace estadísticas 
export function stat(arrofObjts){
  const elemts = arrofObjts.map(objt=>objt.status)
  for(let i = 0; i<elemts.length; i++){
      if(elemts[i] !== undefined){
          const links = arrofObjts.map((objt) => objt.href)
          const linksTotal = links.length;
          const arrLinksUnique = [...new Set(links)];
          const linksUnique = arrLinksUnique.length;
          const newArr = elemts.filter((status) => status > 399)
          const broquenLinks = newArr.length
          const toConsole = {Total: linksTotal, Unique: linksUnique, Broken: broquenLinks};
          return toConsole
      }
      const links = arrofObjts.map((objt) => objt.href)
      const linksTotal = links.length;
      const arrLinksUnique = [...new Set(links)];
      const linksUnique = arrLinksUnique.length;
      const toConsole = {Total: linksTotal, Unique: linksUnique};
      return toConsole
  }
}



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

// fetch('http://community.laboratoria.la/c/js')
//   .then(res => {
//     if (res.status >= 400) {
//       throw new Error("Bad response from server");
//     }
//     return res;
//   })
//   .then(user => {
//     console.log(user);
//   })
//   .catch(err => {
//     console.error(err);
//   });