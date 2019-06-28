import React from 'react';
import Board from './board';
import {Alert} from "shards-react";

class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = {showAlert: false};
  }

  render() {
      return (
        <div className="game">
          <div className="game-board">
          <Alert className="alert" open={this.state.showAlert} theme="danger">
            You must enter a value between 1-9
          </Alert>
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol></ol>
          </div>
        </div>
      );
    }
}

export default Game;