import React from 'react';
import Row from './row';

<<<<<<< HEAD
const Board = ({ grid, complete, handleKeyPress }) => {
  return (
    <div className='sudoku'>
=======
const Board = ({ grid, complete, handleKeyPress }) => {  
  return (
    <div className='sudoku'>
      <div className='game'>
        <h1>SUDOKU!</h1>
      </div>
>>>>>>> 1b63424727dde90fe31d96229fda6c33487f2881
      <div className='winCondition'>
        {complete ? 'You have successfully solved the sudoku!' : 'You are not done yet!'}
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
