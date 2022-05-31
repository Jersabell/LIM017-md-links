/* eslint-disable jest/no-conditional-expect */
import { mdLinks } from '../index.js';

jest.mock('cross-fetch', () =>
  // Mock the default export
  // eslint-disable-next-line implicit-arrow-linebreak
  ({
    __esModule: true,
    default: jest.fn(),
  }));

const routeFalse = './Documentsnotexisted';
const routeNoMd = 'C:\\Users\\USUARIO\\Documents\\Jersabell\\Proyectos\\LIM017-md-links\\Documents\\second';
const routeNoLinks = 'C:\\Users\\USUARIO\\Documents\\Jersabell\\Proyectos\\LIM017-md-links\\Documents\\new-file\\fff.md';
const routeValid = 'C:\\Users\\USUARIO\\Documents\\Jersabell\\Proyectos\\LIM017-md-links\\Documents\\refers.md';
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
    href: 'http://community.laboratoria.la/c/js',
    text: 'labo fail0',
    status: 404,
    message: 'fatal error⚠️ ',
    icon: '✖',
  },
];

describe('index', () => {
  it('mdLinks catch: the path no exists', () => mdLinks(routeFalse)
    .catch((err) => {
      expect(err).toEqual(Error('The path no exists'));
    }));
  it('mdLinks catch: No .md files to analyze', () => mdLinks(routeNoMd).catch((err) => {
    expect(err).toEqual(Error('No .md files to analyze'));
  }));
  it('mdLinks catch: No links found', () => mdLinks(routeNoLinks).catch((err) => {
    expect(err).toEqual(Error('No links found'));
  }));
  it('mdLinks resolve: lee links, validate:false', () => mdLinks(routeValid, { validate: false }).then((res) => {
    expect(res).toEqual(resultOfReadEachFile);
  }));
  it('mdLinks resolve: lee links(fetch), validate:true', () => mdLinks(routeValid, { validate: true }).then((res) => {
    expect(res).toEqual(resultOfAnalizeLinks);
  }));
});
