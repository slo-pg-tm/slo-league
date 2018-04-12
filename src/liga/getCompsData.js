const path = require('path');
const jetpack = require('fs-jetpack');
const readFsdb = require('../fsdb/readFsdb');

const getCompsData = compsDataDir => {
  if (!jetpack.exists(compsDataDir)) {
    return null;
  }

  const filesList = jetpack.list(compsDataDir);
  if (!filesList) {
    return null;
  }

  return filesList
    .filter(filename => path.extname(filename) === '.fsdb')
    .map(fileName => {
      const filePath = `${compsDataDir}/${fileName}`;
      return readFsdb(filePath);
    })
    .sort((a, b) => {
      return a.competition.from.getTime() - b.competition.from.getTime();
    });
};

module.exports = getCompsData;
