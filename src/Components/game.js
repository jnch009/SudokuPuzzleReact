import React from 'react';
import Board from './board';

class Game extends React.Component {
  render() {
      return (
        <div className="game">
          <div className="game-title">
            <p className="title">SUDOKU!</p>
          </div>
          <div className="game-board">
            <div className="sudoku">
              <Board/>
            </div>
          </div>
          <div className="creator-info">
            <p id="creatorName">Developed by: Jeremy Ng Cheng Hin</p>
          </div>
        </div>
      );
    }
}

export default Game;