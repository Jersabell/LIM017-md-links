#!/usr/bin/env node

import chalk from 'chalk';
import process from 'node:process';
import { mdLinks } from './index.js';
import { stat } from './md-links.js';

// Resultado en la consola:
function showConsoleToValidate(arrofObjts){
    return arrofObjts.forEach((obj) => {
        if(obj.status && obj.message && obj.status<400){
            const final = `${chalk.bold.rgb(0, 187, 45)(obj.icon)} ${chalk.rgb(227, 255, 144)(obj.file)} ${chalk.rgb(190, 239, 255)(obj.href)} ${chalk.green(obj.message)} ${chalk.rgb(0, 187, 45)(obj.status)} ${chalk.rgb(52, 187, 233)(obj.text)}`
            return console.log(final)
        }
        else if(obj.status && obj.message && obj.status>399){
            const final = `${chalk.bold.hex('#ff0000')(obj.icon)} ${chalk.rgb(227, 255, 144)(obj.file)} ${chalk.rgb(190, 239, 255)(obj.href)} ${chalk.red(obj.message)} ${chalk.hex('#ff0000')(obj.status)} ${chalk.rgb(52, 187, 233)(obj.text)}`
            return console.log(final)
        }
        return console.log(`${chalk.rgb(227, 255, 144)(obj.file)} ${chalk.rgb(190, 239, 255)(obj.href)} ${chalk.rgb(52, 187, 233)(obj.text)}`)
    }
    )
}
// Process de Node
const path = process.argv[2];
const option1 = process.argv[3];
const option2 = process.argv[4];
const [a, b, ...options] = process.argv

if (options.includes('--validate') && !option2){
    mdLinks(path, {validate: true})
    .then((res) => showConsoleToValidate(res))
    .catch((err) => console.log(chalk.hex('#ff4040')(err)))
} 
else if (options.includes('--validate')&&(options.includes('--stat'))){
    mdLinks(path, {validate: true})
    .then((res) => {
        const resultOfStat = stat(res);
        for(const property in resultOfStat) {
            console.log(`${chalk.yellow(property)}: ${resultOfStat[property]}`);
          }
    })
    .catch((err) => console.log(chalk.hex('#ff4040')(err)))
} 
else if (options.includes('--stat') && !option2){
    mdLinks(path, {validate: false})
    .then((res) => {
        const resultOfStat = stat(res);
        for(const property in resultOfStat) {
            console.log(`${chalk.yellow(property)}: ${resultOfStat[property]}`);
        }
    })
    .catch((err) => console.log(chalk.hex('#ff4040')(err)))
} 
else if (path && !option1){
    mdLinks(path, {validate: false})
    .then((res) => {
        if(res.length > 0){return showConsoleToValidate(res)}
    })
    .catch((err) => console.log(chalk.hex('#ff4040')(err)))
} 
else {
    console.log(chalk.red('- Enter a correct command, please.'))
}
  




// function showConsoleToValidate(arrofObjts){
//     return arrofObjts.forEach((obj) => {
//         if(obj.status && obj.messagge && obj.status<400){
//             const final = `${chalk.bold.rgb(0, 187, 45)(obj.icon)} ${chalk.rgb(243, 255, 105)(obj.file)} ${obj.href} ${chalk.green(obj.messagge)} ${chalk.rgb(0, 187, 45)(obj.status)} ${obj.text}`
//             return console.log(final)
//         }
//         else if(obj.status && obj.messagge && obj.status>399){
//             const final = `${chalk.bold.rgb(248, 0, 0)(obj.icon)} ${chalk.rgb(243, 255, 105)(obj.file)} ${obj.href} ${chalk.red(obj.messagge)} ${chalk.rgb(248, 0, 0)(obj.status)} ${obj.text}`
//             return console.log(final)
//         }
//         return console.log(`${obj.icon}${chalk.yellow(obj.file)} ${obj.href} ${obj.text}`)
//     }
//     )
// }
// showConsoleToValidate(arrofObjts)
// `${obj.file} ${obj.href} ${obj.status} ${obj.message} ${obj.text}`
