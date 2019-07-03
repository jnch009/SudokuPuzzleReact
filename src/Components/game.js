import React from 'react';
import Board from './board';

class Game extends React.Component {
  render() {
      return (
        <div className="game">
          <div className="game-title">SUDOKU!</div>
          <div className="game-board">
            <Board />
          </div>
          <div className="creator-info">Created by: Jeremy Ng Cheng Hin</div>
        </div>
      );
    }
}

export default Game;