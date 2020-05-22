import React from 'react';
import Square from './square';

const renderSquare = (grid, num, row, col) => {
  const gridEntry = num;

  if (gridEntry === null || typeof gridEntry === 'string') {
    return (
      <Square
        key={`${row} ${col}`}
        number={gridEntry}
        pressKey={this.handleKeyPress}
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

const Row = ({ cells = [], rowNum, grid }) => {
  return (
    <div className='sudoku-row'>
      {cells.map((cell, cellNum) => renderSquare(grid, cell, rowNum, cellNum))}
    </div>
  );
};

export default Row;
