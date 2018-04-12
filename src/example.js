const path = require('path');
const jetpack = require('fs-jetpack');
const getCompsData = require('./liga/getCompsData');
const calcLiga = require('./liga/calcLiga');

const compsDir = path.join(__dirname, './data/2017');
const data = getCompsData(compsDir);
jetpack.write(path.join(__dirname, './data/2017.json'), data);

const ligaData = calcLiga(data);
jetpack.write(path.join(__dirname, './data/2017-liga.json'), ligaData);
