const getWinnerFactor = require('./getWinnerFactor');

test('get winner factor winner < 250 points', () => {
  const factor = getWinnerFactor(180);

  expect(factor).toBe(1.3888888888888888);
});

test('get winner factor winner = 250 points', () => {
  const factor = getWinnerFactor(250);

  expect(factor).toBe(1);
});

test('get winner factor winner < 500 points', () => {
  const factor = getWinnerFactor(450);

  expect(factor).toBe(1.1111111111111112);
});

test('get winner factor winner = 500 points', () => {
  const factor = getWinnerFactor(500);

  expect(factor).toBe(1);
});

test('get winner factor winner < 1000 points', () => {
  const factor = getWinnerFactor(870);

  expect(factor).toBe(1.1494252873563218);
});

test('get winner factor winner = 1000 points', () => {
  const factor = getWinnerFactor(1000);

  expect(factor).toBe(1);
});
