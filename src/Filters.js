import React from 'react';
import Toggler from './Toggler';

const Filters = () => (
  <Toggler
    render={({ value, toggle }) => (
      <div className={`filters ${value ? 'is-open' : ''}`}>
        <button className="filters-button" onClick={toggle}>
          <p className="subtitle is-3">By owner</p>
          <span className="icon is-medium">
            <i className="fas fa-chevron-up" />
          </span>
        </button>
        <div className="filters-content">
          <p>Content</p>
          <p>Content</p>
          <p>Content</p>
          <p>Content</p>
          <p>Content</p>
        </div>
      </div>
    )}
  />
);

export default Filters;
