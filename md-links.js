// librería file system
import fs from 'fs'
// librería path
import path from 'path'

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
// console.log(getListOfFiles('./Documents/First Dir/Two'))

export function readEachFile(files){
    const arr = files.length
    if(!arr) {return false}
    const end = files.forEach((file) =>{
        console.log(file + ':', readFile(file))
    })
    return end
}


readEachFile(getListOfFiles('./Documents'))



// getListOfFiles('./Documents').forEach((file) =>{
//   console.log(readFile(file))
// })


// function readD (route) {
//   // convirtiendo a ruta absoluta
//   const routeAbs = path.resolve(route);
//   console.log(routeAbs)
//   // la ruta existe o no existe
//   const exist = fs.existsSync(routeAbs) ? true : console.log('The path no exists.'); 
// return exist
// };

// readD('./Documents/refervds.md')



