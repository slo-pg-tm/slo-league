const getWinnerFactor = (points) => {
  if (points <= 250) {
    return 250 / points;
  } else if (points <= 500) {
    return 500 / points;
  } else if (points <= 1000) {
    return 1000 / points;
  } else {
    return 1;
  }
};

module.exports = getWinnerFactor;
