import React, { Component } from 'react';
import stopwatch from './stopwatch.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      running: "false",
      secondsElapsed: 0,
      startEnabled: true,
      stopEnabled: true,
      clearEnabled: true,

      lap: []
    };
  }
  getSeconds = () => {
    return ('0' + this.state.secondsElapsed % 60).slice(-2)
  }

  getMinutes = () => {
    return Math.floor(this.state.secondsElapsed / 60)
  }

  handleStartTimer = () => {
    this.setState({
      startEnabled: false, stopEnabled: true,
      clearEnabled: true,
    })
    let _this = this;
    this.incrementer = setInterval(() => {
      _this.setState({
        secondsElapsed: (this.state.secondsElapsed + 1)
      })

    }, 1000)

  }

  handleStopTimer = () => {
    this.setState({
      startEnabled: true, stopEnabled: false,
      clearEnabled: true,
    })
    clearInterval(this.incrementer)

  }

  handleClearTimer = () => {
    this.setState({
      startEnabled: true, stopEnabled: true,
      clearEnabled: false,
    })
    clearInterval(this.incrementer);
    this.setState({ secondsElapsed: 0 })

  }


  render() {

    return (
      <div className="App">
        <div className="stopwatch_container">
          <div className="icon_title_container">
            {/* <h4 className="title">STOP</h4> */}
            <img src={stopwatch} alt="stopwatch logo" className="stopwatch" />
            <h4 className="title">STOPWATCH</h4></div>
          {/* <img src={stopwatch} alt="stopwatch logo" className="stopwatch" />
        <h4 className="title">STOPWATCH</h4> */}
          <p className="time">{this.getMinutes()}:{this.getSeconds()}</p>
          {/* <button onClick={() => this.startTimer()}>{this.state.running ? 'Stop' : 'Start'}</button>
        <button onClick={() => this.startTimer()}>{this.state.running ? 'Stop' : 'Start'}</button> */}
          <button className="start" disabled={!this.state.startEnabled} onClick={() => this.handleStartTimer()}>START</button>
          <button className="stop" disabled={!this.state.stopEnabled} onClick={() => this.handleStopTimer()}>STOP</button>
          <button
            className="clear"
            disabled={!this.state.clearEnabled}
            onClick={() => this.handleClearTimer()}> CLEAR</button>
        </div></div >
    );
  }
}

export default App;
