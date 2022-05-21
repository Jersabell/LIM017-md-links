// librería file system
import fs from 'fs'
// librería path
import path from 'path'
// librería de npm para leer links
import markdownLinkExtractor from 'markdown-link-extractor'

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

// const linksReaded= readFile('./README.md')
// const abc = markdownLinkExtractor(linksReaded)
// abc.forEach((link) => console.log(link))

//  Verifica la ruta, la convierte a absoluta y devulve la ruta si existe 
function readRoute (route) {
  const routeAbsolute = path.resolve(route);
  const exist = fs.existsSync(routeAbsolute) ? route : console.log('The path no exists.'); 
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

// función que lee cada archivo
const filesArr = [
  'C:/Users/USUARIO/Documents/Jersabell/Proyectos/LIM017-md-links/README.md',
  'C:/Users/USUARIO/Documents/Jersabell/Proyectos/LIM017-md-links/Documents/refers.md'  
]
export function readEachFile(filesArr){
    const arr = filesArr.length
    if(!arr) {return false}
    const readingEachFile = filesArr.forEach((file) =>{
        const fileChecked = readFile(file)
        const allLinks = markdownLinkExtractor(fileChecked)
        const linksChecked = allLinks.filter((link)=>{
          const noneWhiteSpace = link.trim()
          return noneWhiteSpace.substr(0,8) === 'https://'|| noneWhiteSpace.substr(0,7) === 'http://'
        })
        return console.log(file, linksChecked)
    })
    return readingEachFile
}
readEachFile(filesArr)

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




