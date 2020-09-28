import React from 'react';
import PropTypes from 'prop-types';

const Header = ({
  ve, v, n, selectedTotal,
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
          {ve}
          {' '}
          <span className="dietary">ve</span>
          {v}
          {' '}
          <span className="dietary">v</span>
          {n}
          {' '}
          <span className="dietary">n!</span>
        </div>
      </div>
    </div>
  </div>
);

export default Header;

Header.propTypes = {
  ve: PropTypes.number.isRequired,
  v: PropTypes.number.isRequired,
  n: PropTypes.number.isRequired,
  selectedTotal: PropTypes.number.isRequired,
};
