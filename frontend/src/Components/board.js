import React from 'react';
import { Alert } from 'shards-react';
import Row from './row';

const Board = ({ grid, complete, displayError, handleKeyPress }) => {
  return (
    <div className='sudoku'>
      <div className='game'>
        <h1>SUDOKU!</h1>
      </div>
      {displayError ? (
        <div className='alertConstraint'>
          <Alert theme='danger' open={displayError}>
            Must type a number between 1 and 9
          </Alert>
        </div>
      ) : null}
      <div className='winCondition'>
        {complete
          ? 'You have successfully solved the sudoku!'
          : 'You are not done yet!'}
      </div>
      {grid.map((row, rowNum) => (
        <Row
          key={rowNum}
          grid={grid}
          cells={row}
          rowNum={rowNum}
          handleKeyPress={handleKeyPress}
        />
      ))}
    </div>
  );
};

export default Board;
