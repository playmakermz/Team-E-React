import React from 'react';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {count : 0};
  }

  handleClick(){
    this.setState({count: this.state.count + 1});
  }

  handleReset(){
    this.setState({count: 0});
  }

  render(){
    return(
      <div className='counterDisplay'>
        <h1>Halo, ini adalah Counter</h1>
        <h2>{this.state.count}</h2>
        <button onClick={() => this.handleClick()}> + </button>
        <button onClick={() => this.handleReset()}>Reset Counter</button>
      </div>
    )
  }
}

export default App;
