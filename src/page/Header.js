import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

function Header({ title, titleWarn, organizer, compsData, stats }) {
  const comps = compsData.map(comp => {
    return (
      <tr key={comp.competition.name}>
        <td>{comp.competition.name}</td>
        <td>{comp.competition.location}</td>
      </tr>
    );
  });

  return (
    <Fragment>
      <h1 className="header">{title}</h1>
      <h2 className="organizer red">{titleWarn}</h2>
      {stats.allTaskCounting && (
        <>
          <h3 className="organizer red">
            Število pilotov brez 0 v seštevku taskov: {stats.allTaskCounting} /{' '}
            {stats.numberOfPilots}
          </h3>
          <h3 className="organizer red">
            Število pilotov brez 0 v seštevku taskov %:{' '}
            {Math.round((100 / stats.numberOfPilots) * stats.allTaskCounting)}
          </h3>
        </>
      )}
      <h2 className="organizer">{organizer}</h2>
      <table>{comps}</table>
    </Fragment>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  titleWarn: PropTypes.string,
  organizer: PropTypes.string,
  compsData: PropTypes.array,
  stats: PropTypes.object
};

Header.defaultProps = {
  titleWarn: '',
  stats: {}
};

export default Header;
