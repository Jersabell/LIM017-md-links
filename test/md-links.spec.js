import { absoluteRoute, convertingToAbs, existRoute } from '../md-links.js';
import { getListOfFiles, readEachFile } from '../md-links.js'


describe('mdLinks', () => {
  const absoluteRuteTest = 'C:\\Users\\USUARIO\\Documents\\Jersabell\\Proyectos\\LIM017-md-links\\Documents';
  const relativeRouteTest= './Documents'
  const routeFalse = './Documentsnotexisted'
  const arrOfRuotes = ['C:\\Users\\USUARIO\\Documents\\Jersabell\\Proyectos\\LIM017-md-links\\Documents\\First Dir\\One\\readme.md',
  'C:\\Users\\USUARIO\\Documents\\Jersabell\\Proyectos\\LIM017-md-links\\Documents\\refers.md']
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
  // function getListOfFiles, que devuelve el array de rutas de archivos .md
  it('devuelve array de rutas', () => {
    expect(getListOfFiles(absoluteRuteTest)).toContain("C:\\Users\\USUARIO\\Documents\\Jersabell\\Proyectos\\LIM017-md-links\\Documents\\First Dir\\One\\readme.md")
  });
  it('devuelve un array vacío cuando el dir está vacío', () => {
    expect(getListOfFiles('C:\\Users\\USUARIO\\Documents\\Jersabell\\Proyectos\\LIM017-md-links\\Documents\\First Dir\\Two')).toEqual([])
  });
  // function getListOfFiles, que devuelve el array de rutas de archivos .md --------->no funciona
  // it('lee los archivos', () => {
  //   expect(readEachFile(arrOfRuotes)).toEqual('Con el comando `npm install githubname/reponame` podemos instalar directamente')
  // });
});
