const path = require('path');
const readFsdb = require('./readFsdb');

test('read non file', () => {
  const filePath = path.join(__dirname, './testData/none.fsdb');
  const result = readFsdb(filePath);
  expect(result).toBeNull();
});

test('read bad file', () => {
  const filePath = path.join(__dirname, './testData/badfile.json');
  const result = readFsdb(filePath);
  expect(result).toBeNull();
});

test('read good file', () => {
  const filePath = path.join(__dirname, './testData/HLS-open_2017.fsdb');
  const result = readFsdb(filePath);

  expect(result.competition.id).toBe('1');
  expect(result.competition.name).toBe('HLS-open 2017');
  expect(result.competition.name).toBe('HLS-open 2017');
  expect(result.tasksIds.length).toBe(5);
});
