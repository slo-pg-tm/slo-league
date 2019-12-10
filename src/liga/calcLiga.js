const getWinnerFactor = require('./getWinnerFactor');
const getDiscardNumber = require('./getDiscardNumber');

const getLigaTasksAndPilots = ({ data, winnerFullPoints = false }) => {
  let pilotsResults = {};
  let ligaTasks = [];
  let taskNumber = 0;

  // all liga competitions
  data.forEach(comp => {
    // all tasks per competition
    comp.tasksIds.forEach(taskId => {
      taskNumber += 1;
      const results = comp.taskResultsById[taskId];
      const winner = results[0];
      const winnerFactor = getWinnerFactor(winner.points, winnerFullPoints);

      const ligaTaskResults = [];
      // each task result
      results.forEach(pilot => {
        const nationality = pilot.nat_code_3166_a3;
        if (nationality === 'SLO' || nationality === 'SVN') {
          const points = Math.round(pilot.points * winnerFactor);
          const ligaPilotResult = Object.assign({}, pilot, {
            points
          });
          ligaTaskResults.push(ligaPilotResult);

          let tasks = pilotsResults[pilot.CIVLID]
            ? pilotsResults[pilot.CIVLID].tasks
            : {};

          tasks = Object.assign({}, tasks, {
            [taskNumber]: points
          });

          pilotsResults = Object.assign({}, pilotsResults, {
            [pilot.CIVLID]: {
              id: ligaPilotResult.id,
              CIVLID: ligaPilotResult.CIVLID,
              name: ligaPilotResult.name,
              glider: ligaPilotResult.glider,
              female: ligaPilotResult.female,
              tasks
            }
          });
        }
      });

      ligaTasks.push(ligaTaskResults);
    });
  });

  return {
    pilotsResults,
    ligaTasks
  };
};

const calcScore = ({ data, noDiscard, fixDiscard }) => {
  if (!data) {
    return null;
  }

  const discards = getDiscardNumber(
    data.ligaTasks.length,
    noDiscard,
    fixDiscard
  );
  const stats = {
    numberOfPilots: Object.keys(data.pilotsResults).length,
    allTaskCounting: 0,
    flowenTasks: [],
    flowenTasksAvg: 0
  };

  const results = Object.keys(data.pilotsResults)
    .map(CIVLID => {
      const pilotData = data.pilotsResults[CIVLID];
      const pilotTasks = pilotData.tasks;
      const pilotTasksArray = [];
      for (let i = 1, len = data.ligaTasks.length; i <= len; i++) {
        let task = pilotTasks[i];
        if (!task) {
          pilotTasksArray.push(0);
        } else {
          pilotTasksArray.push(task);
        }
      }

      const countingResults = pilotTasksArray
        .sort((a, b) => b - a)
        .slice(0, data.ligaTasks.length - discards);
      const areAllTasksCounting = !countingResults.includes(0);

      if (areAllTasksCounting) stats.allTaskCounting += 1;

      stats.flowenTasks.push(pilotTasksArray.filter(tsk => tsk !== 0).length);

      const sumPoints = countingResults.reduce((prev, curr) => prev + curr, 0);

      return Object.assign(
        {},
        {
          CIVLID: pilotData.CIVLID,
          name: pilotData.name,
          glider: pilotData.glider,
          female: pilotData.female,
          sumPoints,
          flewTasks: pilotTasks,
          allTasks: pilotTasksArray,
          discarded: pilotTasksArray.slice(pilotTasksArray.length - discards)
        }
      );
    })
    .sort((a, b) => b.sumPoints - a.sumPoints);

  stats.flowenTasksAvg =
    stats.flowenTasks.reduce((acc, curr) => acc + curr, 0) /
    stats.flowenTasks.length;

  return { results, stats };
};

const calcLiga = ({
  data,
  winnerFullPoints = false,
  noDiscard = false,
  fixDiscard
}) => {
  const pilotsAndTasks = getLigaTasksAndPilots({ data, winnerFullPoints });
  const results = calcScore({
    data: pilotsAndTasks,
    noDiscard,
    fixDiscard
  });
  return results;
};

module.exports = calcLiga;
