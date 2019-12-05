import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ResultItem from './ResultItem';

const getRankDiff = (rank, rankPrev) => {
  if (rank !== rankPrev) {
    return rankPrev - rank;
  }

  return 0;
};

function Results({ results, diffData, colorLessPointsTask }) {
  return (
    <Fragment>
      <h3>Rezultati:</h3>
      <div style={{ overflowX: 'auto' }}>
        <table className="table">
          <thead>
            <tr>
              <th className="sticky pilot">Pilot</th>
              <th className="glider">Glider</th>
              {results[0].allTasks.map((task, index) => {
                return <th key={index + 1}>{`T${index + 1}`}</th>;
              })}
              <th>Točke</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index, list) => {
              const diffIndex =
                diffData.length !== 0
                  ? diffData.findIndex(item => item.CIVLID === result.CIVLID)
                  : -1;
              const resultDiff = diffIndex !== -1 ? diffData[diffIndex] : null;
              const rank = index + 1;
              const rankPrev = diffIndex === -1 ? rank : diffIndex + 1;
              const rankDiff = getRankDiff(rank, rankPrev);
              const resultNext = list[index + 1];

              return (
                <ResultItem
                  key={result.CIVLID}
                  rank={rank}
                  rankDiff={rankDiff}
                  result={result}
                  resultNext={resultNext}
                  resultDiff={resultDiff}
                  colorLessPointsTask={colorLessPointsTask}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
}

Results.propTypes = {
  results: PropTypes.array,
  diffData: PropTypes.array,
  colorLessPointsTask: PropTypes.bool
};

Results.defaultProps = {
  diffData: [],
  colorLessPointsTask: false
};

export default Results;
