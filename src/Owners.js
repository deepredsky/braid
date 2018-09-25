import React from 'react';
import { Consumer } from './Project';

const Owners = ({ ownerIds }) => (
  <Consumer>
    {({ people, activeOwner }) => (
      <div className="tags is-marginless">
        {people.filter(person => ownerIds.includes(person.id)).map(owner => (
          <div
            className={`tag is-rounded uppercase ${
              activeOwner === owner.id ? 'is-warning' : ''
            }`}
            key={owner.id}
          >
            {owner.initials}
          </div>
        ))}
      </div>
    )}
  </Consumer>
);

export default Owners;
