import React from 'react';
import Board from './board';
import {Square} from './square';

class Game extends React.Component {
  render() {
      return (
        <div className="game">
          <div className="game-title">
            SUDOKU!
          </div>
          <div className="game-board">
            <div className="sudoku"></div>
          </div>
          <div className="creator-info">
            <p id="creatorName">Developed by: Jeremy Ng Cheng Hin</p>
          </div>
        </div>
      );
    }
}

export default Game;