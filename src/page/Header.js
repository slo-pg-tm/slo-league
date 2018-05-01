import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

function Header({ title, organizer, compsData }) {
  const comps = compsData.map(comp => {
    return (
      <tr key={comp.competition.name}>
        <td>{comp.competition.name}</td>
        <td>{comp.competition.location}</td>
      </tr>
    )
  });

  return (
    <Fragment>
      <h1 className="header">{title}</h1>
      <h2 className="organizer">{organizer}</h2>
      <table>
        {comps}
      </table>
    </Fragment>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  organizer: PropTypes.string,
  compsData: PropTypes.array
};

Header.defaultProps = {};

export default Header;
