import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ResultItem from './ResultItem';

function Results({ results }) {
  return (
    <Fragment>
      <h3>Rezultati:</h3>
      <div style={{overflowX: 'auto'}}>
        <table>
          <thead>
          <tr>
            <th>&nbsp;</th>
            <th>Pilot</th>
            <th>Glider</th>
            {
              results[0].allTasks.map((task, index) => {
                return (
                  <th key={index + 1}>{`T${index + 1}`}</th>
                )
              })
            }
            <th>Točke</th>
          </tr>
          </thead>
          <tbody>
          {results.map((result, index) => {
            return (
              <ResultItem
                key={result.CIVLID}
                rank={index + 1}
                result={result}
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
  results: PropTypes.array
};

Results.defaultProps = {};

export default Results;
