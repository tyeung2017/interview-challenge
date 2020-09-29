import React from 'react';
import PropTypes from 'prop-types';

const BasicCard = ({
  name, dietaries, id, withButton, handleRemove, handleSelect,
}) => (
  <li className="item" onClick={() => handleSelect({ id, name, dietaries })} onKeyPress={() => handleSelect({ id, name, dietaries })} role="menuitem">
    <h2>{name}</h2>
    <p>
      {dietaries.map(dietary => <span className="dietary" key={`${id}-${dietary}`}>{dietary}</span>)}
    </p>
    {withButton && <button className="remove-item" type="button" onClick={() => handleRemove(id)}>x</button>}
  </li>
);

export default BasicCard;

BasicCard.propTypes = {
  name: PropTypes.string.isRequired,
  dietaries: PropTypes.arrayOf(PropTypes.string).isRequired,
  id: PropTypes.number.isRequired,
  withButton: PropTypes.bool,
  handleRemove: PropTypes.func,
  handleSelect: PropTypes.func,
};

BasicCard.defaultProps = {
  withButton: false,
  handleRemove: () => {},
  handleSelect: () => {},
};
