const normalize = ({ iterationResponse, membershipsResponse }) => {
  const currentIteration = iterationResponse[0];

  const { stories, ...iteration } = currentIteration;

  const people = membershipsResponse.map(item => item.person);

  const owners = iterationResponse[0].stories
    .map(story => story.owner_ids)
    .flat();

  const uniqueOwners = owners.filter(
    (value, index, self) => self.indexOf(value) === index
  );

  return {
    iteration,
    stories,
    people,
    uniqueOwners
  };
};

export default normalize;
