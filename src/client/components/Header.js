import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const Header = ({
  selectedTotal, ...props
}) => (
  <div className="menu-summary">
    <div className="container">
      <div className="row">
        <div className="col-6 menu-summary-left">
          <span>
            {selectedTotal}
            {' '}
            items
          </span>
        </div>
        <div className="col-6 menu-summary-right">
          {Object.keys(props).map(key => (
            <Fragment>
              {props[key]}
              <span className="dietary">{key}</span>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default Header;

Header.propTypes = {
  selectedTotal: PropTypes.number.isRequired,
};
