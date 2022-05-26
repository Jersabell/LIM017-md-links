import { readRoute, getListOfFiles, readEachFile, analizeLinks } from "./md-links.js"

export const mdLinks = (path, options) => {
  return new Promise((resolve, reject) =>{
    const ruteChecked = readRoute(path);
    if (ruteChecked){
      const array = getListOfFiles(ruteChecked)
      if(array.length){
        const fileChecked = readEachFile(array)
        options && options !== '--stat'? resolve(analizeLinks(fileChecked)) : resolve(fileChecked)
      } else {
        reject(new Error('no hay archivos .md para analizar'))
      }
    } else { reject(new Error('la ruta no existe'))}
    
  })
}

// mdLinks('./Documents', 'validate').then((res) => console.log(res)).catch((err) => console.log('algo anda mal ;V'))
// mdLinks('./Documents/refers.md').then((res) => console.log(res)).catch((err) => console.log(err))