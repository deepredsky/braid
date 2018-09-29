import React, { Fragment } from 'react';
import { Consumer } from './Project';
import Toggler from './Toggler';

const HighlightOwner = ({ ownerIds, onClick }) => (
  <Consumer>
    {({ people, activeOwner }) => (
      <Toggler
        render={({ value, handleToggle }) => (
          <Fragment>
            <button
              type="button"
              className="button"
              onClick={() => handleToggle()}
            >
              Highlight owner
              <span className="icon is-small">
                <i className="fas fa-times" />
              </span>
            </button>

            <div className={`field is-grouped ${value ? '' : 'is-hidden'}`}>
              {people
                .filter(person => ownerIds.includes(person.id))
                .map(owner => (
                  <p className="control">
                    <button
                      type="button"
                      className={`button is-small is-rounded uppercase ${
                        activeOwner === owner.id ? 'is-warning' : ''
                      }`}
                      key={owner.id}
                      onClick={() => onClick(owner.id)}
                    >
                      {owner.name}
                    </button>
                  </p>
                ))}
            </div>
          </Fragment>
        )}
      />
    )}
  </Consumer>
);

export default HighlightOwner;
