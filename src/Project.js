import React, { Component, createContext } from 'react';
import { getCurrentIteration, getMemberships } from './api';
import Story from './Story';
import Spinner from './Spinner';
import Filters from './Filters';
import normalize from './normalize';

const { Consumer, Provider } = createContext();

const Column = ({ title, state, stories }) => (
  <div className="column">
    <h3 className="title is-4 has-text-centered">{title}</h3>
    {stories
      .filter(
        story =>
          state.includes(story.current_state) && story.story_type !== 'release'
      )
      .map(story => (
        <Story key={story.id} {...story} />
      ))}
  </div>
);

class Project extends Component {
  state = {
    isLoading: false,
    error: null,
    iteration: {},
    stories: [],
    people: [],
    activeOwner: null
  };

  componentDidMount() {
    this.fetchData(this.props.location.state.id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.state.id !== prevProps.location.state.id) {
      this.fetchData(this.props.location.state.id);
    }
  }

  fetchData = id => {
    this.setState({
      response: [],
      stories: [],
      isLoading: true,
      error: null,
      people: [],
      uniqueOwners: []
    });
    Promise.all([getCurrentIteration(id), getMemberships(id)])
      .then(([iterationResponse, membershipsResponse]) => {
        this.setState({
          ...normalize({
            iterationResponse,
            membershipsResponse
          }),
          isLoading: false
        });
      })
      .catch(error => this.setState({ error, isLoading: false }));
  };

  setActiveOwner = id => {
    this.setState(state => {
      if (state.activeOwner === id) {
        return { activeOwner: null };
      }

      return { activeOwner: id };
    });
  };

  render() {
    const {
      isLoading,
      error,
      stories,
      people,
      uniqueOwners,
      activeOwner
    } = this.state;

    if (isLoading) {
      return <Spinner />;
    }
    if (error) {
      return <div>Error</div>;
    }

    return (
      <Provider value={{ people, activeOwner }}>
        <section className="section">
          <div className="columns">
            <Column title="Pending" state={['planned']} stories={stories} />
            <Column title="Started" state={['started']} stories={stories} />
            <Column title="Review" state={['finished']} stories={stories} />
            <Column
              title="Accept | Done"
              state={['delivered', 'accepted']}
              stories={stories}
            />
          </div>
        </section>
        <Filters />
      </Provider>
    );
  }
}

export default Project;
export { Consumer };
