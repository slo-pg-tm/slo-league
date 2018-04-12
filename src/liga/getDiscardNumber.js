const getDiscardNumber = (tasksCount) => {
  if (tasksCount > 15) {
    return tasksCount - 12;
  }
  const countingComps = {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 4,
    6: 5,
    7: 6,
    8: 6,
    9: 7,
    10: 8,
    11: 8,
    12: 9,
    13: 10,
    14: 10,
    15: 11
  };

  return tasksCount - countingComps[tasksCount];
};

module.exports = getDiscardNumber;
