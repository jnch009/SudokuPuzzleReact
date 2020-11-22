import React from 'react';
import Square from './Square/square';
import fn from '../helperFn/boardFunctions';
import cloneDeep from 'lodash.clonedeep';

const renderSquare = (grid, num, row, col, boxLookup, handleKeyPress) => {
  const gridEntry = num;
  const commonProps = {
    number: gridEntry,
    pressKey: handleKeyPress,
    boxLookup: boxLookup,
    row: row,
    col: col,
    grid: grid,
  };

  if (gridEntry === null || typeof gridEntry === 'string') {
    if (typeof gridEntry === 'string') {
      const clonedArr = cloneDeep(grid);
      clonedArr[row][col] = null;
      if (!fn.isValid(clonedArr, row, col, gridEntry)) {
        return (
          <Square
            key={`${row} ${col}`}
            squareProps={commonProps}
            modify={true}
            valid={false}
          />
        );
      }
    }

    return (
      <Square
        key={`${row} ${col}`}
        squareProps={commonProps}
        modify={true}
        valid={true}
      />
    );
  } else {
    return (
      <Square key={`${row} ${col}`} squareProps={commonProps} modify={false} />
    );
  }
};

const Row = ({ cells = [], rowNum, grid, boxLookup, handleKeyPress }) => {
  return (
    <div className='sudoku-row'>
      {cells.map((cell, cellNum) =>
        renderSquare(grid, cell, rowNum, cellNum, boxLookup, handleKeyPress)
      )}
    </div>
  );
};

export default Row;
