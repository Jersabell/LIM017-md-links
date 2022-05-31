import { readRoute, getListOfFiles, readEachFile, analizeLinks } from "./md-links.js"

export const mdLinks = (path, options) => {
  return new Promise((resolve, reject) =>{
    
    const ruteChecked = readRoute(path);
    if (ruteChecked){
      const array = getListOfFiles(ruteChecked)
      if(array.length){
        const fileChecked = readEachFile(array)
        if (fileChecked.length){
        options.validate ? resolve(analizeLinks(fileChecked)) : resolve(fileChecked)
        }
        else{
          reject(new Error('No se encontraron links'))
        }
      } else {
        reject(new Error('No .md files to analyze'))
      }
    } else { reject(new Error(`The path don't exists`))}
    
  })
}

// mdLinks('./Documents', {validate: true}).then((res) => console.log(res)).catch((err) => console.log('algo anda mal ;V'))
// mdLinks('./Documents/refers.md', {validate: false}).then((res) => console.log(res)).catch((err) => console.log(err))