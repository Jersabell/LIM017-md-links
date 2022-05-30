import { absoluteRoute, convertingToAbs, existRoute } from '../md-links.js';
import { readRoute, getListOfFiles, readEachFile, analizeLinks, stat } from '../md-links.js'


jest.mock('cross-fetch')
// jest.mock('chalk')


const resultOfReadEachFile = [
  {
    file: 'C:\\Users\\USUARIO\\Documents\\Jersabell\\Proyectos\\LIM017-md-links\\Documents\\refers.md',
    href: 'https://docs.npmjs.com/cli/install',
    text: 'docs oficiales de `npm install` acá'
  },
  {
    file: 'C:\\Users\\USUARIO\\Documents\\Jersabell\\Proyectos\\LIM017-md-links\\Documents\\refers.md',
    href: 'https://github.com/Laboratoria/course-parser',
    text: '`course-parser`'
  },
  {
    file: 'C:\\Users\\USUARIO\\Documents\\Jersabell\\Proyectos\\LIM017-md-links\\Documents\\refers.md',
    href: 'https://www.npmjs.com/package/jersabell-jersabell',
    text: 'facebok face'
  }
]


const resultOfAnalizeLinks = [
  {
    file: 'C:\\Users\\USUARIO\\Documents\\Jersabell\\Proyectos\\LIM017-md-links\\Documents\\refers.md',
    href: 'https://docs.npmjs.com/cli/install',
    text: 'docs oficiales de `npm install` acá',
    status: 200,
    message: 'ok',
    icon: '✔'
  },
  {
    file: 'C:\\Users\\USUARIO\\Documents\\Jersabell\\Proyectos\\LIM017-md-links\\Documents\\refers.md',
    href: 'https://github.com/Laboratoria/course-parser',
    text: '`course-parser`',
    status: 200,
    message: 'ok',
    icon:  '✔'
  },
  {
    file: 'C:\\Users\\USUARIO\\Documents\\Jersabell\\Proyectos\\LIM017-md-links\\Documents\\refers.md',
    href: 'https://www.npmjs.com/package/jersabell-jersabell',
    text: 'facebok face',
    status: 404,
    message: 'fail',
    icon: '✖'
  }
]

describe('mdLinks', () => {
  const absoluteRuteTest = 'C:\\Users\\USUARIO\\Documents\\Jersabell\\Proyectos\\LIM017-md-links\\Documents';
  const relativeRouteTest= './Documents'
  const routeFalse = './Documentsnotexisted'
  const arrOfRuotes = ['C:\\Users\\USUARIO\\Documents\\Jersabell\\Proyectos\\LIM017-md-links\\Documents\\refers.md']
  const arrOfRuotesFalse = ['C:\\Users\\USUARIO\\Documents\\Jersabell\\Proyectos\\LIM017-md-links\\Documents\\First Dir\\empty.md']
  // testing absoluteRoute
  it('ruta absoluta es true', () => {
    expect(absoluteRoute(absoluteRuteTest)).toBe(true);
  });
  it('ruta absoluta es false', () => {
    expect(absoluteRoute(relativeRouteTest)).toBe(false);
  });
  // testing convertingToAbs
  it('convierte a ruta absoluta', () => {
    expect(convertingToAbs(absoluteRuteTest)).toEqual(absoluteRuteTest);
  });
  // testing existRoute
  it('existe ruta es true', () => {
    expect(existRoute(absoluteRuteTest)).toBe(true)
  });
  it('existe ruta es false', () => {
    expect(existRoute(routeFalse)).toBe(false)
  });
  // funcion readRoute, Verifica la ruta, la convierte a absoluta y devulve la ruta si existe
  it('devulve true: ruta existente en absoluta', () => {
    expect(readRoute(relativeRouteTest)).toBe(absoluteRuteTest)
  });
  // function getListOfFiles, que devuelve el array de rutas de archivos .md
  it('devuelve array de rutas', () => {
    expect(getListOfFiles(absoluteRuteTest)).toContain("C:\\Users\\USUARIO\\Documents\\Jersabell\\Proyectos\\LIM017-md-links\\Documents\\First Dir\\One\\readme.md")
  });
  it('devuelve un array vacío cuando el dir está vacío', () => {
    expect(getListOfFiles('C:\\Users\\USUARIO\\Documents\\Jersabell\\Proyectos\\LIM017-md-links\\Documents\\First Dir\\Two')).toEqual([])
  });
  // function readEachFile, que devuelve el array de rutas de archivos .md --------->no funciona
  it('devuelve array de objts con text, href y file', () => {
    expect(readEachFile(arrOfRuotes)).toEqual(resultOfReadEachFile)
  });
  it('devuelve array vacío', () => {
    expect(readEachFile(arrOfRuotesFalse)).toEqual([])
  });
  // function analizeLinks
  // it('analiza links', () => {
  //   analizeLinks(resultOfReadEachFile).then((res) => {
  //   expect(stat(resultOfReadEachFile)).toEqual(resultOfAnalizeLinks);
  //   })
  // });
  // function stat
  it('devuelve el conteo de los links', () => {
    expect(stat(resultOfAnalizeLinks)).toEqual({Total: 3, Unique: 3, Broken: 1});
    expect(stat(resultOfReadEachFile)).toEqual({Total: 3, Unique: 3});
    })
});
