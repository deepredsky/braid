import { Component } from 'react';

class Toggler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.initialValue || false,
      toggle: this.handleToggle
    };
  }

  handleToggle = () => {
    this.setState(state => ({ value: !state.value }));
  };

  render() {
    return this.props.render(this.state);
  }
}

export default Toggler;
