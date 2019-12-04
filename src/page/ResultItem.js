import React from 'react';
import PropTypes from 'prop-types';

function ResultItem({ rank, result }) {
  const { CIVLID, name, glider, sumPoints, allTasks, discarded } = result;
  const discardNo = allTasks.length - discarded.length;

  return (
    <tr>
      <td className="sticky pilot">{rank}. {name}</td>
      <td className="glider">{glider}</td>
      {
        allTasks.map((task, index) => {
          const isDiscarded = (index + 1) > discardNo;
          return (
            <td key={index} className={isDiscarded ? 'discarded' : null}>
              {task}
            </td>
          )
        })
      }
      <td>{sumPoints}</td>
    </tr>
  );
}

ResultItem.propTypes = {
  result: PropTypes.object
};
ResultItem.defaultProps = {};

export default ResultItem;
