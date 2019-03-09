import React, { Component } from "react";
import stopwatch from "./stopwatch.svg";
import "./App.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      running: "false",
      secondsElapsed: 0,
      startEnabled: true,
      stopEnabled: true,
      clearEnabled: true,
      lapEnabled: false,
      laps: []
    };
  }
  getSeconds = () => {
    return ("0" + (this.state.secondsElapsed % 60)).slice(-2);
  };

  getMinutes = () => {
    return Math.floor(this.state.secondsElapsed / 60);
  };

  handleStartTimer = () => {
    this.setState({
      startEnabled: false,
      stopEnabled: true,
      clearEnabled: true,
      lapEnabled: true
    });
    let _this = this;
    this.incrementer = setInterval(() => {
      _this.setState({
        secondsElapsed: this.state.secondsElapsed + 1
      });
    }, 1000);
  };

  handleStopTimer = () => {
    this.setState({
      startEnabled: true,
      stopEnabled: false,
      clearEnabled: true,
      lapEnabled: false
    });
    clearInterval(this.incrementer);
  };

  handleClearTimer = () => {
    this.setState({
      startEnabled: true,
      stopEnabled: true,
      clearEnabled: false,
      lapEnabled: false
    });
    clearInterval(this.incrementer);
    this.setState({ secondsElapsed: 0, laps: [] });
  };

  handleLap = val => {
    let accLaps = this.state.laps;
    accLaps.push(val);
    this.setState({ laps: accLaps });
    console.log(this.state.laps);
  };

  render() {
    let displayLaps = this.state.laps.map((lap, index) => {
      return (
        <div key={lap} className="lap_container">
          <p className="lap_number">{`Lap ${index + 1}`}</p>
          <p className="lap_number">|</p>
          <p className="lap_time">{lap}</p>
        </div>
      );
    });
    return (
      <div className="App">
        <div className="stopwatch_container">
          <div className="icon_title_container">
            <img src={stopwatch} alt="stopwatch logo" className="stopwatch" />
            <h4 className="title">STOPWATCH</h4>
          </div>
          <p className="time">
            {this.getMinutes()}:{this.getSeconds()}
          </p>
          <button
            className="start"
            disabled={!this.state.startEnabled}
            onClick={() => this.handleStartTimer()}
          >
            START
          </button>
          <button
            className="stop"
            disabled={!this.state.stopEnabled}
            onClick={() => this.handleStopTimer()}
          >
            STOP
          </button>
          <button
            className="clear"
            disabled={!this.state.clearEnabled}
            onClick={() => this.handleClearTimer()}
          >
            {" "}
            CLEAR
          </button>
          <button
            className="lap_button"
            disabled={this.state.startEnabled}
            onClick={() =>
              this.handleLap(`${this.getMinutes()}:${this.getSeconds()}`)
            }
          >
            {" "}
            LAP{" "}
          </button>
          <div className="laps_container">{displayLaps}</div>
        </div>
      </div>
    );
  }
}

export default App;
