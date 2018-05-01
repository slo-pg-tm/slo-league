import renderPage from './page/render';

const path = require('path');
const jetpack = require('fs-jetpack');
const getCompsData = require('./liga/getCompsData');
const calcLiga = require('./liga/calcLiga');

// const compsDir = path.join(__dirname, './data/2017');
// const compsData = getCompsData(compsDir);
// const ligaData = calcLiga(compsData);
// jetpack.write(path.join(__dirname, './data/liga-2017.json'), ligaData);
// jetpack.write(
//   path.join(__dirname, './data/liga-2017.html'),
//   renderPage({
//     title: 'Slovenska Jadralno padalska liga 2017',
//     organizer: 'Letalska Zveza Slovenije',
//     compsData: compsData,
//     resultsData: ligaData
//   })
// );

const compsDir = path.join(__dirname, './data/2018');
const compsData = getCompsData(compsDir);
const ligaData = calcLiga(compsData);
jetpack.write(path.join(__dirname, './data/liga-2018.json'), ligaData);
jetpack.write(
  path.join(__dirname, './data/liga-2018.html'),
  renderPage({
    title: 'Slovenska Jadralno padalska liga 2018',
    organizer: 'Letalska Zveza Slovenije',
    compsData: compsData,
    resultsData: ligaData
  })
);
