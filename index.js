import {
  readRoute, getListOfFiles, readEachFile, analizeLinks,
} from './md-links.js';

export const mdLinks = (path, options) => new Promise((resolve, reject) => {
  const ruteChecked = readRoute(path);
  if (ruteChecked) {
    const array = getListOfFiles(ruteChecked);
    if (array.length) {
      const fileChecked = readEachFile(array);
      if (fileChecked.length) {
        // eslint-disable-next-line no-unused-expressions
        options.validate ? resolve(analizeLinks(fileChecked)) : resolve(fileChecked);
      } else {
        reject(new Error('No links found'));
      }
    } else {
      reject(new Error('No .md files to analyze'));
    }
  } else { reject(new Error('The path no exists')); }
});
