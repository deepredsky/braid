import React, { Fragment } from 'react';
import { Consumer } from './Project';

const ActiveOwners = ({ ownerIds, onClick }) => (
  <Fragment>
    <label className="label">Select owner for highlighting</label>

    <Consumer>
      {({ people, activeOwner }) => (
        <div class="field is-grouped">
          {people.filter(person => ownerIds.includes(person.id)).map(owner => (
            <p className="control">
              <button
                type="button"
                className={`button is-small is-rounded uppercase ${
                  activeOwner === owner.id ? 'is-warning' : ''
                }`}
                key={owner.id}
                onClick={() => onClick(owner.id)}
              >
                {owner.initials}
              </button>
            </p>
          ))}
        </div>
      )}
    </Consumer>
  </Fragment>
);

export default ActiveOwners;
