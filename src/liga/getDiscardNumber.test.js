const getDiscardNumber = require('./getDiscardNumber');

test('get number of discards for 0 comps', () => {
  const result = getDiscardNumber(0);
  expect(result).toBe(0);
});

test('get number of discards for 1 comps', () => {
  const result = getDiscardNumber(1);
  expect(result).toBe(0);
});

test('get number of discards for 2 comps', () => {
  const result = getDiscardNumber(2);
  expect(result).toBe(0);
});

test('get number of discards for 3 comps', () => {
  const result = getDiscardNumber(3);
  expect(result).toBe(0);
});

test('get number of discards for 4 comps', () => {
  const result = getDiscardNumber(4);
  expect(result).toBe(0);
});

test('get number of discards for 5 comps', () => {
  const result = getDiscardNumber(5);
  expect(result).toBe(1);
});

test('get number of discards for 6 comps', () => {
  const result = getDiscardNumber(6);
  expect(result).toBe(1);
});

test('get number of discards for 7 comps', () => {
  const result = getDiscardNumber(7);
  expect(result).toBe(1);
});

test('get number of discards for 8 comps', () => {
  const result = getDiscardNumber(8);
  expect(result).toBe(2);
});

test('get number of discards for 9 comps', () => {
  const result = getDiscardNumber(9);
  expect(result).toBe(2);
});

test('get number of discards for 10 comps', () => {
  const result = getDiscardNumber(10);
  expect(result).toBe(2);
});

test('get number of discards for 11 comps', () => {
  const result = getDiscardNumber(11);
  expect(result).toBe(3);
});

test('get number of discards for 12 comps', () => {
  const result = getDiscardNumber(12);
  expect(result).toBe(3);
});

test('get number of discards for 13 comps', () => {
  const result = getDiscardNumber(13);
  expect(result).toBe(3);
});

test('get number of discards for 14 comps', () => {
  const result = getDiscardNumber(14);
  expect(result).toBe(4);
});

test('get number of discards for 15 comps', () => {
  const result = getDiscardNumber(15);
  expect(result).toBe(4);
});

test('get number of discards for 17 comps', () => {
  const result = getDiscardNumber(17);
  expect(result).toBe(5);
});

test('get number of discards for 26 comps', () => {
  const result = getDiscardNumber(26);
  expect(result).toBe(14);
});






