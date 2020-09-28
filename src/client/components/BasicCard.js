import React from 'react';
import PropTypes from 'prop-types';

const BasicCard = ({ name, dietaries, id }) => (
  <li className="item">
    <h2>{name}</h2>
    <p>
      {dietaries.map(dietary => <span className="dietary" key={`${id}-${dietary}`}>{dietary}</span>)}
    </p>
  </li>
);

export default BasicCard;

BasicCard.propTypes = {
  name: PropTypes.string.isRequired,
  dietaries: PropTypes.arrayOf(PropTypes.string).isRequired,
  id: PropTypes.number.isRequired,
};
