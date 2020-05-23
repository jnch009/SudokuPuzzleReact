import React from 'react';
import Square from './square';

const renderSquare = (grid, num, row, col, handleKeyPress) => {
  const gridEntry = num;

  if (gridEntry === null || typeof gridEntry === 'string') {
    return (
      <Square
        key={`${row} ${col}`}
        number={gridEntry}
        pressKey={handleKeyPress}
        row={row}
        col={col}
        grid={grid}
        modify={true}
      />
    );
  } else {
    return <Square key={`${row} ${col}`} number={gridEntry} modify={false} />;
  }
};

const Row = ({ cells = [], rowNum, grid, handleKeyPress }) => {
  return (
    <div className='sudoku-row'>
      {cells.map((cell, cellNum) =>
        renderSquare(grid, cell, rowNum, cellNum, handleKeyPress),
      )}
    </div>
  );
};

export default Row;
