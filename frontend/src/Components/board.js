import React from 'react';
import Row from './row';

const Board = ({ grid, complete, handleKeyPress }) => {
  return (
    <div className='sudoku'>
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
