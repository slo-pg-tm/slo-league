import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

function ResultItem({
  rank,
  result,
  rankDiff,
  resultDiff,
  resultNext,
  colorLessPointsTask
}) {
  const { name, glider, sumPoints, allTasks, discarded } = result;
  const discardNo = allTasks.length - discarded.length;

  const isRankPos = rankDiff > 0;
  const rankEl =
    rankDiff !== 0 ? (
      <span className={isRankPos ? 'green' : 'red'}>
        {isRankPos ? `+${rankDiff}` : `${rankDiff}`}
      </span>
    ) : null;

  return (
    <tr>
      <td className="sticky pilot">
        {rank}. {name} {rankEl}
      </td>
      <td className="glider">{glider}</td>
      {allTasks.map((task, index) => {
        const isDiscarded = index + 1 > discardNo;
        const diffTask =
          resultDiff && resultDiff.allTasks[index]
            ? resultDiff.allTasks[index]
            : null;
        const diffIsEq = diffTask ? task === diffTask : true;
        const isGreater = !diffIsEq ? task > diffTask : false;

        const isNextGreater =
          colorLessPointsTask && resultNext && task !== 0 && !isDiscarded
            ? resultNext.allTasks[index] > task
            : false;

        const cellClasses = cx({
          discarded: isDiscarded,
          nextGreater: isNextGreater
        });

        return (
          <td key={index} className={cellClasses}>
            {diffIsEq ? (
              task
            ) : (
              <>
                <span className={isGreater ? 'green' : 'red'}>{task}</span>{' '}
                <span className="small">({diffTask})</span>
              </>
            )}
          </td>
        );
      })}
      <td>{sumPoints}</td>
    </tr>
  );
}

ResultItem.propTypes = {
  result: PropTypes.object,
  resultDiff: PropTypes.object,
  resultNext: PropTypes.object,
  rankDiff: PropTypes.number,
  colorLessPointsTask: PropTypes.bool
};
ResultItem.defaultProps = {};

export default ResultItem;
