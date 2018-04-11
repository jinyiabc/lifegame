import React from 'react';

export class BoardSize extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      width: this.props.width,
      height: this.props.height,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillReceiveProps(nextProps){
    this.setState({
    width: nextProps.width,
    height: nextProps.height,
  });

  

  }

  handleClick(){
    const width = this.state.width;
    const height = this.state.height;
    this.props.boardSize(width,height);

  }

  componentWillUpdate(nextProps,nextState){

  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.props.value}
      </button>
    );
  }
}
