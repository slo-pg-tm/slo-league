const jetpack = require('fs-jetpack');
const path = require('path');
const fastXmlParser = require('fast-xml-parser');

const readFsdb = filepath => {
  if (path.extname(filepath) !== '.fsdb') {
    return null;
  }

  if (!jetpack.exists(filepath)) {
    return null;
  }

  const data = jetpack.read(filepath);
  const jsonData = fastXmlParser.parse(data, {
    attrPrefix: '',
    ignoreTextNodeAttr: false,
    ignoreNonTextNodeAttr: false,
    textAttrConversion: true,
    ignoreAttributes: false,
    attributeNamePrefix: ''
  });

  if (!jsonData || !jsonData.Fs || !jsonData.Fs.FsCompetition) {
    return null;
  }

  let competition = {
    id: jsonData.Fs.FsCompetition.id,
    name: jsonData.Fs.FsCompetition.name,
    from: new Date(jsonData.Fs.FsCompetition.from),
    to: new Date(jsonData.Fs.FsCompetition.to),
    location: jsonData.Fs.FsCompetition.location,
    utc_offset: jsonData.Fs.FsCompetition.utc_offset
  };

  let participantsById = {};
  let participantsIds = [];
  participantsIds = jsonData.Fs.FsCompetition.FsParticipants.FsParticipant.map(
    participant => {
      participantsById = Object.assign({}, participantsById, {
        [participant.id]: {
          id: participant.id,
          CIVLID: participant.CIVLID,
          name: participant.name,
          glider: participant.glider,
          female: Number(participant.female),
          nat_code_3166_a3: participant.nat_code_3166_a3
        }
      });
      return participant.id;
    }
  );

  let tasksById = {};
  let tasksIds = [];
  let taskResultsById = {};

  tasksIds = jsonData.Fs.FsCompetition.FsTasks.FsTask.map(task => {
    tasksById = Object.assign({}, tasksById, {
      [task.id]: {
        id: task.id,
        name: task.name
      }
    });

    const results = task.FsParticipants.FsParticipant.map(tparticipant => {
      const participant = participantsById[tparticipant.id];
      return {
        id: participant.id,
        CIVLID: participant.CIVLID,
        name: participant.name,
        glider: participant.glider,
        female: participant.female,
        nat_code_3166_a3: participant.nat_code_3166_a3,
        rank: tparticipant.FsResult
          ? Number(tparticipant.FsResult.rank)
          : 10000,
        points: tparticipant.FsResult ? Number(tparticipant.FsResult.points) : 0
      };
    }).sort((a, b) => {
      return a.rank - b.rank;
    });

    taskResultsById = Object.assign({}, taskResultsById, {
      [task.id]: results
    });

    return task.id;
  });

  return {
    competition,
    participantsById,
    participantsIds,
    tasksById,
    tasksIds,
    taskResultsById
  };
};

module.exports = readFsdb;
