import renderPage from './page/render';

const path = require('path');
const jetpack = require('fs-jetpack');
const getCompsData = require('./liga/getCompsData');
const calcLiga = require('./liga/calcLiga');

// const compsDir = path.join(__dirname, './data/2017');
// const compsData = getCompsData(compsDir);
// const ligaData = calcLiga({data: compsData});
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

// const compsDir = path.join(__dirname, './data/2018');
// const compsData = getCompsData(compsDir);
// const ligaData = calcLiga({data: compsData});
// jetpack.write(path.join(__dirname, './data/liga-2018.json'), ligaData);
// jetpack.write(
//   path.join(__dirname, './data/liga-2018.html'),
//   renderPage({
//     title: 'Slovenska Jadralno padalska liga 2018',
//     organizer: 'Letalska Zveza Slovenije',
//     compsData: compsData,
//     resultsData: ligaData
//   })
// );

{
  const compsDir = path.join(__dirname, './data/2019');
const compsData = getCompsData(compsDir);
const ligaData = calcLiga({data: compsData});
jetpack.write(path.join(__dirname, './data/liga-2019.json'), ligaData);
jetpack.write(
  path.join(__dirname, './data/liga-2019.html'),
  renderPage({
    title: 'Slovenska Jadralno padalska liga 2019',
    organizer: 'Letalska Zveza Slovenije',
    compsData: compsData,
    resultsData: ligaData
  })
);
}

{
  const compsDir = path.join(__dirname, './data/2019');
const compsData = getCompsData(compsDir);
const ligaData = calcLiga({data: compsData, winnerFullPoints:true});
jetpack.write(path.join(__dirname, './data/liga-2019-exp-winner1000.json'), ligaData);
jetpack.write(
  path.join(__dirname, './data/liga-2019-exp-winner1000.html'),
  renderPage({
    title: 'Slovenska Jadralno padalska liga 2019 experiment winner 1000',
    organizer: 'Letalska Zveza Slovenije',
    compsData: compsData,
    resultsData: ligaData
  })
);
}
