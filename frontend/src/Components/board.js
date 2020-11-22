import React from 'react';
import Row from './row';
import { boxConditionLookup } from './Square/squareUtility';

const boxLookup = boxConditionLookup();
const Board = ({ grid, complete, handleKeyPress }) => {  
  return (
    <div className='sudoku'>
      <div className='game'>
        <h1>SUDOKU!</h1>
      </div>
      <div className='winCondition'>
        {complete ? 'You have successfully solved the sudoku!' : 'You are not done yet!'}
      </div>
      {grid.map((row, rowNum) => (
        <Row
          key={rowNum}
          grid={grid}
          cells={row}
          rowNum={rowNum}
          boxLookup={boxLookup}
          handleKeyPress={handleKeyPress}
        />
      ))}
    </div>
  );
};

export default Board;
