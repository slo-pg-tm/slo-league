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

// official results
const compsDir = path.join(__dirname, './data/2019');
const compsData = getCompsData(compsDir);
const ligaData2019 = calcLiga({ data: compsData });
jetpack.write(path.join(__dirname, './data/liga-2019.json'), ligaData2019);
jetpack.write(
  path.join(__dirname, './data/liga-2019.html'),
  renderPage({
    title: 'Slovenska Jadralno padalska liga 2019',
    organizer: 'Letalska Zveza Slovenije',
    compsData: compsData,
    resultsData: ligaData2019
  })
);
// printout official results with debug
jetpack.write(
  path.join(__dirname, './data/liga-2019-slabsi-taski-od-naslednjega.html'),
  renderPage({
    title: 'Slovenska Jadralno padalska liga 2019',
    titleWarn: 'pobarvani slabsi rezulati glede na naslednjega tekmovalca',
    organizer: 'Letalska Zveza Slovenije',
    compsData: compsData,
    resultsData: ligaData2019,
    colorLessPointsTask: true
  })
);

// no discard
const ligaData2019NoDiscard = calcLiga({ data: compsData, noDiscard: true });
jetpack.write(
  path.join(__dirname, './data/liga-2019-exp-noDiscard.json'),
  ligaData2019NoDiscard
);
jetpack.write(
  path.join(__dirname, './data/liga-2019-exp-noDiscard.html'),
  renderPage({
    title: 'Slovenska Jadralno padalska liga 2019',
    titleWarn: 'brez diskarda',
    organizer: 'Letalska Zveza Slovenije',
    compsData: compsData,
    resultsData: ligaData2019NoDiscard,
    diffData: ligaData2019,
    colorLessPointsTask: true
  })
);

// fix discard
for (let i = 3, len = 10; i <= len; i++) {
  const calcData = calcLiga({ data: compsData, fixDiscard: i });
  jetpack.write(
    path.join(__dirname, `./data/liga-2019-exp-fixDiscard-${i}.json`),
    calcData
  );
  jetpack.write(
    path.join(__dirname, `./data/liga-2019-exp-fixDiscard-${i}.html`),
    renderPage({
      title: 'Slovenska Jadralno padalska liga 2019',
      titleWarn: `fixDiscard-${i}`,
      organizer: 'Letalska Zveza Slovenije',
      compsData: compsData,
      resultsData: calcData,
      diffData: ligaData2019,
      colorLessPointsTask: true
    })
  );
}

// winner factor always 1000
const ligaData2019winnerFactor = calcLiga({
  data: compsData,
  winnerFullPoints: true
});

jetpack.write(
  path.join(__dirname, './data/liga-2019-exp-winner1000.json'),
  ligaData2019winnerFactor
);

jetpack.write(
  path.join(__dirname, './data/liga-2019-exp-winner1000.html'),
  renderPage({
    title: 'Slovenska Jadralno padalska liga 2019',
    titleWarn: 'experiment winner factor always to 1000',
    organizer: 'Letalska Zveza Slovenije',
    compsData: compsData,
    resultsData: ligaData2019winnerFactor,
    diffData: ligaData2019,
    colorLessPointsTask: true
  })
);

for (let i = 3, len = 10; i <= len; i++) {
  const calcData = calcLiga({ data:  compsData, winnerFullPoints: true, fixDiscard: i });
  jetpack.write(
    path.join(__dirname, `./data/liga-2019-exp-winner1000-fixDiscard-${i}.json`),
    calcData
  );
  jetpack.write(
    path.join(__dirname, `./data/liga-2019-exp-winner1000-fixDiscard-${i}.html`),
    renderPage({
      title: 'Slovenska Jadralno padalska liga 2019',
      titleWarn: `winner1000 fixDiscard-${i}`,
      organizer: 'Letalska Zveza Slovenije',
      compsData: compsData,
      resultsData: calcData,
      diffData: ligaData2019,
      colorLessPointsTask: true
    })
  );
}
