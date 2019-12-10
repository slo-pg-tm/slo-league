import renderPage from './page/render';

const path = require('path');
const jetpack = require('fs-jetpack');
const getCompsData = require('./liga/getCompsData');
const calcLiga = require('./liga/calcLiga');

// official results
const compsDir = path.join(__dirname, './data/2019');
const compsData = getCompsData(compsDir);
const ligaData2019 = calcLiga({ data: compsData });
jetpack.write(
  path.join(__dirname, './data/liga-2019.json'),
  ligaData2019.results
);
jetpack.write(
  path.join(__dirname, './data/liga-2019.html'),
  renderPage({
    title: 'Slovenska Jadralno padalska liga 2019',
    organizer: 'Letalska Zveza Slovenije',
    stats: compsData.stats,
    compsData: compsData,
    resultsData: ligaData2019.results
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
    stats: ligaData2019.stats,
    resultsData: ligaData2019.results,
    colorLessPointsTask: true
  })
);

// no discard
const ligaData2019NoDiscard = calcLiga({ data: compsData, noDiscard: true });
jetpack.write(
  path.join(__dirname, './data/liga-2019-exp-noDiscard.json'),
  ligaData2019NoDiscard.results
);
jetpack.write(
  path.join(__dirname, './data/liga-2019-exp-noDiscard.html'),
  renderPage({
    title: 'Slovenska Jadralno padalska liga 2019',
    titleWarn: 'brez diskarda',
    organizer: 'Letalska Zveza Slovenije',
    compsData: compsData,
    stats: ligaData2019NoDiscard.stats,
    resultsData: ligaData2019NoDiscard.results,
    diffData: ligaData2019.results,
    colorLessPointsTask: true
  })
);

// fix discard
for (let i = 3, len = 10; i <= len; i++) {
  const calcData = calcLiga({ data: compsData, fixDiscard: i });
  jetpack.write(
    path.join(__dirname, `./data/liga-2019-exp-fixDiscard-${i}.json`),
    calcData.results
  );
  jetpack.write(
    path.join(__dirname, `./data/liga-2019-exp-fixDiscard-${i}.html`),
    renderPage({
      title: 'Slovenska Jadralno padalska liga 2019',
      titleWarn: `fixDiscard-${i}`,
      organizer: 'Letalska Zveza Slovenije',
      compsData: compsData,
      stats: calcData.stats,
      resultsData: calcData.results,
      diffData: ligaData2019.results,
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
  ligaData2019winnerFactor.results
);

jetpack.write(
  path.join(__dirname, './data/liga-2019-exp-winner1000.html'),
  renderPage({
    title: 'Slovenska Jadralno padalska liga 2019',
    titleWarn: 'experiment winner factor always to 1000',
    organizer: 'Letalska Zveza Slovenije',
    compsData: compsData,
    stats: ligaData2019winnerFactor.stats,
    resultsData: ligaData2019winnerFactor.results,
    diffData: ligaData2019.results,
    colorLessPointsTask: true
  })
);

for (let i = 3, len = 10; i <= len; i++) {
  const calcData = calcLiga({
    data: compsData,
    winnerFullPoints: true,
    fixDiscard: i
  });
  jetpack.write(
    path.join(
      __dirname,
      `./data/liga-2019-exp-winner1000-fixDiscard-${i}.json`
    ),
    calcData.results
  );
  jetpack.write(
    path.join(
      __dirname,
      `./data/liga-2019-exp-winner1000-fixDiscard-${i}.html`
    ),
    renderPage({
      title: 'Slovenska Jadralno padalska liga 2019',
      titleWarn: `winner1000 fixDiscard-${i}`,
      organizer: 'Letalska Zveza Slovenije',
      compsData: compsData,
      stats: calcData.stats,
      resultsData: calcData.results,
      diffData: ligaData2019.results,
      colorLessPointsTask: true
    })
  );
}
