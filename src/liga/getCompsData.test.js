const path = require('path');
const getCompsData = require('./getCompsData');

test('getCompsData no dir', () => {
  const compsDir = path.join(__dirname, './testData/2016');
  const data = getCompsData(compsDir);
  expect(data).toBeNull();
});

test('getCompsData', () => {
  const compsDir = path.join(__dirname, './testData/2017');
  const data = getCompsData(compsDir);
  expect(data.length).toBe(3);
});
