import React from 'react';

export class Startgame extends React.Component {
  componentDidMount() {
    this.interval = setInterval(() => {
      this.props.nextOneGen();
    }, 1000);
  }

    componentWillUnmount(prevProps, prevState) {
  clearInterval(this.interval);
}

  render() {
    return (
      <button onClick={this.props.toggle}>
        Stop!
      </button>
    );
  }
}
